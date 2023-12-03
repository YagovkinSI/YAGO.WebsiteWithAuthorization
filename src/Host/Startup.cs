﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using YAGO.Database;
using YAGO.Entities.Models;
using YAGO.Service.Authorization;
using YAGO.Services.WeatherForecasts;

namespace YAGO.WebsiteWithAuthorization.Web
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
			AddDbContext(services);

			AddIdentity(services);

			AddAppServices(services);

			services.AddControllersWithViews();

			AddSpaStaticFiles(services);

			AddSwagger(services);
		}

		private void AddDbContext(IServiceCollection services)
		{
			services.AddDbContext<DatabaseContext>(options =>
				options.UseSqlServer(
					Configuration.GetConnectionString("DefaultConnection"),
					b => b.MigrationsAssembly("YAGO.WebsiteWithAuthorization.Host")
				));
		}

		private static void AddIdentity(IServiceCollection services)
		{
			services.AddIdentity<User, IdentityRole>(options =>
			{
				options.Password.RequireNonAlphanumeric = false;
				options.User.AllowedUserNameCharacters =
					"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			})
				.AddEntityFrameworkStores<DatabaseContext>();
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
			services.AddScoped<AuthorizationService>();
			services.AddScoped<WeatherForecastService>();
		}

		private static void AddSwagger(IServiceCollection services)
		{
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "YAGO Website With Authorization", Version = "v1" });
			});
		}

		// Этот метод вызывается средой выполнения. Используйте этот метод для настройки конвейера HTTP-запросов.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			ExceptionHandling(app, env);

			app.UseSwagger();
			app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "YAGO Website With Authorization v1"));

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

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