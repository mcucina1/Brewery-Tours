import React from 'react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import user from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import AddPlace from '../../../src/components/Trip/Itinerary/AddPlace';

describe('AddPlace', () => {
	const placeObj = {
		latLng: '40.57, -105.085',
		name: 'Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States',
	};

	const props = {
		toggleAddPlace: jest.fn(),
		append: jest.fn(),
		isOpen: true,
	};

	beforeEach(() => {
		render(
			<AddPlace
				append={props.append}
				isOpen={props.isOpen}
				toggleAddPlace={props.toggleAddPlace}
			/>
		);
	});

	it('base: validates input', async () => {
		const coordInput = screen.getByTestId('coord-input');
		user.type(coordInput, placeObj.latLng);

		await waitFor(() => {
			expect(coordInput.value).toEqual(placeObj.latLng);
		});
	});

	it('base: handles invalid input', async () => {
		const coordInput = screen.getByTestId('coord-input');
		user.paste(coordInput, '1');

		await waitFor(() => {
			expect(coordInput.value).toEqual('1');
		});

		const addButton = screen.getByTestId('add-place-button');
		expect(addButton.classList.contains('disabled')).toBe(true);
	});
});
