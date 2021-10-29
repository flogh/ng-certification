import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./modules/home/home.component";
import { ForecastComponent } from "./modules/forecast/forecast.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoadingComponent } from "./components/loading/loading.component";
import { ButtonComponent } from "./components/button/button.component";
import { NgxsModule } from "@ngxs/store";
import { ButtonState } from "./components/button/button.actions";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgxsModule.forRoot([ButtonState]),
    ],
    declarations: [AppComponent, HelloComponent, HomeComponent, ForecastComponent, LoadingComponent, ButtonComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
