import { Component, OnInit } from "@angular/core";
import { WeatherApiService } from "../../services/weather-api/weather-api.service";
import { ActivatedRoute } from "@angular/router";
import { Forecast } from "../../models/forecast";
import { WeatherData } from "../../models/weather-data";
import { getIcon } from "app/helpers/get-icon";

@Component({
    selector: "app-forecast",
    templateUrl: "./forecast.component.html",
    styleUrls: ["./forecast.component.css"],
})
export class ForecastComponent implements OnInit {
    public zipCode: string;
    public forecast: Forecast;
    public getIcon: (zipCodeData: WeatherData) => string = getIcon;

    constructor(private route: ActivatedRoute, private weatherApiService: WeatherApiService) {}

    public async ngOnInit(): Promise<void> {
        this.zipCode = this.route.snapshot.params.zipCode;
        this.forecast = await this.weatherApiService.getForecast(this.zipCode).toPromise();
        this.forecast.list.length = 5;
    }
}
