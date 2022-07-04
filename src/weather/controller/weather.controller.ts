import { Controller, Get } from '@nestjs/common';
import { Weather, WeatherSummary } from '../entity';

@Controller('weather')
export class WeatherController {
  @Get()
  getWeather(): Weather {
    const random = Math.round(Math.random() * 5 + 1);
    return {
      date: new Date(),
      temperature: Math.round(Math.random() * 127),
      summary:
        random === 1
          ? WeatherSummary.COOL
          : random === 2
          ? WeatherSummary.WARM
          : random === 3
          ? WeatherSummary.FREEZING
          : WeatherSummary.HOT,
    };
  }
}
