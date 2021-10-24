import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class LocalStorageService {
    public addZipCode(zipCode: string): void {
        const zipCodes: string[] = JSON.parse(localStorage.getItem("zipCodes")) || [];
        zipCodes.push(zipCode);
        localStorage.setItem("zipCodes", JSON.stringify(zipCodes));
        return;
    }
}
