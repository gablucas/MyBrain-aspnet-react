using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using webapi.Models;
using webapi.ViewModels;

namespace webapi.Controllers
{
    [ApiController]
    public class TodoController : ControllerBase
    {
        [HttpGet("v1/todos")]
        public IActionResult Get([FromQuery] int? tag, [FromServices] IDbConnection connection)
        {
            var todoQuery =
                @"SELECT 
                    TODO.TodoId, 
                    Title, 
                    Color,
                    TASK.TaskId AS TaskId,
                    Description,
                    Checked,
                    TASK.TodoId,
                    TAG.TagId AS TagId,
                    TAG.Name
                FROM 
                    TODO
                LEFT JOIN 
                    TASK ON TODO.TodoId = TASK.TodoId
                LEFT JOIN 
                    TAG ON TODO.TagId = TAG.TagId";

            if (tag != null)
            {
                todoQuery += " WHERE TODO.TagId = :tag";
            }

            var todos = new List<Todo>();

            var items = connection.Query<Todo, webapi.Models.Task, Tag, Todo>(todoQuery,
                (todo, task, tag) =>
                {
                    var checkTodo = todos.Where(x => x.TodoId == todo.TodoId).FirstOrDefault();

                    if (checkTodo == null)
                    {
                        checkTodo = todo;
                        checkTodo.Tasks.Add(task);
                        todos.Add(checkTodo);
                    }
                    else
                    {
                        checkTodo.Tasks.Add(task);
                    }

                    checkTodo.Tag = tag;

                    return todo;
                }, splitOn: "TaskId, TagId", param: new { tag });

            return Ok(todos);
        }

        [HttpPost("v1/todos")]
        public IActionResult Post([FromBody] TodoViewModel entity, [FromServices] IDbConnection connection)
        {
            var query = @"INSERT INTO TODO (Title, Color) VALUES (:Title, :Color)";
            connection.Execute(query, new { Title = entity.Title, Color = entity.Color, TagID = entity.TagId });
            return Ok("Todo criada com sucesso!");
        }

        [HttpPut("v1/todos/{todoId:int}")]
        public IActionResult Put([FromRoute] int todoId, [FromBody] TodoViewModel entity, [FromServices] IDbConnection connection)
        {
            var query =
                @"UPDATE TODO 
                SET Title = :Title, 
                    Color = :Color,
                    TagID = :TagId
                WHERE todoId = :todoId";

            var rowsAffected = connection.Execute(query, new { Title = entity.Title, Color = entity.Color, TagId = entity.TagId, todoId });

            if (rowsAffected > 0)
            {
                return Ok("Registro atualizado com sucesso");
            }
            else
            {
                return NotFound("Registro não encontrado");
            }
        }

        [HttpDelete("v1/todos/{todoId:int}")]
        public IActionResult Delete([FromRoute] int todoId, [FromServices] IDbConnection connection)
        {
            var query = @"DELETE FROM TODO WHERE todoId = :todoId";
            var rowsAffected = connection.Execute(query, new { todoId });

            if (rowsAffected > 0)
            {
                return Ok("Registro deletado com sucesso!");
            }
            else
            {
                return NotFound("Registro não encontrado!");
            }
        }
    }
}
