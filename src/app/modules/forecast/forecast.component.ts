import { Component, OnInit } from "@angular/core";
import { WeatherApiService } from "../../services/weather-api/weather-api.service";
import { ActivatedRoute } from "@angular/router";
import { Forecast } from "../../models/forecast";
import { WeatherData } from "../../models/weather-data";
import { getIcon } from "app/helpers/get-icon";

@Component({
    selector: "app-forecast",
    templateUrl: "./forecast.component.html",
    styleUrls: ["./forecast.component.scss"],
})
export class ForecastComponent implements OnInit {
    public forecast: Forecast;
    public getIcon: (zipCodeData: WeatherData) => string = getIcon;

    constructor(private route: ActivatedRoute, private weatherApiService: WeatherApiService) {}

    public async ngOnInit(): Promise<void> {
        const zipCode: string = this.route.snapshot.params.zipCode;
        const countryCode: string = this.route.snapshot.params.countryCode;
        this.forecast = await this.weatherApiService.getForecast(zipCode, countryCode).toPromise();
        this.forecast.list.length = 5;
    }
}
