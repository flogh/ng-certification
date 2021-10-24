import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "./services/local-storage/local-storage.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    name = "Angular";
    public form: FormGroup;

    constructor(private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {}

    public ngOnInit() {
        this.form = this.formBuilder.group({
            zipCode: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        });
    }

    public addZipCode(): void {
        this.localStorageService.addZipCode(this.form.value.zipCode);
        this.form.controls.zipCode.setValue("");
    }
}
