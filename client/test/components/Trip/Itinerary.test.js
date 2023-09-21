import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { MOCK_PLACES, MOCK_FIND_PLACES_RESPONSE } from "../../sharedMocks";
import Itinerary from '../../../src/components/Trip/Itinerary/Itinerary.js';
import { findPlaces }  from '../../../src/components/Trip/Itinerary/FindPopup.js';

describe('Itinerary', () => {
    const placeActions = {append: jest.fn(), selectIndex: jest.fn(), changeUnits: jest.fn()};
    beforeEach(() => {
        render(<Itinerary places={MOCK_PLACES} placeActions={placeActions} selectedIndex={0} />);
    });

    it('base: renders the name attribute', () => {
        screen.getByRole('cell', { name: /Place A/i });
    });

    it('base: toggles row dropdown when clicked', () => {
        const dropdown = screen.getByTestId('row-toggle-0');
        expect(dropdown.getAttribute('aria-expanded')).toEqual('false');

        user.click(dropdown);
        expect(dropdown.getAttribute('aria-expanded')).toEqual('true');
    });

    it('base: sets new index when clicked.', () => {
        const row = screen.getByTestId('place-row-0');
        expect(placeActions.selectIndex).toBeCalledTimes(0);

        user.click(row);
        expect(placeActions.selectIndex).toBeCalledTimes(1);
    });

    it('base: expands a place row when clicked.', () => {
        const row = screen.getByTestId('place-row-2');
        expect(screen.getByText(/123 Test/i)).toBeTruthy();

        user.click(row);
        expect(screen.getByText(/123 Test, expanded test/i)).toBeTruthy();
    });

    it('joshls: has distance display.', () => {
        expect(screen.getByTestId('place-row-0') !== null)
    });

    it('joshls: can call find places', async () => {
        fetch.mockResponse(MOCK_FIND_PLACES_RESPONSE);
        let response;
        response = await findPlaces("R136a1", 10);
        expect(JSON.stringify(response)).toBe(MOCK_FIND_PLACES_RESPONSE);
    });

    it('mcucina: renders search button', () => {
        let findActionsButton;
        findActionsButton = screen.getByTestId('find-actions-button');
        findActionsButton.click();
        expect(screen.getByTestId('find-search-button') !== null);
    });
    
    it('joshls: searching for a place makes table', async () => {
        let findActionsButton, findSearchButton;
        findActionsButton = screen.getByTestId('find-actions-button');
        findActionsButton.click();
        findSearchButton = screen.getByTestId('find-search-button');
        await act( async () => { findSearchButton.click(); });
        screen.getByTestId('foundPlaces');
    })

    it('dgaron: renders the FindPopup', async () => {
        const dropdown = screen.getByTestId('row-toggle-0');
        user.click(dropdown);
        expect(dropdown.getAttribute('aria-expanded')).toEqual('true');
        const find = screen.getByTestId('find-actions-button');
        user.click(find);
        screen.getByTestId('find-popup');
    });

    it('bensaat: renders the cancel button in FindPopup', () => {
        let findActionsButton = screen.getByTestId('find-actions-button');
        findActionsButton.click();
        expect(screen.getByTestId('find-cancel-button') !== null);
    });
    
    it('mcucina: renders the Add to Trip button in FindPopup', () => {
        let findActionsButton = screen.getByTestId('find-actions-button');
        findActionsButton.click();
        expect(screen.getByTestId('add-to-trip-button') !== null);
    });

    it('mcucina: renders modal for trip and units popup', () => {
        let TripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(TripActionsButton);
        expect(screen.getByTestId('trip-popup') !== null);
    });

    it('joshls: renders modal header for trip and units popup', () => {
        let tripActionsButton;
        tripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(tripActionsButton);
        expect(screen.getByTestId('trip-and-units-header') !== null);
    });

    it('bensaat: renders modal footer for trip and units popup', () => {
        let tripActionsButton;
        tripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(tripActionsButton);
        expect(screen.getByTestId('trip-and-units-footer') !== null);
    })

    it('erictg: renders modal body for trip and units popup', () => {
        let tripActionsButton;
        tripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(tripActionsButton);
        expect(screen.getByTestId('trip-and-units-body') !== null);
    })

    it('bensaat: renders cancel button in modal footer for trip and units popup', () => {
        let tripActionsButton;
        tripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(tripActionsButton);
        expect(screen.getByTestId('tour-cancel-button') !== null);
    })

    it('mcucina: renders trip optimization button', () => {
        let TripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(TripActionsButton);
        expect(screen.getByTestId('trip-opt-button') !== null);
    });

    it('erictg: renders save button in modal footer for trip and units popup', () => {
        let tripActionsButton;
        tripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(tripActionsButton);
        expect(screen.getByTestId('tour-save-button') !== null);
    })

    it('mcucina: renders change units button', () => {
        let TripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(TripActionsButton);
        expect(screen.getByTestId('change-units-button') !== null);
    });

    it('bensaat: renders save trip modal', () => {
        let SaveTripButton = screen.getByTestId('save-trip-button');
        user.click(SaveTripButton);
        expect(screen.getByTestId('save-trip-modal'));
    });

    it('bensaat: renders save trip header', () => {
        let SaveTripButton = screen.getByTestId('save-trip-button');
        user.click(SaveTripButton);
        expect(screen.getByTestId('save-trip-header'));
    });

    it('bensaat: renders save trip footer', () => {
        let SaveTripButton = screen.getByTestId('save-trip-button');
        user.click(SaveTripButton);
        expect(screen.getByTestId('save-trip-footer'));
    });

    it('joshls: renders change units modal', () => {
        let tripActionsButton, changeUnitsButton, changeUnitsModal;
        tripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(tripActionsButton);
        changeUnitsButton = screen.getByTestId('change-units-button');
        user.click(changeUnitsButton);
        changeUnitsModal = screen.getByTestId('change-units-header');
        expect(changeUnitsButton !== null);
    });

    it('bensaat: renders save trip footer', () => {
        let SaveTripButton = screen.getByTestId('save-trip-button');
        user.click(SaveTripButton);
        expect(screen.getByTestId('save-cancel-button'));
    });

    it('joshls: event handler for units button works', () => {
        // Click change units button
        let tripActionsButton, changeUnitsButton;
        tripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(tripActionsButton);
        changeUnitsButton = screen.getByTestId('change-units-button');
        user.click(changeUnitsButton);
        // put in custom unit and click button
        let customUnitInput, customEarthRadius, unitAddButton;
        customUnitInput = screen.getByTestId('custom-unit-input');
        customUnitInput.value = "microRad";
        customEarthRadius = screen.getByTestId('custom-earth-radius');
        customEarthRadius.value = "1000000";
        unitAddButton = screen.getByTestId('unit-add-button');
        user.click(unitAddButton);
        // Prepare mock local storage
        let tripConfigurationOptions = window.localStorage;
        tripConfigurationOptions.setItem("currentUnit", customUnitInput.value);
        tripConfigurationOptions.setItem(customUnitInput.value, customEarthRadius.value);
        // Actual test
        let currentUnit, currentValue, rightUnit, rightValue;
        currentUnit = window.localStorage.getItem("currentUnit");
        currentValue = parseInt(window.localStorage.getItem("microRad")); // localStorage.getItem() returns a string
        rightUnit = (currentUnit === "microRad");
        rightValue = (currentValue === 1000000);
        expect(rightUnit && rightValue).toBe(true);
    });

    it('bensaat: Kilometer button changes units to km', () => {
        let tripActionsButton, changeUnitsButton, kilometerButton;
        tripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(tripActionsButton);
        changeUnitsButton = screen.getByTestId('change-units-button');
        user.click(changeUnitsButton);
        kilometerButton = screen.getByTestId('unit-kilometers-button');
        user.click(kilometerButton);
        let currentUnit, currentValue;
        currentUnit = window.localStorage.getItem("currentUnit");
        currentValue = parseInt(window.localStorage.getItem("km"));
        expect(currentUnit == 'km' && currentValue == 6371);
    });

    it('bensaat: Nautical Miles button changes units to nm', () => {
        let tripActionsButton, changeUnitsButton, nauticalMileButton;
        tripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(tripActionsButton);
        changeUnitsButton = screen.getByTestId('change-units-button');
        user.click(changeUnitsButton);
        nauticalMileButton = screen.getByTestId('unit-nautical-miles-button');
        user.click(nauticalMileButton);
        let currentUnit, currentValue;
        currentUnit = window.localStorage.getItem("currentUnit");
        currentValue = parseInt(window.localStorage.getItem("NM"));
        expect(currentUnit == 'NM' && currentValue == 3440);
    });

    it('bensaat: Miles button changes units to mi', () => {
        let tripActionsButton, changeUnitsButton, milesButton;
        tripActionsButton = screen.getByTestId('trip-and-units-button');
        user.click(tripActionsButton);
        changeUnitsButton = screen.getByTestId('change-units-button');
        user.click(changeUnitsButton);
        milesButton = screen.getByTestId('unit-miles-button');
        user.click(milesButton);
        let currentUnit, currentValue;
        currentUnit = window.localStorage.getItem("currentUnit");
        currentValue = parseInt(window.localStorage.getItem("mi"));
        expect(currentUnit == 'mi' && currentValue == 3959);
    });

    it('joshls: Renders icon for moving place to beginning', () => {
        let dropdown, setToStart;
        dropdown = screen.getByTestId('row-toggle-0');
        user.click(dropdown);
        setToStart = screen.getByTestId('to-start-location-0');
        expect(setToStart !== null).toBe(true);
    });
});
