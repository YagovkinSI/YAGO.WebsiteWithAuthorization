using System;

namespace YAGO.WebsiteWithAuthorization.Host.Models
{
	/// <summary>
	/// Прогноз погоды
	/// </summary>
	public class WeatherForecastApi
	{
		internal WeatherForecastApi(DateTime date, int temperatureC, string summary)
		{
			Date = date;
			TemperatureC = temperatureC;
			Summary = summary;
		}

		/// <summary>
		/// Дата
		/// </summary>
		public DateTime Date { get; }

		/// <summary>
		/// Температура в градусах Цельсия
		/// </summary>
		public int TemperatureC { get; }

		/// <summary>
		/// Температура в градусах Фаренгейта
		/// </summary>
		public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

		/// <summary>
		/// Общее описание
		/// </summary>
		public string Summary { get; }
	}
}
