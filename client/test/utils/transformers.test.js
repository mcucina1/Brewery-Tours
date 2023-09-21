import { describe, expect, it } from "@jest/globals";
import { latLngToText, placeToLatLng, latLngToPlace, hemisphere } from '../../src/utils/transformers';

describe('transformers', () => {
    const latLng = { lat: 40.12345312, lng: 50.12532245 };
    const place = { latitude: '40.12345312', longitude: '50.12532245' };
    const zeroPlace = { latitude: '0', longitude: '0' };
    const zeroLatLng = {lat: 0, lng:0};

    it('base: latLngToText converts correctly with default', () => {
        const text = latLngToText(latLng);
        const expectedText = '40.12°N, 50.13°E';
        expect(text).toEqual(expectedText);
    });

    it('base: latLngToText converts correctly with different size precisions', () => {
        let text = latLngToText(latLng, 1);
        let expectedText = '40.1°N, 50.1°E';
        expect(text).toEqual(expectedText);

        text = latLngToText(latLng, 10);
        expectedText = '40.1234531200°N, 50.1253224500°E';
        expect(text).toEqual(expectedText);

        text = latLngToText(latLng, 8);
        expectedText = '40.12345312°N, 50.12532245°E';
        expect(text).toEqual(expectedText);
    });

    it('base: latLngToText handles null/undefined', () => {
        let text = latLngToText(null);
        let expectedText = '';
        expect(text).toEqual(expectedText);

        text = latLngToText(undefined);
        expectedText = '';
        expect(text).toEqual(expectedText);
    });

    it('base: placeToLatLng converts correctly', () => {
        const convertedLatLng = placeToLatLng(place);
        expect(convertedLatLng).toEqual(latLng);

        const shouldBeNull = placeToLatLng(null);
        expect(shouldBeNull).toBeNull();

        const shouldBeUndefined = placeToLatLng(undefined);
        expect(shouldBeUndefined).toBeUndefined();
    });

    it('base: placeToLatLng handles (0,0)', () => {
        const convertedLatLng = placeToLatLng(zeroPlace);
        expect(convertedLatLng).toEqual(zeroLatLng);
    });

    it('base: latLngToPlace converts correctly', () => {
        const convertedPlace = latLngToPlace(latLng);
        expect(convertedPlace).toEqual(place);

        const shouldBeNull = latLngToPlace(null);
        expect(shouldBeNull).toBeNull();

        const shouldBeUndefined = latLngToPlace(undefined);
        expect(shouldBeUndefined).toBeUndefined();
    });

    it('base: latLngToPlace handles (0,0)', () => {
        const convertedPlace = latLngToPlace(zeroLatLng);
        expect(convertedPlace).toEqual(zeroPlace);
    });

    it('bensaat: testing hemisphere function', () => {
        //const convertedLatLng = placeToLatLng(place);
        expect(hemisphere(latLng.lat, 'N', 'S')).toEqual('N');
        expect(hemisphere(latLng.lng, 'E', 'W')).toEqual('E');
    });
});