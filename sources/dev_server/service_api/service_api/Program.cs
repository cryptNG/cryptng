using computingtoken_distiller_api.Configuration;
using computingtoken_distiller_api.Evidencing;

var builder = ConfigurationHelper.CreateExtendedBuilder();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddHostedService<EvidencingService>();

var app = builder.Build();



// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

new Thread(() =>
{
    Thread.CurrentThread.IsBackground = true;
    /* run your code here */

    computingtoken_distiller_api.HostRunner.CreateHostBuilder(args, "appsettings.json").Build().Run();
}).Start();




app.Run();

