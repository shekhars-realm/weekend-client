import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps, withHandlers, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import mapStyles from '../../utils/mapStyle'



class SmallMap extends React.Component {

  render () {
    let iconMarker = new window.google.maps.MarkerImage(
              `/images/mapIcon.jpg`,
              null, /* size is determined at runtime */
              null, /* origin is 0,0 */
              null, /* anchor is bottom center of the scaled image */
              new window.google.maps.Size(40, 40)
          );
    console.log('props in smal mp: ', this.props);
    const MyMapComponent = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_API_KEY}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `350px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withStateHandlers(() => ({
        isOpen: false,
        }), {
        onToggleOpen: ({ isOpen }) => () => ({
          isOpen: !isOpen
        })
      }),
      withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
          const clickedMarkers = markerClusterer.getMarkers()
        }
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{
          lat: this.props.location._latitude,
          lng: this.props.location._longitude
        }}
        defaultOptions={{styles: mapStyles}}
      >
        <Marker
          icon={iconMarker}
          key={0}
          position={{ lat: this.props.location._latitude,
          lng: this.props.location._longitude}}
        />
      </GoogleMap>
    )
    return (
      this.props.location ? <a href={'https://maps.google.com/maps?z=10&t=m&q=loc:' + this.props.location._latitude + '+' + this.props.location._longitude} target="_blank">
      <div style={{margin: 20}}>
        <MyMapComponent/>
      </div>
      </a> : null
    )
  }
}

export default SmallMap;
