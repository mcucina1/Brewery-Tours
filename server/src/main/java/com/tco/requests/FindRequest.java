package com.tco.requests;

import java.util.ArrayList;
import com.tco.misc.BadRequestException;
import com.tco.misc.Places;
import com.tco.misc.Database;

public class FindRequest extends Request {
    
    private String match;
    private Integer limit;
    private ArrayList<String> type;
    private ArrayList<String> where;
    private Places places;
    private Integer found;

    private final transient Integer DEFAULT_LIMIT = 100;

    @Override
    public void buildResponse() {
        Integer responseLimit = (limit == 0) ? DEFAULT_LIMIT : limit;
        try {
            if (type != null || where != null) {
                throw new BadRequestException();
            }
            found = Database.found(match);
            places = Database.places(match, responseLimit);
        } catch(BadRequestException e) {
            // do nothing
        } catch(Exception e) {
            found = 0;
            places = new Places();
        }
    }

    /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */

    public FindRequest() {}

    public FindRequest(String match, Integer limit) {
        this.requestType = "find";
        this.match = match;
        this.limit = limit;
    }

    public String getMatch() {
        return match;
    }

    public Integer getLimit() {
        return limit;
    }

}