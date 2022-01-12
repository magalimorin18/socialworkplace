using backend.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{

    [ApiController]
    [Authorize]
    [Route("api/[controller]")]

    public class UserController : ControllerBase
    {
        private readonly string teamId;
        private readonly GraphServiceClient graphClient;

        public UserController(GraphServiceClient graphServiceClient, IConfiguration configuration)
        {
            graphClient = graphServiceClient;
            teamId = configuration.GetSection("Teams")["TeamId"];
        }

        [HttpDelete]
        [Route("{groupId}")]
        public async Task<ActionResult> Delete(string groupId)
        {
            //TODO : Supprimer l'utilisateur du groupe (channel) dans l'équipe
            await graphClient.Teams[teamId].Channels[groupId].Members["memberId"].Request().DeleteAsync();
            return NoContent();
        }

        [HttpPut]
        [Route("{groupId}")]
        public async Task<ActionResult> Put(string groupId)
        {
            //TODO : Ajoute l'utilisateur au groupe (channel)
            var convMember = new AadUserConversationMember
            {
                Roles = new List<string>()
                {
                    "owner"
                },
                AdditionalData = new Dictionary<string, object>()
                {
                    {"user@odata.bind", "https://graph.microsoft.com/v1.0/me"}
                }
            };
            await graphClient.Teams[teamId].Channels[groupId].Members.Request().AddAsync(convMember);
            return Ok();
        }
    }
}