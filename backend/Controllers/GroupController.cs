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

    public class GroupController : ControllerBase
    {
        private readonly Dictionary<string, string> teamIdDic;
        private readonly GraphServiceClient graphClient;
        public GroupController(IConfiguration configuration)
        {
            var cred = new ClientSecretCredential(configuration.GetValue<string>("AzureAd:TenantId"),
                                                configuration.GetValue<string>("AzureAd:ClientId"),
                                                configuration.GetValue<string>("AzureAd:ClientSecret"));
            graphClient = new GraphServiceClient(cred);

            teamIdDic = configuration.GetSection("Teams:TeamId").Get<Dictionary<string, string>>();
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            string tenantId = User.Claims.Where(c => c.Type == "http://schemas.microsoft.com/identity/claims/tenantid").FirstOrDefault().Value;
            string teamId = teamIdDic[tenantId];
            var rawGroups = await graphClient.Teams[teamId].Channels.Request()
                                                                    .Filter("membershipType eq 'private'")
                                                                    .GetAsync();
            List<Models.Group> groups = new List<Models.Group> { };
            Console.WriteLine("Nombre de groupes : " + rawGroups.Count);
            foreach (var channel in rawGroups)
            {
                Console.WriteLine(channel.DisplayName);
                groups.Add(new Models.Group { Id = channel.Id, Title = channel.DisplayName });
            }
            return Ok(groups);
        }

        [HttpPost]
        public async Task<ActionResult<string>> Post(Models.Group group)
        {
            var userOID = User.Claims.Where(c => c.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier").FirstOrDefault().Value;
            var channel = new Channel
            {
                DisplayName = group.Title,
                MembershipType = ChannelMembershipType.Private,
                Members = new ChannelMembersCollectionPage()
                {
                    new AadUserConversationMember
                    {
                        Roles = new List<String>()
                        {
                            "owner"
                        },
                        AdditionalData = new Dictionary<string, object>()
                        {
                            {"user@odata.bind", $"https://graph.microsoft.com/v1.0/users('{userOID}')"}
                        }
                    }
                }

            };
            string tenantId = User.Claims.Where(c => c.Type == "http://schemas.microsoft.com/identity/claims/tenantid").FirstOrDefault().Value;
            string teamId = teamIdDic[tenantId];
            var createdChannel = await graphClient.Teams[teamId].Channels.Request().AddAsync(channel);
            return Created(Request.Path.ToString() + "/" + createdChannel.DisplayName,
                            new Models.Group
                            {
                                Id = createdChannel.Id,
                                Title = createdChannel.DisplayName
                            });
        }

        [HttpDelete]
        [Route("{groupId}")]
        public async Task<ActionResult> Delete(string groupId)
        {
            string tenantId = User.Claims.Where(c => c.Type == "http://schemas.microsoft.com/identity/claims/tenantid").FirstOrDefault().Value;
            string teamId = teamIdDic[tenantId];
            await graphClient.Teams[teamId].Channels[groupId].Request().DeleteAsync();
            return NoContent();
        }
    }
}