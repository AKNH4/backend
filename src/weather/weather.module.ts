import { Module } from '@nestjs/common';
import { WeatherController } from './controller/weather.controller';
import { WeatherService } from './service/weather.service';

@Module({
  providers: [WeatherService],
  controllers: [WeatherController],
  exports: [WeatherService],
})
export class WeatherModule {}
