using Microsoft.Extensions.DependencyInjection;
using Oracle.ManagedDataAccess.Client;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000") // Atualize com a origem real do seu cliente
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


builder.Services.AddTransient<IDbConnection>((sp) =>
{
    return new OracleConnection(builder.Configuration.GetConnectionString("DefaultConnection"));
});



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors("AllowSpecificOrigin");

app.Run();
