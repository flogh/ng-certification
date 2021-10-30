import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Directive({
    selector: "[bold]",
})
export class BoldDirective implements OnInit {
    @Input() public option: string;
    @Input() public form: FormGroup;
    @Input() public name: string;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    public ngOnInit() {
        this.setValue(this.form.controls[this.name].value);
        this.form.controls[this.name].valueChanges.subscribe((val) => this.setValue(val));
    }

    private setValue(val: string): void {
        const html: string = this.option.replace(new RegExp(`(${val})`, "gi"), `<b>$1</b>`);
        this.renderer.setProperty(this.elementRef.nativeElement, "innerHTML", html);
    }
}
