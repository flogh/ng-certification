import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./modules/home/home.component";
import { ForecastComponent } from "./modules/forecast/forecast.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "forecast/:id", component: ForecastComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
