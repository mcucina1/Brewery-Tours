import { expect } from '@jest/globals';
import { MOCK_TOUR_RESPONSE, MOCK_TOUR_REQUEST } from '../sharedMocks';
import { sendTourRequest } from '../../src/hooks/useTour';

it('joshls: Tests sendTourRequest()', async () => {
    fetch.mockResponse(MOCK_TOUR_RESPONSE);
    let places, earthRadius, respTime, response, request;
    request = JSON.parse(MOCK_TOUR_REQUEST);
    earthRadius = request["earthRadius"]
    places = request["places"];
    respTime = request["response"];
    response = await sendTourRequest(places, respTime, earthRadius);
    expect(JSON.stringify(response)).toBe(MOCK_TOUR_RESPONSE);
});
