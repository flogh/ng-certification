import { Component, Input, TemplateRef } from "@angular/core";
import { Store } from "@ngxs/store";
import { ButtonState, ButtonStateEnum } from "./button.actions";
import { Observable } from "rxjs";

@Component({
    selector: "app-button",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
    @Input() public templateDefault: TemplateRef<any>;
    @Input() public templateWorking: TemplateRef<any>;
    @Input() public templateDone: TemplateRef<any>;

    public state$: Observable<ButtonStateEnum> = this.store.select(ButtonState.buttonState);

    public ButtonStateEnum: typeof ButtonStateEnum = ButtonStateEnum;

    constructor(private store: Store) {}
}
