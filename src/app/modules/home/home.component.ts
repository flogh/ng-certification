import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WeatherData } from "../../models/weather-data";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { WeatherApiService } from "../../services/weather-api/weather-api.service";
import { getIcon } from "../../helpers/get-icon";
import { interval } from "rxjs";
import { Store } from "@ngxs/store";
import { ButtonActionCompleted, ButtonDefault } from "../../components/button/button.actions";
import Countries from "../../data/countries.json";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    public form: FormGroup = this.formBuilder.group({
        country: ["", [Validators.required]],
        zipCode: ["", [Validators.required]],
    });
    public zipCodesData: WeatherData[];
    public countries: string[] = Countries.map((c) => c.name);
    public getIcon: (zipCodeData: WeatherData) => string = getIcon;

    public wait: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private localStorageService: LocalStorageService,
        private weatherApiService: WeatherApiService,
        private store: Store,
    ) {}

    public ngOnInit(): void {
        this.getInitData();
        interval(30000).subscribe(async () => this.getInitData());
    }

    private async getInitData(): Promise<void> {
        this.wait = true;
        this.zipCodesData = [];
        for await (const zipCode of this.localStorageService.getZipeCodes()) {
            try {
                const zipCodeData: WeatherData = await this.weatherApiService.getData(zipCode, "FR").toPromise();
                zipCodeData.zipCode = zipCode;
                this.zipCodesData.push(zipCodeData);
            } catch (e) {}
        }
        this.wait = false;
    }

    public async addZipCode(): Promise<void> {
        try {
            const countryCode: string = Countries.filter((c) => c.name === this.form.value.country)[0].code;
            const zipCodeData: WeatherData = await this.weatherApiService
                .getData(this.form.value.zipCode, countryCode)
                .toPromise();
            this.localStorageService.addZipCode(this.form.value.zipCode);
            zipCodeData.zipCode = this.form.value.zipCode;
            this.zipCodesData.push(zipCodeData);
            this.form.reset();
            this.store.dispatch(new ButtonActionCompleted());
        } catch (e) {
            this.store.dispatch(new ButtonDefault());
        }
    }

    public async removeZipCode(zipCodeData: WeatherData, index: number): Promise<void> {
        this.localStorageService.removeZipCode(zipCodeData.zipCode);
        this.zipCodesData.splice(index, 1);
    }
}
