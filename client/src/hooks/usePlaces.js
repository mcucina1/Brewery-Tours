import { useState } from 'react';
import { reverseGeocode } from '../utils/reverseGeocode';
import { LOG } from '../utils/constants';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';
import { EARTH_RADIUS_UNITS } from '../utils/constants';

export function usePlaces() {
    const [places, setPlaces] = useState([]);
    const [distances, setDistances] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [units, setUnits] = useState("mi");
    const [earthRadius, setEarthRadius] = useState(EARTH_RADIUS_UNITS[units])

    // Set localStorage
    let tripConfigurationOptions = window.localStorage;
    tripConfigurationOptions.setItem("currentUnit", units);
    for (const [unit, value] of Object.entries(EARTH_RADIUS_UNITS)) {
        tripConfigurationOptions.setItem(unit, value);
    }

    const context = { places, distances, setDistances, setPlaces, selectedIndex, setSelectedIndex, earthRadius, setUnits, setEarthRadius};

    const placeActions = {
        append: async (place) => append(place, context),
        appendMultiple: (placesToAdd) => appendMultiple(placesToAdd, context),
        removeAtIndex: (index) => removeAtIndex(index, context),
        removeAll: () => removeAll(context),
        replaceAll: (newPlaces) => replaceAll(newPlaces, context),
        selectIndex: (index) => selectIndex(index, context),
        changeUnits: (newUnits, newEarthRadius) => changeUnits(newUnits, newEarthRadius, context)
    };
    return {places, distances, units, selectedIndex, placeActions};
}

async function append(latLng, context) {
    const { places, setDistances, setPlaces, setSelectedIndex, earthRadius } = context;

    const newPlaces = [...places];

    const fullPlace = await reverseGeocode(latLng);
    newPlaces.push(fullPlace);

    setPlaces(newPlaces);
    setSelectedIndex(newPlaces.length - 1);

    updateDistances(newPlaces, setDistances, earthRadius);
}

function appendMultiple(placesToAdd, context) {
    const {places, setPlaces, setSelectedIndex, setDistances, earthRadius} = context;

    let newPlaces = [...places];
    newPlaces.push(...placesToAdd);

    setPlaces(newPlaces);
    setSelectedIndex(newPlaces.length - 1);

    updateDistances(newPlaces, setDistances, earthRadius);
}

async function updateDistances(places, setDistances, earthRadius) {
    const response = await sendDistancesRequest(places, earthRadius);
    if(response != null){
        setDistances(response.distances);
    }
}

export async function sendDistancesRequest(newPlaces, earthRadius){
    const distancesResponse = await sendAPIRequest({ requestType: "distances", places: newPlaces, earthRadius: earthRadius}, getOriginalServerUrl());
    return distancesResponse;
}


function removeAtIndex(index, context) {
    const { places, setPlaces, setDistances, selectedIndex, setSelectedIndex, earthRadius } = context;

    if (index < 0 || index >= places.length) {
        LOG.error(`Attempted to remove index ${index} in places list of size ${places.length}.`);
        return;
    }
    const newPlaces = places.filter((place, i) => index !== i);
    setPlaces(newPlaces);

    if (newPlaces.length === 0) {
        setSelectedIndex(-1);
    } else if (selectedIndex >= index && selectedIndex !== 0) {
        setSelectedIndex(selectedIndex - 1);
    }
    updateDistances(newPlaces, setDistances, earthRadius);
}

function removeAll(context) {
    const { setPlaces, setDistances, setSelectedIndex } = context;

    setPlaces([]);
    setSelectedIndex(-1);
    setDistances([]);
}

function replaceAll(newPlaces, context) {
    const { setPlaces, setDistances, setSelectedIndex, earthRadius } = context;

    setPlaces(newPlaces);
    setSelectedIndex(newPlaces.length - 1);

    updateDistances(newPlaces, setDistances, earthRadius);
}

function selectIndex(index, context) {
    const { places, setSelectedIndex } = context;

    if (index < -1 || index >= places.length) {
        LOG.error(`Attempted to select index ${index} in places list of size ${places.length}.`);
        setSelectedIndex(-1);
        return;
    }
    setSelectedIndex(index);
}

function changeUnits(newUnits, newEarthRadius, context) {
    const { setUnits, setEarthRadius, setDistances, places } = context;
    setUnits(newUnits);
    setEarthRadius(newEarthRadius);
    window.localStorage.setItem("currentUnit", newUnits);
    window.localStorage.setItem(newUnits, newEarthRadius);
    updateDistances(places, setDistances, newEarthRadius);
}
