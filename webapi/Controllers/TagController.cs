using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using webapi.Models;
using webapi.ViewModels;

namespace webapi.Controllers
{
    [ApiController]
    public class TagController : ControllerBase
    {
        [HttpGet("v1/tags")]
        public IActionResult Get([FromServices] IDbConnection connection)
        {
            return Ok(connection.Query<Tag>("SELECT * FROM TAG"));
        }

        [HttpPost("v1/tags")]
        public IActionResult Post(TagViewModel entity, [FromServices] IDbConnection connection) 
        {
            var query = @"INSERT INTO TAG (Name) VALUES (:name)";

            connection.Execute(query, new { name = entity.Name });

            return Ok("Criado com sucesso");
        }

        [HttpPut("v1/tags/{tagId:int}")]
        public IActionResult Put([FromRoute] int tagId, TagViewModel entity, [FromServices,] IDbConnection connection)
        {
            var query = @"UPDATE TAG SET Name = :name WHERE tagId = :tagId";
            var rowsAffected = connection.Execute(query, new { name = entity.Name, tagId });

            if (rowsAffected > 0)
            {
                return Ok("Registro deletado com sucesso");
            }
            else
            {
                return NotFound("Registro não encontrado");
            }
        }

        [HttpDelete("v1/tags/{id:int}")]
        public IActionResult Delete([FromRoute] int tagId, [FromServices] IDbConnection connection)
        {
            var query = @"DELETE FROM TAG WHERE tagId = :tagId";
            var rowsAffected = connection.Execute(query, new { tagId });

            if (rowsAffected > 0)
            {
                return Ok("Registro deletado com sucesso");
            }
            else
            {
                return NotFound("Registro não encontrado");
            }
        }
    }
}
