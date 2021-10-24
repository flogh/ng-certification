import { WeatherData } from "../models/weather-data";

export const getIcon = (zipCodeData: WeatherData): string => {
    const weatherId: number = zipCodeData.weather[0].id;
    if (weatherId === 800) {
        return "sun";
    } else if (weatherId >= 200 && weatherId <= 232) {
        return "clouds";
    } else if (weatherId >= 300 && weatherId <= 321) {
        return "rain";
    } else if (weatherId >= 500 && weatherId <= 531) {
        return "rain";
    } else if (weatherId >= 600 && weatherId <= 622) {
        return "snow";
    } else if (weatherId >= 701 && weatherId <= 781) {
        return "clouds";
    } else if (weatherId >= 801 && weatherId <= 804) {
        return "clouds";
    }
};
