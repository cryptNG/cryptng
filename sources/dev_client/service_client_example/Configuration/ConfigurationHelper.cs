using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace app.Configuration
{
    public static class ConfigurationHelper
    {
        public static IConfiguration GetConfiguration()
        {
            var h = new WebHostBuilder();
            var environment = h.GetSetting("environment");

            var builder = new ConfigurationBuilder()//DEFAULT: .SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
              .AddJsonFile($"appsettings.{Environment.MachineName}.json", optional: true);
            if (!String.IsNullOrEmpty(environment))
            {
                builder.AddJsonFile($"appsettings.{environment}.json", optional: true);
            }
            return builder.Build();
        }
    }
}
