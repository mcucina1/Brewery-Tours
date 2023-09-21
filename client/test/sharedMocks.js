import { Place } from "../src/models/place.model";
export const VALID_CONFIG_RESPONSE = JSON.stringify({
    requestType: 'config',
    serverName: 't99',
    features: ['config']
});

export const INVALID_REQUEST = JSON.stringify({
    invalid: 'this is an invalid response to fail the schema'
});

export const MOCK_PLACES = [
    new Place({ name: 'Place A', latitude: "40.0", longitude: "-20.0" }),
    new Place({ name: 'Place B', latitude: "-20.0", longitude: "50.0" }),
    new Place({ name: '123 Test', city: 'expanded test', latitude: "50.0", longitude: "60.0"}),
    new Place({lat: '27.0', lng: '100.0', road: 'Main St'}),
    new Place({lat: '80', lng: '-80', suburb: 'Test Suburb', name: 'Test Place'}),
    new Place({house_number: '123', road: 'Main St', suburb: 'Test Suburb', lat: '5.0', lng: '-40.0'}),
    new Place({latitude: "0.0", longitude: "0.0", postcode: '12345'}),
    new Place({lat: '50', lng: '50', road: 'Main St', country: 'Test Country'})
];

export const MOCK_DISTANCES = [
    6114,
    4875,
    2635,
    5044,
    5347,
    2782,
    4532,
    3361
];

export const DOUBLE_MOCK_DISTANCES = MOCK_DISTANCES.concat(MOCK_DISTANCES);

export const REVERSE_GEOCODE_RESPONSE = JSON.stringify({
    "place_id": 259127396,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    "osm_type": "relation",
    "osm_id": 8539568,
    "lat": "40.57066025",
    "lon": "-105.08539645568865",
    "place_rank": 30,
    "category": "amenity",
    "type": "university",
    "importance": 0.4948531325947546,
    "addresstype": "amenity",
    "name": "Colorado State University",
    "display_name": "Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States",
    "address": {
        "amenity": "Colorado State University",
        "road": "South College Avenue",
        "city": "Fort Collins",
        "county": "Larimer County",
        "state": "Colorado",
        "postcode": "80525-1725",
        "country": "United States",
        "country_code": "us"
    },
    "boundingbox": [
        "40.5527786",
        "40.5789122",
        "-105.0972937",
        "-105.0721817"
    ]
});

export const REVGEO_DISTANCES_RESPONSE = JSON.stringify(
    {
        "places": [
            {
                "country": "United States",
                "defaultDisplayName": "Colorado State University",
                "latitude": '40.57',
                "longitude": '-105.085',
                "name": 'Colorado State University',
                "municipality": 'Fort Collins',
                "postcode": "80525-1725",
                "region": "Colorado",
                "streetAddress": "South College Avenue"
            }
        ],
        "earthRadius": 3959.0,
        "distances": [0],
        "requestType": "distances"
    }
);

export const MOCK_DISTANCES_RESPONSE = JSON.stringify(
    {
        "places": [
            {
                "latitude": "40.0",
                "longitude": "-20.0"
            },
            {
                "latitude": "-20.0",
                "longitude": "50.0"
            },
            {
                "latitude": "50.0",
                "longitude": "60.0"
            },
            {
                "latitude": "27.0",
                "longitude": "100.0"
            },
            {
                "latitude": "80.0",
                "longitude": "-80.0"
            },
            {
                "latitude": "5.0",
                "longitude": "-40.0"
            },
            {
                "latitude": "0.0",
                "longitude": "0.0"
            },
            {
                "latitude": "50.0",
                "longitude": "50.0"
            }
        ],
        "earthRadius": 3959.0,
        "distances": [
            6114,
            4875,
            2635,
            5044,
            5347,
            2782,
            4532,
            3361
        ],
        "requestType": "distances"
    }
);

export const DOUBLE_MOCK_DISTANCES_RESPONSE = JSON.stringify(
    {
        "places": [
            {
                "latitude": "40.0",
                "longitude": "-20.0"
            },
            {
                "latitude": "-20.0",
                "longitude": "50.0"
            },
            {
                "latitude": "50.0",
                "longitude": "60.0"
            },
            {
                "latitude": "27.0",
                "longitude": "100.0"
            },
            {
                "latitude": "80.0",
                "longitude": "-80.0"
            },
            {
                "latitude": "5.0",
                "longitude": "-40.0"
            },
            {
                "latitude": "0.0",
                "longitude": "0.0"
            },
            {
                "latitude": "50.0",
                "longitude": "50.0"
            },
            {
                "latitude": "40.0",
                "longitude": "-20.0"
            },
            {
                "latitude": "-20.0",
                "longitude": "50.0"
            },
            {
                "latitude": "50.0",
                "longitude": "60.0"
            },
            {
                "latitude": "27.0",
                "longitude": "100.0"
            },
            {
                "latitude": "80.0",
                "longitude": "-80.0"
            },
            {
                "latitude": "5.0",
                "longitude": "-40.0"
            },
            {
                "latitude": "0.0",
                "longitude": "0.0"
            },
            {
                "latitude": "50.0",
                "longitude": "50.0"
            }
        ],
        "earthRadius": 3959.0,
        "distances": [
            6114,
            4875,
            2635,
            5044,
            5347,
            2782,
            4532,
            3361,
            6114,
            4875,
            2635,
            5044,
            5347,
            2782,
            4532,
            3361
        ],
        "requestType": "distances"
    }
);

export const MOCK_FIND_PLACES_RESPONSE = JSON.stringify(
    {
        "requestType": "find",
        "match": "R136a1",
        "type": ["other"],
        "where": ["Outer Space"],
        "limit": 10,
        "found": 1,
        "places": [{
            "latitude": "0",
            "longitude": "0"
        }]
    }
);

export const MOCK_TOUR_REQUEST = JSON.stringify({
    "requestType": "tour",
    "earthRadius": 1000000,
    "response": 1.0,
    "places": [{
        "name": "South Pole",
        "latitude": "-90",
        "longitude": "0",
        "notes": "somewhat cold"
    }, {
        "name": "Place 3",
        "latitude": "-70",
        "longitude": "0",
        "notes": "Still in Antarctica"
    }, {
        "name": "Null Island",
        "latitude": "0",
        "longitude": "0",
        "notes": "Where your null pointers come from"
    }, {
        "name": "North Pole",
        "latitude": "90",
        "longitude": "0",
        "notes": "cold"
    }]
});

export const MOCK_TOUR_RESPONSE = JSON.stringify({
    "earthRadius": 1000000.0,
    "response": 1,
    "places": [
        {
            "notes": "somewhat cold",
            "latitude": "-90",
            "name": "South Pole",
            "longitude": "0"
        },
        {
            "notes": "Still in Antarctica",
            "latitude": "-70",
            "name": "Place 3",
            "longitude": "0"
        },
        {
            "notes": "Where your null pointers come from",
            "latitude": "0",
            "name": "Null Island",
            "longitude": "0"
        },
        {
            "notes": "cold",
            "latitude": "90",
            "name": "North Pole",
            "longitude": "0"
        }
    ],
    "requestType": "tour"
});