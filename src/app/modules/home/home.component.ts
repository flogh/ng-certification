import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WeatherData } from "../../models/weather-data";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { WeatherApiService } from "../../services/weather-api/weather-api.service";
import { getIcon } from "../../helpers/get-icon";
import { interval } from "rxjs";
import { Store } from "@ngxs/store";
import { ButtonActionCompleted, ButtonDefault, ButtonWorking } from "../../components/button/button.actions";
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
    public locationsData: WeatherData[];
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
        interval(30000).subscribe(() => this.getInitData());
    }

    private async getInitData(): Promise<void> {
        this.wait = true;
        this.locationsData = [];
        for await (const location of this.localStorageService.getLocations()) {
            try {
                const locationData: WeatherData = await this.weatherApiService
                    .getData(location.zipCode, location.countryCode)
                    .toPromise();
                locationData.zipCode = location.zipCode;
                locationData.countryCode = location.countryCode;
                this.locationsData.push(locationData);
            } catch (e) {}
        }
        this.wait = false;
    }

    public async addZipCode(): Promise<void> {
        const index: number = Countries.findIndex((c) => c.name === this.form.value.country);
        if (index !== -1) {
            try {
                this.store.dispatch(new ButtonWorking());
                const countryCode: string = Countries.filter((c) => c.name === this.form.value.country)[0].code;
                const locationData: WeatherData = await this.weatherApiService
                    .getData(this.form.value.zipCode, countryCode)
                    .toPromise();
                this.localStorageService.addLocation({
                    zipCode: this.form.value.zipCode,
                    countryCode,
                });
                locationData.zipCode = this.form.value.zipCode;
                locationData.countryCode = countryCode;
                this.locationsData.push(locationData);
                this.form.reset();
                this.store.dispatch(new ButtonActionCompleted());
            } catch (e) {
                this.store.dispatch(new ButtonDefault());
            }
        }
    }

    public async removeZipCode(locationsData: WeatherData, index: number): Promise<void> {
        this.localStorageService.removeLocation({
            countryCode: locationsData.countryCode,
            zipCode: locationsData.zipCode,
        });
        this.locationsData.splice(index, 1);
    }
}
