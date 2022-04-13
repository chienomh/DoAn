import React from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import MyMarker from './point';

export const MyMapComponent = compose(
  withProps({
    googleMapURL:
      // 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAI5hIfYM2MeTAGsyDb71hSw96CSXmKn9U',
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyD3gGoFG-bKYMimxS30UKsA99OlWsn9FEY',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 21.031728910421187, lng: 105.78710004183252 }}
    // yesIWantToUseGoogleMapApiInternals
    // defaultZoom={15}
  >
    ,
    {props.isMarkerShown && (
      // <Marker position={{ lat: 21.031728910421187, lng: 105.78710004183252 }} />
      <MyMarker lat={21.031728910421187} lng={105.78710004183252} />
    )}
    <MyMarker lat={21.031728910421187} lng={105.78710004183252} />
  </GoogleMap>
));
