import React, { useState, useEffect } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import Icons from '../../util/Icons';
import ENDPOINT from '../../util/API.js';
import store from '../../store/store';
import axios from 'axios';

export function MapContainer (props) {

    let [ events, setEvents ] = useState([]);

    async function fetchEvents (endpoint) {
        const RESPONSE = await axios(endpoint);
        const DATA = RESPONSE.data;
    
        store.dispatch({ type: 'ADD_EVENTS', value: DATA });

        setEvents(store.getState().events);
    }

    useEffect(() => {
        fetchEvents(ENDPOINT);
    }, []);

    function onMarkerClick (e) {
        store.dispatch({ type: 'ADD_ID', value: e.id });
    }

    return (
            <Map 
                google={props.google}
                zoom={14} 
                initialCenter={{
                    lat: 51.4958,
                    lng: -0.1087
                }}
            >
                {
                    events.length ?
                    events.map((event, i) => {
                        const icon = Icons[`${event.type}`];
                        return <Marker 
                                    key={ i }
                                    label={{ text : event.title, color: '#4C3800', fontSize: '15px' }}
                                    position={{ lat: event.location.latitude, lng: event.location.longitude }}
                                    icon={{
                                        url: icon,
                                        scaledSize: new props.google.maps.Size(25, 35),
                                        labelOrigin: { x: 12, y: -10 }
                                    }}
                                    id={ event.id }
                                    onClick={ (e) => onMarkerClick(e) }
                                />
                    })
                    :
                    null
                }
            </Map>
    )
}

export default GoogleApiWrapper(
    {
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })(MapContainer);

