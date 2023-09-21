package com.tco.misc;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

import com.tco.misc.Database;

import static com.tco.misc.ServerConstants.TEST_LIMIT;
import static com.tco.misc.ServerConstants.TEST_MATCH;
import static com.tco.misc.ServerConstants.TEST_TYPE;
import static com.tco.misc.ServerConstants.TEST_WHERE;

public class TestDatabase {

    @Test
    @DisplayName("joshls: Testing if Database class exists.")
    public void test() {
        boolean databaseExists;
        Class database;
        try {
            database = Class.forName("com.tco.misc.Database");
            databaseExists = true;
        } catch (ClassNotFoundException e) {
            databaseExists = false;
        }
        assertTrue(databaseExists);
    }

    @Test
    @DisplayName("dgaron: verify functionality of Database.Select.statement")
    public void testSelectStatement() {
        String expected = "SELECT * FROM " + Database.getTable() + " WHERE " + Database.getFieldsLike() + " LIMIT 100 ;";
        String result = Database.Select.statement(TEST_MATCH, " *", " LIMIT " + TEST_LIMIT);
        assertEquals(expected, result);
    }

    @Test
    @DisplayName("dgaron: verify functionality of Database.Select.found")
    public void testSelectFound() {
        String expected = "SELECT COUNT(*) AS count FROM " + Database.getTable() 
                          + " WHERE " + Database.getFieldsLike() + " ;";
        String result = Database.Select.found(TEST_MATCH);
        assertEquals(expected, result);
    }

    @Test
    @DisplayName("dgaron: verify functionality of Database.Select.match")
    public void testSelectMatch() {
        String expected = "SELECT DISTINCT " + Database.getColumns() 
                          + " FROM " + Database.getTable() + " WHERE " + Database.getFieldsLike() + " LIMIT 100 ;";
        String result = Database.Select.match(TEST_MATCH, TEST_LIMIT);
        assertEquals(expected, result);
    }

    @Test
    @DisplayName("bensaat: verify URL credential Database.Credential.url()")
    public void testCredentialURL() {
        String resultURL = Database.Credential.url();
        String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
        if(useTunnel != null && useTunnel.equals("true")) {
            String expectedURL = "jdbc:mariadb://127.0.0.1:56247/cs314";
            assertEquals(expectedURL, resultURL);
        }
        else{
            String expectedURL = "jdbc:mariadb://faure.cs.colostate.edu/cs314";
            assertEquals(expectedURL, resultURL);
        } 
    }

    @Test
    @DisplayName("bensaat: verify correct user credential")
    public void testCredentialUSER() {
        String expectedUser = "cs314-db";
        String resultUser = Database.Credential.USER;
        assertEquals(expectedUser, resultUser);
    }

    @Test
    @DisplayName("bensaat: Verify correct password credential")
    public void testCredentialPASSWORD() {
        String expectedPassword = "eiK5liet1uej";
        String resultPassword = Database.Credential.PASSWORD;
        assertEquals(expectedPassword, resultPassword);
    }

    @Test
    @DisplayName("dgaron: verify functionality of Database.found")
    public void testDatabaseFound() throws Exception {
        // TEST_MATCH: "dave" produces 28 results in our query structure
        Integer expected = 28;
        Integer result = Database.found(TEST_MATCH);
        assertEquals(expected, result);
    }
}
