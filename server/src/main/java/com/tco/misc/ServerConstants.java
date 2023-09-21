package com.tco.misc;

import java.util.ArrayList;
import java.util.Arrays;

import com.tco.requests.Distances;
import com.tco.misc.Places;
import com.tco.misc.Place;

public final class ServerConstants {

    private ServerConstants () {}

    /* DistancesRequest Test Constants */ 

    public static final double EARTH_RADIUS_MILES = 3959;

    /* These values are used in test cases only */

    public static final Places TEST_PLACES = buildTestPlaces();
    
    private static Places buildTestPlaces() {
        Places places = new Places();
        // Fort Collins
        Place place1 = new Place();
        place1.put("latitude", "40.59");
        place1.put("longitude", "-105.08");
        // Denver
        Place place2 = new Place();
        place2.put("latitude", "39.74");
        place2.put("longitude", "-104.99");
        // Sydney, Australia
        Place place3 = new Place();
        place3.put("latitude", "-33.87");
        place3.put("longitude", "151.21");
        places.add(place1);
        places.add(place2);
        places.add(place3);
        return places;
    }

    public static final long DIST_MILES_DEFAULT_PLACES0_PLACES1 = 59;
    public static final long DIST_MILES_DEFAULT_PLACES1_PLACES2 = 8331;
    public static final long DIST_MILES_DEFAULT_PLACES2_PLACES0 = 8347;

    /* FindRequest Test Constants */

    public static final Integer TEST_LIMIT = 100;

    /* These values are for used in test cases only */

    public static final String TEST_MATCH = "dave";
    public static final ArrayList<String> TEST_TYPE = new ArrayList<String>(Arrays.asList("airport"));
    public static final ArrayList<String> TEST_WHERE = new ArrayList<String>(Arrays.asList("United States"));

    /* TourRequest Test Constants */

    public static final Integer TEST_RESPONSE_TIME = 1;
    public static final long[][] TEST_DISTANCE_MATRIX = {{0, 59, 8347}, {59, 0, 8331}, {8347, 8331, 0}};

    /* Test Cases for Optimization Algorithms */

    // The list of places used for the test cases is generated in getTestPlacesList()
    private static final Places testCasePlaces = getTestPlacesList();

    // Test cases constructed by passing an array containing the order of the places
    // buildTestCase(new int[] {1, 2, 3});

    /* Bowtie: 
     *   - original order:  0, 5, 1, 4
     *   - expected result: 0, 1, 5, 4
     */
    public static final Places TEST_BOWTIE_INPUT = buildTestCase(new int[] {0, 5, 1, 4});
    public static final Places TEST_BOWTIE_OUTPUT = buildTestCase(new int[] {0, 1, 5, 4});
    /* Rectangle:
     *   - original order:  0, 4, 5, 1
     *   - expected result: 0, 4, 5, 1
     */
    public static final Places TEST_RECTANGLE_INPUT = buildTestCase(new int[] {0, 4, 5, 1});
    public static final Places TEST_RECTANGLE_OUTPUT = buildTestCase(new int[] {0, 4, 5, 1});
    /* Rectangle:
     *   - original order:  0, 5, 2, 3, 4
     *   - expected result: 0, 2, 4, 5, 3
     */ 
    public static final Places TEST_STAR_INPUT = buildTestCase(new int[] {0, 5, 2, 3, 4});
    public static final Places TEST_STAR_OUTPUT = buildTestCase(new int[] {0, 2, 4, 5, 3});

    public static final Places TEST_LONG_INPUT = buildLongPlaces(1000);

    private static Places getTestPlacesList() {
        Places places = new Places();

        // Top left
        Place place0 = new Place();
        place0.put("latitude", "30");
        place0.put("longitude", "-30");
        // Top right
        Place place1 = new Place();
        place1.put("latitude", "30");
        place1.put("longitude", "30");
        // Left side
        Place place2 = new Place();
        place2.put("latitude", "0");
        place2.put("longitude", "-45");
        // Right side
        Place place3 = new Place();
        place3.put("latitude", "0");
        place3.put("longitude", "45");
        // Bottom left
        Place place4 = new Place();
        place4.put("latitude", "-30");
        place4.put("longitude", "-30");
        // Bottom right
        Place place5 = new Place();
        place5.put("latitude", "-30");
        place5.put("longitude", "30");

        // Add to places
        places.add(place0);
        places.add(place1);
        places.add(place2);
        places.add(place3);
        places.add(place4);
        places.add(place5);

        return places;
    }

    private static Places buildTestCase(int[] places) {
        Places newPlaces = new Places();
        for (int i = 0; i < places.length; ++i) {
            newPlaces.add(testCasePlaces.get(places[i]));
        }
        return newPlaces;
    }
    
    private static Places buildLongPlaces(int numPlaces) {
        // Build Places numPlaces long
        Places places = new Places(numPlaces);
        Place place = new Place();
        place.put("latitude", "0");
        place.put("longitude", "0");
        int i;
        for (i=0; i<numPlaces; i++) {
            places.add(place);
        }
        return places;
    }
}