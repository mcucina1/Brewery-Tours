package com.tco.misc;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.MockedStatic;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static com.tco.misc.GreatCircleDistance.calculate;

import static com.tco.misc.ServerConstants.EARTH_RADIUS_MILES;
import static com.tco.misc.ServerConstants.TEST_PLACES;
import static com.tco.misc.ServerConstants.DIST_MILES_DEFAULT_PLACES0_PLACES1;
import static com.tco.misc.ServerConstants.DIST_MILES_DEFAULT_PLACES2_PLACES0;

public final class TestGreatCircleDistance {

    
    @Test
    @DisplayName("mcucina: Fort Collins to Denver == 59")
    public void testCalculate() {
        assertEquals(calculate(EARTH_RADIUS_MILES, TEST_PLACES.get(0), TEST_PLACES.get(1)), DIST_MILES_DEFAULT_PLACES0_PLACES1);
    }

    @Test
    @DisplayName("mcucina: Return distance == 8347")
    public void testReturnTripDistance() {
        assertEquals(calculate(EARTH_RADIUS_MILES, TEST_PLACES.get(0), TEST_PLACES.get(2)), DIST_MILES_DEFAULT_PLACES2_PLACES0);
    }

}