import "./style.css";
import getWeather from "./weather";
import { ICON_MAP } from "./iconMap";

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

function positionSuccess({ coords }) {
  getWeather(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    .then(renderWeather)
    .catch((e) => {
      console.error(e);
      alert("Error");
    });
}

function positionError() {
  alert(
    "There was an error gettin your location. Please allow us to use your location and refresh the page."
  );
}

function renderWeather({ currentWeather, dailyWeather, hourlyWeather }) {
  console.log(hourlyWeather);
  renderCurrentWeather(currentWeather);
  renderDailyWeather(dailyWeather);
  renderHourlyWeather(hourlyWeather);
  document.body.classList.remove("blurred");
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconUrl(iconCode) {
  return `weather-icons/${ICON_MAP.get(iconCode)}.svg`;
}

function renderCurrentWeather(currentWeather) {
  const currentIcon = document.querySelector("[data-current-icon]");
  currentIcon.src = getIconUrl(currentWeather.iconCode);
  setValue("current-temp", currentWeather.currentTemp);
  setValue("current-high", currentWeather.highTemp);
  setValue("current-wind", currentWeather.windSpeed);
  setValue("current-fl-high", currentWeather.highFeelsLike);
  setValue("current-low", currentWeather.lowTemp);
  setValue("current-precip", currentWeather.precip);
  setValue("current-fl-low", currentWeather.lowFeelsLike);
}

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  day: "numeric",
});

function renderDailyWeather(dailyWeather) {
  const dailySection = document.querySelector("[data-daily-section]");
  const dayCardTemplate = document.getElementById("day-card-template");
  dailySection.innerHTML = "";
  dailyWeather.forEach((day) => {
    const el = dayCardTemplate.content.cloneNode(true);
    setValue("temp", day.maxTemp, { parent: el });
    setValue("date", DAY_FORMATTER.format(day.timestamp), {
      parent: el,
    });
    el.querySelector("[data-icon]").src = getIconUrl(day.iconCode);
    dailySection.append(el);
  });
}

const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
});
function renderHourlyWeather(hourlyWeather) {
  const hourlySection = document.querySelector("[data-hourly-section]");
  const hourCardTemplate = document.getElementById("hour-card-template");
  hourlySection.innerHTML = "";
  hourlyWeather.forEach((hour) => {
    const el = hourCardTemplate.content.cloneNode(true);
    setValue("day", DAY_FORMATTER.format(hour.timestamp), { parent: el });
    setValue("time", HOUR_FORMATTER.format(hour.timestamp) + ":00", {
      parent: el,
    });
    setValue("temp", hour.temperature, { parent: el });
    setValue("fl-temp", hour.feelsLike, { parent: el });
    setValue("precip", hour.precip, { parent: el });
    setValue("wind", hour.windSpeed, { parent: el });
    el.querySelector("[data-icon]").src = getIconUrl(hour.iconCode);
    hourlySection.append(el);
  });
}
