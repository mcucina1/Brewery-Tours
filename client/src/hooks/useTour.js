import { sendAPIRequest, getOriginalServerUrl } from "../utils/restfulAPI";

export async function sendTourRequest(places, respTime, earthRadius) {
    let tourResponse;
    tourResponse = await sendAPIRequest({
        "requestType": "tour",
        "earthRadius": earthRadius,
        "response": respTime,
        "places": places
    }, getOriginalServerUrl());
    return tourResponse;
}
