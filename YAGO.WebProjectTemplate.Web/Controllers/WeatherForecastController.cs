using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using YAGO.Services.WeatherForecasts;
using YAGO.Services.WeatherForecasts.Models;

namespace YAGO.WebProjectTemplate.Web.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class WeatherForecastController : ControllerBase
	{
		[HttpGet]
		public IEnumerable<WeatherForecast> Get()
		{
			return WeatherForecastService.GetWeatherForecastList();
		}
	}
}
