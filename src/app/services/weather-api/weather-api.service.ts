import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WeatherData } from "../../models/weather-data";

@Injectable({
    providedIn: "root",
})
export class WeatherApiService {
    private apiKey: string = "5a4b2d457ecbef9eb2a71e480b947604";

    constructor(private http: HttpClient) {}

    public getData(zipCode: string): Observable<WeatherData> {
        return this.http.get<WeatherData>(
            `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},FR&units=metric&appid=${this.apiKey}`,
        );
    }
}