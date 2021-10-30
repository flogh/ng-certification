import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "app-input",
    templateUrl: "./input.component.html",
    styleUrls: ["./input.component.scss"],
})
export class InputComponent {
    @Input() public form: FormGroup;
    @Input() public name: string;
    @Input() public placeholder: string;
    @Input() public type: string = "text";
}
