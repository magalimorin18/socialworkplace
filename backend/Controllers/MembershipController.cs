using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;

namespace backend.Controllers
{

    [ApiController]
    [Authorize]
    [Route("api/[controller]")]

    public class MembershipController : ControllerBase
    {
        private readonly string teamId;
        private readonly GraphServiceClient graphClient;

        public MembershipController(IConfiguration configuration)
        {
            var cred = new ClientSecretCredential(configuration.GetValue<string>("AzureAd:TenantId"),
                                                configuration.GetValue<string>("AzureAd:ClientId"),
                                                configuration.GetValue<string>("AzureAd:ClientSecret"));
            graphClient = new GraphServiceClient(cred);

            teamId = configuration.GetValue<string>("Teams:TeamId");
        }

        [HttpPut]
        [Route("{groupId}")]
        public async Task<ActionResult> Put(string groupId)
        {
            var userPreferredUsername = User.Claims.Where(c => c.Type == "preferred_username").FirstOrDefault().Value;

            var convMember = new AadUserConversationMember
            {
                Roles = new List<string>()
                {
                    "owner"
                },
                AdditionalData = new Dictionary<string, object>()
                {
                    {"user@odata.bind", $"https://graph.microsoft.com/v1.0/users('{userPreferredUsername}')"}
                }
            };
            await graphClient.Teams[teamId].Channels[groupId].Members.Request().AddAsync(convMember);
            return Ok();
        }

        [HttpDelete]
        [Route("{groupId}")]
        public async Task<ActionResult> Delete(string groupId)
        {
            var convMembers = await graphClient.Teams[teamId].Channels[groupId].Members.Request().GetAsync();
            if (convMembers.Count <= 1)
            {
                await graphClient.Teams[teamId].Channels[groupId].Request().DeleteAsync();
                return NoContent();
            }

            var userName = User.Claims.Where(c => c.Type == "name").FirstOrDefault().Value;
            var convUserId = convMembers.Where(u => u.DisplayName == userName).FirstOrDefault().Id;
            await graphClient.Teams[teamId].Channels[groupId].Members[convUserId].Request().DeleteAsync();

            return NoContent();
        }


    }
}