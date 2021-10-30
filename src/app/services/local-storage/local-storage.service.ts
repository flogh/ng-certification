import { Injectable } from "@angular/core";
import { Location } from "../../models/location";

@Injectable({
    providedIn: "root",
})
export class LocalStorageService {
    public addLocation(location: Location): void {
        const locations: Location[] = JSON.parse(localStorage.getItem("locations")) || [];
        locations.push(location);
        localStorage.setItem("locations", JSON.stringify(locations));
        return;
    }

    public removeLocation(location: Location): void {
        let locations: Location[] = JSON.parse(localStorage.getItem("locations")) || [];
        locations = locations.filter(
            (l: Location) => l.zipCode !== location.zipCode && l.countryCode !== location.countryCode,
        );
        localStorage.setItem("locations", JSON.stringify(locations));
        return;
    }

    public getLocations(): Location[] {
        return JSON.parse(localStorage.getItem("locations")) || [];
    }
}
