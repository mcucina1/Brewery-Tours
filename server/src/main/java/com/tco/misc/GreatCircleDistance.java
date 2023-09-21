package com.tco.misc;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import static java.lang.Math.*;
import org.everit.json.schema.SchemaException;
import org.everit.json.schema.Schema;
import org.everit.json.schema.loader.SchemaLoader;
import org.everit.json.schema.ValidationException;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import com.tco.misc.Place;

public final class GreatCircleDistance {

    private GreatCircleDistance() {}

    public static long calculate(double earthRadius, Place place1, Place place2){
        double lat1 = Math.toRadians(getLatitude(place1));
        double lat2 = Math.toRadians(getLatitude(place2));
        double long1 = Math.toRadians(getLongitude(place1));
        double long2 = Math.toRadians(getLongitude(place2));
        double lambdaLong = Math.abs(long1 - long2);
        double numerator = Math.sqrt(Math.pow((cos(lat2) * sin(lambdaLong)), 2) + Math.pow((cos(lat1) * sin(lat2)) - (sin(lat1) * cos(lat2) * cos(lambdaLong)), 2));
        double denominator = (sin(lat1) * sin (lat2)) + (cos(lat1) * cos(lat2) * cos(lambdaLong));
        double centralAngle = Math.atan2(numerator, denominator);
        long distance = Math.round(earthRadius * centralAngle);
        return distance;
    }

    private static double cos(double input){
        return Math.cos(input);
    }

    private static double sin(double input){
        return Math.sin(input);
    }

    private static double getLatitude(Place place){
        return Double.parseDouble(place.get("latitude"));
    }

    private static double getLongitude(Place place){
        return Double.parseDouble(place.get("longitude"));
    }

}
