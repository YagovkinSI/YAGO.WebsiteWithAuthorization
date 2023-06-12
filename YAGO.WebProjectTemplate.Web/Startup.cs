using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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
			services.AddScoped<WeatherForecastService>();

			services.AddControllersWithViews();

			// В подакшене (production) файлы React будут обслуживаться из этого каталога.
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/build";
			});
		}

		// Этот метод вызывается средой выполнения. Используйте этот метод для настройки конвейера HTTP-запросов.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			ExceptionHandling(app, env);

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseRouting();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
					spa.UseReactDevelopmentServer(npmScript: "start");
			});
		}

		private static void ExceptionHandling(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
				app.UseDeveloperExceptionPage();
			else
			{
				app.UseExceptionHandler("/Error");
				// Значение HSTS по умолчанию — 30 дней. Вы можете изменить это для рабочих сценариев, см. https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}
		}
	}
}
