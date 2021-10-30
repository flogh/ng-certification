import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "app-input-autocomplete",
    templateUrl: "./input-autocomplete.component.html",
    styleUrls: ["./input-autocomplete.component.scss"],
})
export class InputAutocompleteComponent implements OnInit {
    @Input() public form: FormGroup;
    @Input() public name: string;
    @Input() public placeholder: string;
    @Input() public options: string[];
    @Input() public type: string = "text";

    public optionsFiltered: string[];
    public hasFocus: boolean;

    public ngOnInit() {
        this.form.controls[this.name].valueChanges.subscribe((value: string) => {
            this.optionsFiltered = this.options
                .filter((o: string) => value && o.toLowerCase().includes(value.toLowerCase()))
                .slice(0, 10);
        });
    }

    public countrySelected(country: string): void {
        this.form.controls["country"].setValue(country);
    }
}
