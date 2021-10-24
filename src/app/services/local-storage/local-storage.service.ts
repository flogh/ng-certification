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

    public removeZipCode(zipCode: string): void {
        let zipCodes: string[] = JSON.parse(localStorage.getItem("zipCodes")) || [];
        zipCodes = zipCodes.filter((zip) => zip !== zipCode);
        localStorage.setItem("zipCodes", JSON.stringify(zipCodes));
        return;
    }

    public getZipeCodes(): string[] {
        return JSON.parse(localStorage.getItem("zipCodes")) || [];
    }
}
