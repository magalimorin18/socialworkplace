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
        private readonly Dictionary<string, string> teamIdDic;
        private readonly GraphServiceClient graphClient;

        public MembershipController(IConfiguration configuration)
        {
            var cred = new ClientSecretCredential(configuration.GetValue<string>("AzureAd:TenantId"),
                                                configuration.GetValue<string>("AzureAd:ClientId"),
                                                configuration.GetValue<string>("AzureAd:ClientSecret"));
            graphClient = new GraphServiceClient(cred);

            teamIdDic = configuration.GetSection("Teams:TeamId").Get<Dictionary<string, string>>();
        }

        [HttpPut]
        [Route("{groupId}")]
        public async Task<ActionResult> Put(string groupId)
        {
            var userOID = User.Claims.Where(c => c.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier").FirstOrDefault().Value;

            var convMember = new AadUserConversationMember
            {
                Roles = new List<string>()
                {
                    "owner"
                },
                AdditionalData = new Dictionary<string, object>()
                {
                    {"user@odata.bind", $"https://graph.microsoft.com/v1.0/users('{userOID}')"}
                }
            };

            string tenantId = User.Claims.Where(c => c.Type == "http://schemas.microsoft.com/identity/claims/tenantid").FirstOrDefault().Value;
            string teamId = teamIdDic[tenantId];
            await graphClient.Teams[teamId].Channels[groupId].Members.Request().AddAsync(convMember);
            return Ok();
        }

        [HttpDelete]
        [Route("{groupId}")]
        //TODO V2RIFIER QUE CELUI QUI LEAVE EST BIEN LE DERNIER
        public async Task<ActionResult> Delete(string groupId)
        {
            string tenantId = User.Claims.Where(c => c.Type == "http://schemas.microsoft.com/identity/claims/tenantid").FirstOrDefault().Value;
            string teamId = teamIdDic[tenantId];

            var convMembers = await graphClient.Teams[teamId].Channels[groupId].Members.Request().GetAsync();

            var userName = User.Claims.Where(c => c.Type == "name").FirstOrDefault().Value;
            try
            {
                var convUserId = convMembers.Where(u => u.DisplayName == userName).FirstOrDefault().Id;

                if (convMembers.Count <= 1)
                {
                    await graphClient.Teams[teamId].Channels[groupId].Request().DeleteAsync();
                    return NoContent();
                }
                await graphClient.Teams[teamId].Channels[groupId].Members[convUserId].Request().DeleteAsync();

                return NoContent();
            }
            catch
            {
                return UnprocessableEntity("You can't leave a group if you are not a member of it!");
            }
        }
    }
}