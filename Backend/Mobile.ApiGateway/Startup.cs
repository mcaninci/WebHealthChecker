using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Dapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Mobile.ApiGateway
{

    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddControllers();
            Dapper.SimpleCRUD.SetDialect(SimpleCRUD.Dialect.MySQL);
   
            //Cors policy
            services.AddCors(options =>
        {
            options.AddPolicy(MyAllowSpecificOrigins,
            builder =>
            {
                builder.SetIsOriginAllowed(isOriginAllowed: _ => true).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            });
        });
            // }

            services.AddAuthentication().AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", options => { });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("BasicAuthentication", new AuthorizationPolicyBuilder("BasicAuthentication").RequireAuthenticatedUser().Build());
            });
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("CoreSwagger", new Info
            //    {
            //        Title = "Swagger on ASP.NET Core",
            //        Version = "1.0.0",
            //        Description = "Try Swagger on (ASP.NET Core 2.1)",
            //        Contact = new Contact()
            //        {
            //            Name = "Swagger Implementation Bora kasmer",
            //            Url = "http://borakasmer.com",
            //            Email = "bora@borakasmer.com"
            //        },
            //        TermsOfService = "http://swagger.io/terms/"
            //    });
            //});

            services.AddHttpContextAccessor();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
               app.UseExceptionHandler("/error-local-development");

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor |
                   ForwardedHeaders.XForwardedProto
            });

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //app.UseSwagger().UseSwaggerUI(c =>
            //        {
            //            //TODO: Either use the SwaggerGen generated Swagger contract (generated from C# classes)
            //            c.SwaggerEndpoint("/swagger/CoreSwagger/swagger.json", "Swagger Test .Net Core");

            //            //TODO: Or alternatively use the original Swagger contract thats included in the static files
            //            // c.SwaggerEndpoint("/swagger-original.json", "Swagger Petstore Original");
            //        });
        }
    }
}
