import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./modules/home/home.component";
import { ForecastComponent } from "./modules/forecast/forecast.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
    declarations: [AppComponent, HelloComponent, HomeComponent, ForecastComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
