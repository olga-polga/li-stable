import { combineReducers } from 'redux';
const staledata =
    {
        "houses":
            [
                        {
                            "address": "5 Privet Dr.",
                            "id": 1,
                            "_links": {
                                "self": {
                                    "href": "http://localhost:9001/api/houses/1"
                                },
                                "house": {
                                    "href": "http://localhost:9001/api/houses/1"
                                },
                                "pictures": {
                                    "href": "http://localhost:9001/api/houses/1/pictures"
                                }
                            }
                        },
                        {
                            "address": "720 Paper St.",
                            "id": 2,
                            "_links": {
                                "self": {
                                    "href": "http://localhost:9001/api/houses/2"
                                },
                                "house": {
                                    "href": "http://localhost:9001/api/houses/2"
                                },
                                "pictures": {
                                    "href": "http://localhost:9001/api/houses/2/pictures"
                                }
                            }
                        },
                        {
                            "address": "Apt. 56B, Whitehaven Mansions",
                            "id": 3,
                            "_links": {
                                "self": {
                                    "href": "http://localhost:9001/api/houses/3"
                                },
                                "house": {
                                    "href": "http://localhost:9001/api/houses/3"
                                },
                                "pictures": {
                                    "href": "http://localhost:9001/api/houses/3/pictures"
                                }
                            }
                        },
                        {
                            "address": "124 Conch Street, Bikini Bottom",
                            "id": 4,
                            "_links": {
                                "self": {
                                    "href": "http://localhost:9001/api/houses/4"
                                },
                                "house": {
                                    "href": "http://localhost:9001/api/houses/4"
                                },
                                "pictures": {
                                    "href": "http://localhost:9001/api/houses/4/pictures"
                                }
                            }
                        },
                        {
                            "address": "42 Wallaby Way, Sydney",
                            "id": 5,
                            "_links": {
                                "self": {
                                    "href": "http://localhost:9001/api/houses/5"
                                },
                                "house": {
                                    "href": "http://localhost:9001/api/houses/5"
                                },
                                "pictures": {
                                    "href": "http://localhost:9001/api/houses/5/pictures"
                                }
                            }
                        }
                    ]
            }

;
export const listingsReducer = (state = {}, action) => {
    return staledata;
}
export const selectionReducer = (state = {}, action) => {
    switch (action.type) {
        case  "LISTING_SELECTED" :
            return action.payload;
        default:
            return state;
    }
}
const allReducers = {
    listings: listingsReducer,
    selection: selectionReducer,
}

export const rootReducer = combineReducers(allReducers);