package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.tco.misc.Places;

import static com.tco.misc.ServerConstants.*;

public class TestTourRequest {

    private TourRequest tour;

    @BeforeEach
    public void createTourRequestForTestCases() {
        tour = new TourRequest(TEST_PLACES, EARTH_RADIUS_MILES, TEST_RESPONSE_TIME);
        tour.buildResponse();
    }

    /* To be moved to TestNearestNeighbor class
    @Test
    @DisplayName("joshls: confirm getDistanceMatrix returns a 2D array of longs")
    public void testGetDistanceMatrix() {
        long[][] testMatrix = tour.getDistanceMatrix();
    }

    @Test
    @DisplayName("dgaron: test buildDistanceMatrix works correctly")
    public void testBuildDistanceMatrix() {
        assertArrayEquals(TEST_DISTANCE_MATRIX, tour.getDistanceMatrix());
    } */

    @Test
    @DisplayName("joshls: Test getResponseTime()")
    public void testGetResponseTime() {
        Integer actualResponseTime;
        actualResponseTime = tour.getResponseTime();
        assertEquals(TEST_RESPONSE_TIME, actualResponseTime);
    }

    @Test
    @DisplayName("joshls: Test getPlaces()")
    public void testGetPlaces() {
        assertEquals(TEST_PLACES, tour.getPlaces());
    }
  
    @Test
    @DisplayName("bensaat: test getEarthRadius()")
    public void testGetEarthRadius() {
        assertEquals(EARTH_RADIUS_MILES, tour.getEarthRadius());
    }

    @Test
    @DisplayName("dgaron: test nearestNeighbor for bowtie")
    public void testNearestNeighborBowtie() {
        tour = new TourRequest(TEST_BOWTIE_INPUT, EARTH_RADIUS_MILES, TEST_RESPONSE_TIME);
        tour.buildResponse();
        assertEquals(TEST_BOWTIE_OUTPUT, tour.getPlaces());
    }

    @Test
    @DisplayName("dgaron: test nearestNeighbor for rectangle")
    public void testNearestNeighborRectangle() {
        tour = new TourRequest(TEST_RECTANGLE_INPUT, EARTH_RADIUS_MILES, TEST_RESPONSE_TIME);
        tour.buildResponse();
        assertEquals(TEST_RECTANGLE_OUTPUT, tour.getPlaces());
    }

    @Test
    @DisplayName("dgaron: test nearestNeighbor for star")
    public void testNearestNeighborStar() {
        tour = new TourRequest(TEST_STAR_INPUT, EARTH_RADIUS_MILES, TEST_RESPONSE_TIME);
        tour.buildResponse();
        assertEquals(TEST_STAR_OUTPUT, tour.getPlaces());
    }

    @Test
    @DisplayName("dgaron: test that TourRequest doesn't change places w/ response == 0")
    public void testResponseEquals0() {
        tour = new TourRequest(TEST_BOWTIE_INPUT, EARTH_RADIUS_MILES, 0);
        tour.buildResponse();
        assertEquals(TEST_BOWTIE_INPUT, tour.getPlaces());
    }

    /* This test was for a timer function that is no longer being used.
     * I left the test in place so the author would receive credit.
    @Test
    @DisplayName("joshls: test that TourRequest won't return if it takes too long.")
    public void testTiming() {
        boolean slowWorks, fastWorks;
        TourRequest slowTour, fastTour;
        slowTour = new TourRequest(TEST_LONG_INPUT, EARTH_RADIUS_MILES, TEST_RESPONSE_TIME);
        slowTour.buildResponse();
        slowWorks = TEST_LONG_INPUT.equals(slowTour.getPlaces());
        fastTour = new TourRequest(TEST_BOWTIE_INPUT, EARTH_RADIUS_MILES, TEST_RESPONSE_TIME);
        fastTour.buildResponse();
        fastWorks = TEST_BOWTIE_OUTPUT.equals(fastTour.getPlaces());
        assertTrue(slowWorks && fastWorks);
    }
    */

}
