import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WeatherData } from "../../models/weather-data";
import { Forecast } from "../../models/forecast";

@Injectable({
    providedIn: "root",
})
export class WeatherApiService {
    private apiKey: string = "5a4b2d457ecbef9eb2a71e480b947604";

    constructor(private http: HttpClient) {}

    public getData(zipCode: string, countryCode: string): Observable<WeatherData> {
        return this.http.get<WeatherData>(
            `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&units=metric&appid=${this.apiKey}`,
        );
    }

    public getForecast(zipCode: string, countryCode: string): Observable<Forecast> {
        return this.http.get<Forecast>(
            `https://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipCode},${countryCode}&units=metric&appid=${this.apiKey}`,
        );
    }
}
