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
            teamId = configuration.GetValue<string>("Teams:TeamId");
        }

        [HttpGet]
        [Route("{groupId}")]
        public async Task<ActionResult<List<Models.Group>>> Get()
        {
            var rawGroups = await graphClient.Teams[teamId].Channels.Request()
                                                                    .Filter("membershipType eq 'private'")
                                                                    .GetAsync();
            List<Models.Group> groups = new List<Models.Group> { };
            foreach (var channel in rawGroups)
            {
                groups.Add(new Models.Group { Id = channel.Id, Title = channel.DisplayName });
            }
            return Ok(groups);
        }
    }
}