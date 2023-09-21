package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.tco.requests.Distances;
import com.tco.misc.Places;
import com.tco.misc.Place;

import static com.tco.misc.ServerConstants.EARTH_RADIUS_MILES;
import static com.tco.misc.ServerConstants.TEST_PLACES;

public class TestDistancesRequest {

    private DistancesRequest dist;

    @BeforeEach
    public void createDistancesRequestForTestCases() {
        dist = new DistancesRequest(TEST_PLACES, EARTH_RADIUS_MILES);
        dist.buildResponse();
    }

    @Test
    @DisplayName("dgaron: Request type is \"distances\"")
    public void testType() {
        String type = dist.getRequestType();
        assertEquals("distances", type);
    }

    @Test
    @DisplayName("dgaron: default earthRadius == 3959")
    public void testEarthRadius() {
        assertEquals(EARTH_RADIUS_MILES, dist.getEarthRadius());
    }

    @Test
    @DisplayName("dgaron: empty places returns empty distances")
    public void testEmptyPlaces() {
        DistancesRequest distEmptyPlaces = new DistancesRequest(new Places(), EARTH_RADIUS_MILES);
        distEmptyPlaces.buildResponse();
        Distances emptyDistances = distEmptyPlaces.getDistances();
        assertTrue(emptyDistances != null && emptyDistances.size() == 0);
    }

    @Test
    @DisplayName("dgaron: number of placess equals number of distances")
    public void testDistancesLength() {
        assertEquals(dist.getPlaces().size(), dist.getDistances().size());
    }

}
