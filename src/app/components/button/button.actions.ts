import { Action, Selector, State, StateContext } from "@ngxs/store";
import { timer } from "rxjs";
import { Injectable } from "@angular/core";

/* Actions classes */

export class ButtonDefault {
    static readonly type = "[BUTTON] Button default";
    constructor() {}
}

export class ButtonWorking {
    static readonly type = "[BUTTON] Button working";
    constructor() {}
}

export class ButtonActionCompleted {
    static readonly type = "[BUTTON] Button action completed";
    constructor() {}
}

/* Model */

export enum ButtonStateEnum {
    DEFAULT = "Default",
    WORKING = "Working",
    DONE = "Done",
}

/* State */

@State<ButtonStateEnum>({
    name: "button",
    defaults: ButtonStateEnum.DEFAULT,
})
@Injectable()
export class ButtonState {
    /** Custom selector */
    @Selector()
    static buttonState(state: ButtonStateEnum): ButtonStateEnum {
        return state;
    }

    @Action(ButtonDefault)
    buttonDefault(ctx: StateContext<ButtonStateEnum>) {
        ctx.setState(ButtonStateEnum.DEFAULT);
    }

    @Action(ButtonWorking)
    buttonWorking(ctx: StateContext<ButtonStateEnum>) {
        ctx.setState(ButtonStateEnum.WORKING);
    }

    @Action(ButtonActionCompleted)
    buttonActionCompleted(ctx: StateContext<ButtonStateEnum>) {
        ctx.setState(ButtonStateEnum.DONE);
        timer(2000).subscribe((time) => ctx.setState(ButtonStateEnum.DEFAULT));
    }
}
