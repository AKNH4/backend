import { WeatherSummary } from './weather.enum';

export interface Weather {
  date: Date;
  temperature: number;
  summary: WeatherSummary;
}
