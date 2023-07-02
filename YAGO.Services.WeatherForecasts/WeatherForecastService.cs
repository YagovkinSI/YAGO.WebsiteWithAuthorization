using System;
using System.Collections.Generic;
using System.Linq;
using YAGO.Services.WeatherForecasts.Models;

namespace YAGO.Services.WeatherForecasts
{
    public class WeatherForecastService
	{
		private static readonly string[] Summaries = new[]
		{
			"Ясно", "Облачно", "Пасмурно", "Дождь", "Ливень", "Град", "Гроза", "Снег"
		};

		public static IEnumerable<WeatherForecast> GetWeatherForecastList()
		{
			var rng = new Random();
			return Enumerable.Range(1, 5).Select(index => new WeatherForecast
			{
				Date = DateTime.Now.AddDays(index),
				TemperatureC = rng.Next(-20, 55),
				Summary = Summaries[rng.Next(Summaries.Length)]
			})
			.ToArray();
		}
	}
}
