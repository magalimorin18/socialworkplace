using System;
using System.Net;
using backend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Graph;

namespace backend.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                    if (contextFeature != null)
                    {
                        var exception = contextFeature.Error;
                        string message = "Internal Server Error.";
                        if (exception is ServiceException)
                        {
                            var statusCode = ((ServiceException)exception).StatusCode;
                            context.Response.StatusCode = (int)statusCode;

                            if (statusCode == HttpStatusCode.BadRequest) message = "Bad Request.";
                            else if (statusCode == HttpStatusCode.NotFound) message = "Not Found.";
                        }

                        await context.Response.WriteAsync(new ErrorDetails()
                        {
                            StatusCode = context.Response.StatusCode,
                            Message = message
                        }.ToString());
                    }
                });
            });
        }
    }
}