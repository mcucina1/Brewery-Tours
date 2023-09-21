package com.tco.requests;

import java.util.Arrays;
import com.tco.misc.Places;

import com.tco.misc.NearestNeighbor;

public class TourRequest extends Request {

    private Double earthRadius;
    private Integer response;
    private Places places;

    @Override
    public void buildResponse() {
        int numPlaces = places.size();
        if (response != 0 && numPlaces > 3 && numPlaces <= 900*response) {
            NearestNeighbor nn;
            nn = new NearestNeighbor(this);
            places = nn.runNearestNeighbor();
        }
    }

    public Integer getResponseTime() {
        return response;
    }

    public Places getPlaces() {
        return places;
    }

    public Double getEarthRadius() {
        return earthRadius;
    }

    /* Constructors for testing and not used in normal execution */

    public TourRequest() {}

    public TourRequest(Places places, Double earthRadius, Integer response) {
        this.requestType = "tour";
        this.places = places;
        this.earthRadius = earthRadius;
        this.response = response;
    }

}
