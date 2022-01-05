using backend.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;

namespace backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class GroupController : ControllerBase
    {

        // GraphServiceClient graphClient = new GraphServiceClient(authProvider);

        // var channels = await graphClient.Teams["{team-id}"].Channels
        //     .Request()
        //     .GetAsync();
        private static List<Models.Group> Groups = new List<Models.Group>{
            new Models.Group{Id = 0,Title="Football"},
            new Models.Group{Id = 1,Title="Cinéma"}
        };

        [HttpGet]
        public ActionResult<List<Models.Group>> Get()
        {
            //TODO : Récupérer les noms des groupes (channels de discussions) crées dans l'équipe ainsi que leur id
            return Ok(Groups);
        }

        [HttpPost]
        public ActionResult<string> Post(Models.Group group)
        {
            var existingGroup = Groups.Find(g => g.Title == group.Title);
            if (existingGroup != null)
            {
                return Conflict("This group already exists.");
            }
            //TODO : Ajouter un nouveau groupe (channel) dans l'équipe
            group.Id = -1;
            Groups.Add(group);
            return Created(Request.Path.ToString() + "/" + group.Title, group);
        }

        [HttpDelete]
        [Route("{Id}")]
        public ActionResult Delete(int Id)
        {
            var group = Groups.Find(g => g.Id == Id);
            if (group == null)
            {
                return NotFound();
            }

            //TODO : Supprimer le groupe (channel) dans l'équipe
            Groups.Remove(group);
            return NoContent();
        }

        [HttpPut]
        [Route("{GroupId}")]
        public ActionResult Put(Models.User user, int GroupId)
        {
            var exisitingGroup = Groups.Find(g => g.Id == GroupId);

            if (exisitingGroup == null)
            {
                return BadRequest("The group does not exist.");
            }

            //TODO : Donner le rôle du groupe (channel) à l'utilisateur
            return Ok();
        }
    }
}