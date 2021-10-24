import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "./services/local-storage/local-storage.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WeatherApiService } from "./services/weather-api/weather-api.service";
import { WeatherData } from "./models/weather-data";

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    name = "Angular";
    public form: FormGroup;
    public zipCodesData: WeatherData[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private localStorageService: LocalStorageService,
        private weatherApiService: WeatherApiService,
    ) {}

    public async ngOnInit(): Promise<void> {
        this.form = this.formBuilder.group({
            zipCode: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        });
        for await (const zipCode of this.localStorageService.getZipeCodes()) {
            try {
                const zipCodeData: WeatherData = await this.weatherApiService.getData(zipCode).toPromise();
                zipCodeData.zipCode = zipCode;
                this.zipCodesData.push(zipCodeData);
            } catch (e) {}
        }
    }

    public async addZipCode(): Promise<void> {
        try {
            const zipCodeData: WeatherData = await this.weatherApiService.getData(this.form.value.zipCode).toPromise();
            this.localStorageService.addZipCode(this.form.value.zipCode);
            zipCodeData.zipCode = this.form.value.zipCode;
            this.zipCodesData.push(zipCodeData);
            this.form.controls.zipCode.setValue("");
        } catch (e) {}
    }

    public async removeZipCode(zipCodeData: WeatherData, index: number): Promise<void> {
        this.localStorageService.removeZipCode(zipCodeData.zipCode);
        this.zipCodesData.splice(index, 1);
    }

    public getIcon(zipCodeData: WeatherData): string {
        const weatherId: number = zipCodeData.weather[0].id;
        if (weatherId === 800) {
            return "sun";
        } else if (weatherId >= 200 && weatherId <= 232) {
            return "clouds";
        } else if (weatherId >= 300 && weatherId <= 321) {
            return "rain";
        } else if (weatherId >= 500 && weatherId <= 531) {
            return "rain";
        } else if (weatherId >= 600 && weatherId <= 622) {
            return "snow";
        } else if (weatherId >= 701 && weatherId <= 781) {
            return "clouds";
        } else if (weatherId >= 801 && weatherId <= 804) {
            return "clouds";
        }
    }
}
