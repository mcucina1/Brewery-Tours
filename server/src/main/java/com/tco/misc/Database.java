package com.tco.misc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.lang.Exception;

import com.tco.misc.Place;
import com.tco.misc.Places;

import static com.tco.misc.ServerConstants.TEST_MATCH;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.StringJoiner;

public final class Database {

    private Database() {}

    private final static String TABLE = "world INNER JOIN continent ON world.continent = continent.id"
                                        + " INNER JOIN country ON world.iso_country = country.id"
                                        + " INNER JOIN region ON world.iso_region = region.id";
    private final static String COLUMNS = "world.name,municipality,region.name,country.name,"
                                          + "continent.name,latitude,longitude,altitude";
    private final static ArrayList<String> FIELDS = new ArrayList<String>(Arrays.asList("type", "world.name", "world.continent", 
        "world.iso_country", "iso_region", "municipality", "gps_code", "iata_code", "world.local_code", "world.keywords", 
        "continent.name", "country.name", "country.keywords", "region.name", "region.keywords"));

    public static Integer found(String match) throws Exception {
        String sql = Select.found(match);
        try (
            // connect to the database and query
            Connection conn = DriverManager.getConnection(Credential.url(), Credential.USER, Credential.PASSWORD);
            Statement query = conn.createStatement();
            ResultSet results = query.executeQuery(sql)
        ) {
            return count(results);
        } catch (Exception e) {
            throw e;
        }
    }

    public static Places places(String match, Integer limit) throws Exception {
        String sql = Select.match(match, limit);
        try (
            // connect to the database and query
            Connection conn = DriverManager.getConnection(Credential.url(), Credential.USER, Credential.PASSWORD);
            Statement query = conn.createStatement();
            ResultSet results = query.executeQuery(sql)
        ) {
            return convertQueryResultsToPlaces(results, COLUMNS);
        } catch (Exception e) {
            throw e;
        }
    }

    private static Places convertQueryResultsToPlaces(ResultSet results, String columns) throws Exception {
        String[] cols = columns.split(",");
        Places places = new Places();
        while (results.next()) {
            Place place = new Place();
            for (String col: cols) {
                String key = simplifyName(col);
                String val = results.getString(col);
                place.put(key, val);
            }
            places.add(place);
        }
        return places;
    }

    private static String simplifyName(String col) {
        if (col.equals("world.name")) {
            col = "name";
        }
        if (col.indexOf(".") != -1) {
            col = col.substring(0, col.indexOf("."));
        }
        return col;
    }

    private static Integer count(ResultSet results) throws Exception {
        if (results.next()) {
            return results.getInt("count");
        }
        throw new Exception("No count results in found query.");
    }

    static class Select {
        static String match(String match, int limit) {
            return statement(match, " DISTINCT " + COLUMNS, " LIMIT " + limit);
        }
        static String found(String match) {
            return statement(match, " COUNT(*) AS count", "");
        }
        static String statement(String match, String data, String limit) {
            String fieldsLike = buildFieldsLikeString(FIELDS, match);
            return "SELECT"
                + data
                + " FROM " + TABLE
                + " WHERE " + fieldsLike
                + limit
                + " ;";
        }
        private static String buildFieldsLikeString(ArrayList<String> fields, String match) {
            StringJoiner joinedFields = new StringJoiner("OR ");
            fields.forEach(item -> joinedFields.add(item + " LIKE \"%" + match + "%\" "));
            return joinedFields.toString();
        }
    }

    static class Credential{
        final static String USER = "cs314-db";
        final static String PASSWORD = "eiK5liet1uej";
        static String URL = getURL();
        static String url(){
            return URL;
        }

        static String getURL(){
            String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
            if(useTunnel != null && useTunnel.equals("true")) {
                return "jdbc:mariadb://127.0.0.1:56247/cs314";
            }
            else {
                return "jdbc:mariadb://faure.cs.colostate.edu/cs314";
            }
        }
    }

    /* The following methods exist only for testing purposes and are not used during normal execution. */

    public static String getTable() {
        return TABLE;
    }
    public static String getColumns() {
        return COLUMNS;
    }
    public static String getFieldsLike() {
        return Select.buildFieldsLikeString(FIELDS, TEST_MATCH);
    }
}
