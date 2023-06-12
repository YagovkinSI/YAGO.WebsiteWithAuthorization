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

		// ���� ����� ���������� ������ ����������. ����������� ���� ����� ��� ���������� ����� � ���������.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddScoped<WeatherForecastService>();

			services.AddControllersWithViews();

			// � ��������� (production) ����� React ����� ������������� �� ����� ��������.
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/build";
			});
		}

		// ���� ����� ���������� ������ ����������. ����������� ���� ����� ��� ��������� ��������� HTTP-��������.
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
				// �������� HSTS �� ��������� � 30 ����. �� ������ �������� ��� ��� ������� ���������, ��. https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}
		}
	}
}
