package com.tco.requests;

import com.tco.requests.Distances;
import com.tco.misc.Places;
import com.tco.misc.Place;

import static com.tco.misc.GreatCircleDistance.calculate;

public class DistancesRequest extends Request {

    private Places places;
    private Double earthRadius;
    private Distances distances;

    @Override
    public void buildResponse() {
        distances = calculateDistances();
    }

    private Distances calculateDistances() {
        Distances distancesValues = new Distances();
        for (int i = 0; i < places.size(); ++i) {
            int endingPlaceIndex = i + 1;
            if (endingPlaceIndex == places.size()) {
                endingPlaceIndex = 0;
            }
            long currentLeg = calculateLeg(i, endingPlaceIndex);
            distancesValues.add(currentLeg);
        }
        return distancesValues;
    }

    private long calculateLeg(int startingPlaceIndex, int endingPlaceIndex) {            
        Place startingPlace = places.get(startingPlaceIndex);
        Place endingPlace = places.get(endingPlaceIndex);
        long legDistance = calculate(earthRadius, startingPlace, endingPlace);
        return legDistance;
    }

    /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */
    
    public DistancesRequest() {} 

    public DistancesRequest(Places places, Double earthRadius) {
        this.requestType = "distances";
        this.places = places;
        this.earthRadius = earthRadius;
    }

    public Places getPlaces() {
        return places;
    }

    public Double getEarthRadius() {
        return earthRadius;
    }

    public Distances getDistances() {
        return distances;
    }
}
