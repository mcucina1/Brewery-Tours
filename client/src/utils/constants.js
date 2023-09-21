import ulog from 'ulog';

export function setLogLevelIfDefault() {
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    if (!urlParams.has("log")) {
        if (process.env.CLIENT_LOG_LEVEL === "INFO") {
            ulog.level = ulog.INFO;
        } else {
            ulog.level = ulog.ERROR;
        }
    }
}

setLogLevelIfDefault();

export const LOG = ulog("App");

export const CLIENT_TEAM_NAME = "t10 Random Code Generators";

export const EARTH_RADIUS_UNITS = { "mi": 3959, "km": 6371, "NM": 3440 };

export const DEFAULT_STARTING_POSITION = { lat: 40.5734, lng: -105.0865 };