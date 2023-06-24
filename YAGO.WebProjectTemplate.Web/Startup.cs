using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using YAGO.Services.WeatherForecasts;

namespace YAGO.WebProjectTemplate.Web
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// Этот метод вызывается средой выполнения. Используйте этот метод для добавления служб в контейнер.
		public void ConfigureServices(IServiceCollection services)
		{
			AddAppServices(services);

			services.AddControllersWithViews();

			AddSpaStaticFiles(services);

			AddSwagger(services);
		}

		private static void AddSpaStaticFiles(IServiceCollection services)
		{
			// В подакшене (production) файлы React будут обслуживаться из этого каталога.
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/build";
			});
		}

		private static void AddAppServices(IServiceCollection services)
		{
			services.AddScoped<WeatherForecastService>();
		}

		private static void AddSwagger(IServiceCollection services)
		{
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "YAGO Web Project Template", Version = "v1" });
			});
		}

		// Этот метод вызывается средой выполнения. Используйте этот метод для настройки конвейера HTTP-запросов.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			ExceptionHandling(app, env);

			app.UseSwagger();
			app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "YAGO Web Project Template v1"));

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseRouting();

			UseControllers(app);

			UseSpa(app, env);
		}

		private static void ExceptionHandling(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				// Значение HSTS по умолчанию — 30 дней. Вы можете изменить это для рабочих сценариев, см. https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}
		}

		private static void UseControllers(IApplicationBuilder app)
		{
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller}/{action=Index}/{id?}");
			});
		}

		private static void UseSpa(IApplicationBuilder app, IWebHostEnvironment env)
		{
			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
					spa.UseReactDevelopmentServer(npmScript: "start");
			});
		}
	}
}
