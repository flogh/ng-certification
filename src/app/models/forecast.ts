import { WeatherData } from "./weather-data";

export interface Forecast {
    city: {
        country: string;
        id: number;
        name: string;
        population: number;
        timezone: number;
    };
    list: WeatherData[];
}
