using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;

namespace backend.Controllers
{

    [ApiController]
    [Authorize]
    [Route("api/[controller]")]

    public class UserController : ControllerBase
    {
        private readonly Dictionary<string, string> teamIdDic;
        private readonly GraphServiceClient graphClient;

        public UserController(GraphServiceClient graphServiceClient, IConfiguration configuration)
        {
            graphClient = graphServiceClient;
            teamIdDic = configuration.GetSection("Teams:TeamId").Get<Dictionary<string, string>>();
        }

        [HttpGet]
        [Route("Groups")]
        public async Task<ActionResult<List<Models.Group>>> Get()
        {
            string tenantId = User.Claims.Where(c => c.Type == "http://schemas.microsoft.com/identity/claims/tenantid").FirstOrDefault().Value;
            string teamId = teamIdDic[tenantId];
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