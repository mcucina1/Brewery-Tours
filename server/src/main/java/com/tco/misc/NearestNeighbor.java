package com.tco.misc;

import java.util.Arrays;

import com.tco.requests.TourRequest;
import static com.tco.misc.GreatCircleDistance.calculate;

public class NearestNeighbor {

    /* variables from TourRequest */
    private Places places;
    private int response;
    private double earthRadius;

    /* This section does nearest neighbor */
    private int numPlaces;
    private long[][] distanceMatrix;
    // Stores all tours to save time
    private int[][] allTours;
    // Stores current tour and its length
    private int[] currentTour;
    private long tourDistance;
    // Stores the shortest tour found and its length
    private int[] shortestTour;
    private long shortestTourDistance;
    // The location in the shortest tour of the original starting city
    private int shortestTourStartingCityOffset;
    private int currentTourStartingCityOffset;
    // Holds the array tracking whether a city has been visited in the current tour
    private boolean[] visited;

    public NearestNeighbor(TourRequest tour) {
        places = tour.getPlaces();
        numPlaces = places.size();
        earthRadius = tour.getEarthRadius();
        buildDistanceMatrix();
        response = tour.getResponseTime();
    }

    private void buildDistanceMatrix() {
        distanceMatrix = new long[numPlaces][numPlaces];
        for (int i = 0; i < numPlaces; ++i) {
            for (int j = i + 1; j < numPlaces; ++j) {
                long distance = calculate(earthRadius, places.get(i), places.get(j));
                distanceMatrix[i][j] = distance;
                distanceMatrix[j][i] = distance;
            }
        }
    }

    public Places runNearestNeighbor() {
        /* Main method */
        initializeTrackers();
        boolean shorterTourFound = false;
        for (int i = 0;i < numPlaces; ++i) {
            resetTrackers(i);
            // Build an optimized tour starting at each city
            buildOptimizedTour(i);
            allTours[i] = currentTour;
            if (tourDistance < shortestTourDistance) {
                shortestTour = allTours[i];
                shortestTourDistance = tourDistance;
                shorterTourFound = true;
                shortestTourStartingCityOffset = currentTourStartingCityOffset;
            }
        }
        if (shorterTourFound) {
            rearrangePlaces();
        }
        return places;
    }

    private void initializeTrackers() {
        allTours = new int[numPlaces][numPlaces];
        shortestTourDistance = calculateOriginalDistance();
        visited = new boolean[numPlaces];
        shortestTourStartingCityOffset = 0;
    }

    private void resetTrackers(int i) {
        currentTourStartingCityOffset = 0;
        tourDistance = 0;
        Arrays.fill(visited, false);
        currentTour = allTours[i];
    }

    private void buildOptimizedTour(int startingCity) {
        int currentCity = startingCity;
        int nextCity;
        currentTour[0] = currentCity;
        visited[currentCity] = true;
        for (int i = 1; i < numPlaces; ++i) {
            nextCity = findNearestCity(currentCity);
            tourDistance += distanceMatrix[currentCity][nextCity];
            currentCity = nextCity;
            visited[currentCity] = true;
            currentTour[i] = currentCity;
            if (currentCity == 0) {
                currentTourStartingCityOffset = i;
            }
        }
        tourDistance += distanceMatrix[currentCity][startingCity];
    }

    private int findNearestCity(int current) {
        int closestCity = 0;
        long shortest = Long.MAX_VALUE;
        for (int i = 0; i < numPlaces; ++i) {
            // If city is not the current city, unvisited, and is the nearest found so far
            if (i != current && !visited[i] && distanceMatrix[current][i] < shortest) {
                shortest = distanceMatrix[current][i];
                closestCity = i;
            }
        }
        return closestCity;
    }

    private void rearrangePlaces() {
        Places newPlaces = new Places(numPlaces);
        for (int i = 0; i < numPlaces; ++i) {
            int index = (i + shortestTourStartingCityOffset) % numPlaces;
            newPlaces.add(places.get(shortestTour[index]));
        }
        places = newPlaces;
    }

    private long calculateOriginalDistance() {
        long tripDistance;
        tripDistance = 0;
        for (int i = 0; i < places.size(); ++i) {
            int start = i;
            int end = (i+1) % places.size();
            tripDistance += distanceMatrix[start][end];
        }
        return tripDistance;
    }
}
