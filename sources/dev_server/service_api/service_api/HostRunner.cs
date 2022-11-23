namespace computingtoken_distiller_api
{
    public static class HostRunner
    {
        public static IHostBuilder CreateHostBuilder(string[] args, string configFilePath) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(conf =>
                    conf.AddJsonFile(configFilePath).AddEnvironmentVariables()
                )
                .ConfigureServices((hostContext, services) =>
                {
                    IConfiguration configuration = hostContext.Configuration;



                    services.AddHostedService<Evidencing.EvidencingService>();
                });
    }
}
