import React from 'react';
import '@testing-library/jest-dom';
import {act, renderHook} from '@testing-library/react-hooks';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { MOCK_DISTANCES, MOCK_PLACES, REVERSE_GEOCODE_RESPONSE, MOCK_DISTANCES_RESPONSE, 
         DOUBLE_MOCK_DISTANCES_RESPONSE, REVGEO_DISTANCES_RESPONSE } from '../sharedMocks';
import { LOG } from '../../src/utils/constants';
import { usePlaces } from '../../src/hooks/usePlaces';

describe('usePlaces', () => {
    const mockLatLng = { lat: 40.570, lng: -105.085 };
    const mockPlaceResponse = {
        country: "United States",
        defaultDisplayName: "Colorado State University",
        latitude: '40.57',
        longitude: '-105.085',
        name: 'Colorado State University',
        municipality: 'Fort Collins',
        postcode: "80525-1725",
        region: "Colorado",
        streetAddress: "South College Avenue",
    };
    const mockLatLng2 = { lat: 39.739, lng: -104.990 };
    const mockDistances = [58, 58];

    const mockLatLngDistancesResponse = JSON.stringify({
        "places": [{latitude: '40.57', longitude: '-105.085'}],
        "earthRadius": 3959.0,
        "distances": [0],
        "requestType": "distances"
    });
    const mockEmptyDistancesResponse = JSON.stringify({
        "places": [],
        "earthRadius": 3959.0,
        "distances": [],
        "requestType": "distances"
    });
    
    let hook;

    beforeEach(() => {
        jest.clearAllMocks();
        fetch.resetMocks();
        const { result } = renderHook(() => usePlaces());
        hook = result;
    });

    // dgaron: modified mock responses to resolve errors
    it('base: appends a place', async () => {
        fetch
            .once(REVERSE_GEOCODE_RESPONSE)
            .once(REVGEO_DISTANCES_RESPONSE);
        expect(hook.current.places).toEqual([]);

        await act(async () => {
            hook.current.placeActions.append(mockLatLng);
        });

        expect(hook.current.places).toEqual([mockPlaceResponse]);
    });

    // dgaron: modified mock responses to resolve errors
    it('base: selects a place at an index', async () => {
        fetch
            .once(REVERSE_GEOCODE_RESPONSE)
            .once(REVGEO_DISTANCES_RESPONSE)
            .once(REVERSE_GEOCODE_RESPONSE)
            .once(REVGEO_DISTANCES_RESPONSE);

        await act(async () => {
            hook.current.placeActions.append(mockLatLng);
        });
        expect(hook.current.selectedIndex).toEqual(0);

        await act(async () => {
            hook.current.placeActions.append(mockLatLng);
        });
        expect(hook.current.selectedIndex).toEqual(1);
        expect(hook.current.places.length).toEqual(2);

        act(() => {
            hook.current.placeActions.selectIndex(0);
        });
        expect(hook.current.selectedIndex).toEqual(0);
    });

    it('base: sets index to -1 if selecting invalid index', () => {
        jest.spyOn(LOG, 'error').mockImplementation(() => {});

        act(() => {
            hook.current.placeActions.selectIndex(99);
        });
        expect(hook.current.selectedIndex).toEqual(-1);
        expect(LOG.error.mock.calls.length).toEqual(1);
    });

    it('base: removes a place at an index', async () => {
        fetch.mockResponse(REVERSE_GEOCODE_RESPONSE);

        await act(async () => {
            hook.current.placeActions.append(mockLatLng);
        });
        expect(hook.current.places.length).toEqual(1);

        act(() => {
            hook.current.placeActions.removeAtIndex(0);
        });
        expect(hook.current.places).toEqual([]);
        expect(hook.current.selectedIndex).toEqual(-1);
    });

    it('base: sets preceding place as selected when removing an index', async () => {
        fetch.mockResponse(REVERSE_GEOCODE_RESPONSE);

        for (let i = 0; i < 5; i++) {
            await act(async () => {
                hook.current.placeActions.append(mockLatLng);
            });
        }

        act(() => {
            hook.current.placeActions.removeAtIndex(4);
        });
        expect(hook.current.places.length).toEqual(4);
        expect(hook.current.selectedIndex).toEqual(3);
    });

    it('base: keeps selected index at 0 if index 0 is selected and removed', async () => {
        fetch.mockResponse(REVERSE_GEOCODE_RESPONSE);

        for (let i = 0; i < 3; i++) {
            await act(async () => {
                hook.current.placeActions.append(mockLatLng);
            });
        }

        act(() => {
            hook.current.placeActions.selectIndex(0);
        });
        act(() => {
            hook.current.placeActions.removeAtIndex(0);
        });
        expect(hook.current.places.length).toEqual(2);
        expect(hook.current.selectedIndex).toEqual(0);
    });

    it('base: denies removing a place at an invalid index', () => {
        jest.spyOn(LOG, 'error').mockImplementation(() => {});

        act(() => {
            hook.current.placeActions.removeAtIndex(42);
        });
        expect(LOG.error.mock.calls.length).toEqual(1);
    });

    it('base: removes all places', async () => {
        fetch.mockResponse(REVERSE_GEOCODE_RESPONSE);

        for (let i = 0; i < 5; i++) {
            await act(async () => {
                hook.current.placeActions.append(mockLatLng);
            });
        }
        expect(hook.current.places.length).toEqual(5);

        act(() => {
            hook.current.placeActions.removeAll();
        });
        expect(hook.current.places).toEqual([]);
    });

    it('dgaron: replaces places with newPlaces', async () => {
        fetch.mockResponse(REVERSE_GEOCODE_RESPONSE);
        expect(hook.current.places).toEqual([]);

        await act( async () => {
            hook.current.placeActions.replaceAll(MOCK_PLACES);
        });
        expect(hook.current.places).toEqual(MOCK_PLACES);
    });

    it('bensaat: appends a place, and tests for 0 distance', async () => {
        fetch
            .once(REVERSE_GEOCODE_RESPONSE)
            .once(mockLatLngDistancesResponse);
        expect(hook.current.places).toEqual([]);
        expect(hook.current.distances).toEqual([]);

        await act(async () => {
            hook.current.placeActions.append(mockLatLng);
        });
        expect(hook.current.distances).toEqual([0]);
    });

    it('dgaron: removeAll clears distances', async () => {
        fetch.mockResponse(MOCK_DISTANCES_RESPONSE);
        expect(hook.current.distances).toEqual([]);

        await act(async() => {
            hook.current.placeActions.replaceAll(MOCK_PLACES);
        });
        expect(hook.current.places).toEqual(MOCK_PLACES);
        expect(hook.current.distances).toEqual(MOCK_DISTANCES);

        act( () => {
            hook.current.placeActions.removeAll();
        });
        expect(hook.current.distances).toEqual([]);
    });

    it('dgaron: updateDistances() sets distances correctly', async () => {
        fetch.mockResponse(MOCK_DISTANCES_RESPONSE);
        expect(hook.current.places).toEqual([]);
        expect(hook.current.distances).toEqual([]);

        await act(async () => {
            hook.current.placeActions.replaceAll(MOCK_PLACES);
        });
        expect(hook.current.distances).toEqual(MOCK_DISTANCES);
    });

    it('dgaron: removeAtIndex updates distances correctly', async () => {
        fetch
            .once(REVERSE_GEOCODE_RESPONSE)
            .once(mockLatLngDistancesResponse)
            .once(mockEmptyDistancesResponse);

        await act(async () => {
            hook.current.placeActions.append(mockLatLng);
        });
        expect(hook.current.distances).toEqual([0]);

        await act(async () => {
            hook.current.placeActions.removeAtIndex(0);
        });
        expect(hook.current.distances).toEqual([]);
    });

    it('dgaron: appendMultiple correctly appends the new places', async () => {
        fetch
            .once(MOCK_DISTANCES_RESPONSE)
            .once(DOUBLE_MOCK_DISTANCES_RESPONSE);
        
        expect(hook.current.places).toEqual([]);

        let expectedPlaces = MOCK_PLACES.concat(MOCK_PLACES)

        await act( async () => {
            hook.current.placeActions.replaceAll(MOCK_PLACES);
        });
        expect(hook.current.places).toEqual(MOCK_PLACES);
        await act( async () => { 
            hook.current.placeActions.appendMultiple(MOCK_PLACES);
        });
        expect(hook.current.places).toEqual(expectedPlaces);
    });

    it('dgaron: appendMultiple correctly updates distances', async () => {
        fetch
            .once(MOCK_DISTANCES_RESPONSE)
            .once(DOUBLE_MOCK_DISTANCES_RESPONSE);

        let expectedDistances = MOCK_DISTANCES.concat(MOCK_DISTANCES);

        await act( async () => {
            hook.current.placeActions.replaceAll(MOCK_PLACES);
            hook.current.placeActions.appendMultiple(MOCK_PLACES);
        });
        expect(hook.current.distances).toEqual(expectedDistances);
    });
});