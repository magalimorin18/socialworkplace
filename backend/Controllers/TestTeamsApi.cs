using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;
using System.Net;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{

    [ApiController]
    [Authorize]
    [Route("test/[controller]")]

    public class TestTeamsApi : ControllerBase
    {

        private readonly GraphServiceClient _graphServiceClient;
        public TestTeamsApi(GraphServiceClient graphServiceClient)
        {
            _graphServiceClient = graphServiceClient;
        }

        [HttpGet]
        public async Task<ActionResult<string>> Get()
        {
            try
            {
                var user = await _graphServiceClient.Me.Request().GetAsync();
                Console.WriteLine("KKKKKKKKKKKKKKKKKKKK");
                Console.WriteLine(user);
                // Initialize the GraphServiceClient.
                // GraphServiceClient client = await GraphClient.GetGraphServiceClient(jwt);
                // Console.WriteLine("Authent OK");

                // var test = await client.Me.Request().GetAsync();
                // Console.WriteLine("Request OK");
                // Console.Write(test);

                return Ok("OK");
            }
            catch (ServiceException ex)
            {
                Console.Write(ex);
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }
    }
}