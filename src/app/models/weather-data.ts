import { Weather } from "./weather";

export interface WeatherData {
    base: string;
    clouds: {
        all: string;
    };
    cod: number;
    coord: {
        lon: number;
        lat: number;
    };
    dt: number;
    id: number;
    main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    name: string;
    sys: {
        country: string;
        id: number;
        sunrise: number;
        sunset: number;
        type: number;
    };
    timezone: number;
    visibility: number;
    weather: Weather[];
    wind: {
        speed: number;
        deg: number;
    };
    temp: {
        min: number;
        max: number;
    };
    zipCode: string;
    countryCode: string;
}
