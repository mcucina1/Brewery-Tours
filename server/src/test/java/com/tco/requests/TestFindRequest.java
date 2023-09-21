package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import static com.tco.misc.ServerConstants.TEST_MATCH;
import static com.tco.misc.ServerConstants.TEST_TYPE;
import static com.tco.misc.ServerConstants.TEST_WHERE;
import static com.tco.misc.ServerConstants.TEST_LIMIT;

public class TestFindRequest {
    
    private FindRequest find;

    @BeforeEach
    public void createFindRequestForTestCases() {
        // TEST_MATCH == "dave"
        find = new FindRequest(TEST_MATCH, TEST_LIMIT);
        // TODO invoke buildResponse() once implemented
    }

    @Test
    @DisplayName("dgaron: Request type is \"find\"")
    public void testRequestType() {
        String type = find.getRequestType();
        assertEquals("find", type);
    }

    @Test
    @DisplayName("dgaron: confirm match string")
    public void testGetMatch() {
        String match = find.getMatch();
        assertEquals(TEST_MATCH, match);
    }

    @Test
    @DisplayName("dgaron: confirm response limit")
    public void testGetLimit() {
        Integer limit = find.getLimit();
        assertEquals(TEST_LIMIT, limit);
    }
}
