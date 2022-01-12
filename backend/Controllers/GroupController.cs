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

    public class GroupController : ControllerBase
    {
        private readonly string teamId;
        private readonly GraphServiceClient graphClient;

        public GroupController(GraphServiceClient graphServiceClient, IConfiguration configuration)
        {
            graphClient = graphServiceClient;
            teamId = configuration.GetSection("Teams")["TeamId"];
        }

        [HttpGet]
        public async Task<ActionResult<List<Models.Group>>> Get()
        {
            var rawGroups = await graphClient.Teams[teamId].Channels.Request().GetAsync();
            List<Models.Group> groups = new List<Models.Group> { };
            foreach (var channel in rawGroups)
            {
                groups.Add(new Models.Group { Id = channel.Id, Title = channel.DisplayName });
            }
            return Ok(groups);
        }

        [HttpPost]
        public async Task<ActionResult<string>> Post(Models.Group group)
        {
            //TODO : Ajouter un nouveau groupe (channel) dans l'équipe
            var channel = new Channel
            {
                DisplayName = group.Title,
                MembershipType = ChannelMembershipType.Private
            };
            var createdChannel = await graphClient.Teams[teamId].Channels.Request().AddAsync(channel);
            return Created(Request.Path.ToString() + "/" + createdChannel.DisplayName, createdChannel);
        }

        [HttpDelete]
        [Route("{groupId}")]
        public async Task<ActionResult> Delete(string groupId)
        {
            //TODO : Supprimer le groupe (channel) dans l'équipe
            await graphClient.Teams[teamId].Channels[groupId].Request().DeleteAsync();
            return NoContent();
        }
    }
}