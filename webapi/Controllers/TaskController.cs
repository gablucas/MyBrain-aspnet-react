using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using webapi.ViewModels;

namespace webapi.Controllers
{
    [ApiController]
    public class TaskController : ControllerBase
    {
        [HttpGet("v1/tasks")]
        public IActionResult Get([FromServices] IDbConnection connection)
        {
            return Ok(connection.Query<Task>("SELECT * FROM TASK"));
        }

        [HttpPost("v1/tasks")]
        public IActionResult Post([FromBody] TaskViewModel entity, [FromServices] IDbConnection connection)
        {   
            var query = @"SELECT COUNT (*) FROM TODO WHERE TodoId = :todoId";
            var listExists = connection.ExecuteScalar<int>(query, new { todoid = entity.TodoId });

            if (listExists != 0) { 
                var query2 = @"INSERT INTO TASK (Description, Checked, TodoId) VALUES (:Description, :Checked, :TodoID)";
                connection.Execute(query2, new { Description = entity.Description, Checked = entity.Checked, TodoId = entity.TodoId });
                return Ok("Tarefa criada com sucesso");
            } 
            else
            {
                return NotFound("Todo não encontrada");
            }
        }

        [HttpPut("v1/tasks/{taskId:int}")]
        public IActionResult Put([FromRoute] int taskId, [FromBody] TaskViewModel entity, [FromServices] IDbConnection connection)
        {
            var query = @"UPDATE TASK SET Description = :description, Checked = :checked WHERE TaskId = :taskId";
            var rowsAffected = connection.Execute(query, new { Description = entity.Description, Checked = entity.Checked, taskId });

            if (rowsAffected > 0)
            {
                return Ok("Registro deletado com sucesso");
            }
            else
            {
                return NotFound("Registro não encontrado");
            }
        }

        [HttpDelete("v1/tasks/{taskId:int}")]
        public IActionResult Delete([FromRoute] int taskId, [FromServices] IDbConnection connection)
        {
            var query = @"DELETE FROM TASK WHERE taskId = :taskId";
            var rowsAffected = connection.Execute(query, new { taskId });

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
