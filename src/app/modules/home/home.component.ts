import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WeatherData } from "../../models/weather-data";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { WeatherApiService } from "../../services/weather-api/weather-api.service";
import { getIcon } from "../../helpers/get-icon";
import { interval, Observable } from "rxjs";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
    public form: FormGroup;
    public zipCodesData: WeatherData[];
    public wait: boolean;
    public getIcon: (zipCodeData: WeatherData) => string = getIcon;

    constructor(
        private formBuilder: FormBuilder,
        private localStorageService: LocalStorageService,
        private weatherApiService: WeatherApiService,
    ) {}

    public async ngOnInit(): Promise<void> {
        this.form = this.formBuilder.group({
            zipCode: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        });
        this.getInitData();
        interval(30000).subscribe(async () => this.getInitData());
    }

    private async getInitData(): Promise<void> {
        this.wait = true;
        this.zipCodesData = [];
        for await (const zipCode of this.localStorageService.getZipeCodes()) {
            try {
                const zipCodeData: WeatherData = await this.weatherApiService.getData(zipCode).toPromise();
                zipCodeData.zipCode = zipCode;
                this.zipCodesData.push(zipCodeData);
            } catch (e) {}
        }
        this.wait = false;
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
}
