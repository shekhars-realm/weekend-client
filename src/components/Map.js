import React from "react"
import { compose, withProps, withHandlers, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import mapStyles from '../utils/mapStyle'
import axios from 'axios'
import PropTypes from 'prop-types'
import hiking from '../images/hiking.png';
import EventCard from './Events/EventCard';
//redux imports
import {connect} from 'react-redux';
import {setLocations} from '../redux/actions/dataActions'

const markerStyling= {
  clear: "both", display: "inline-block", backgroundColor: "#00921A", fontWeight: '500',
  color: "#FFFFFF", boxShadow: "0 6px 8px 0 rgba(63,63,63,0.11)", borderRadius: "23px",
  padding: "8px 16px", whiteSpace: "nowrap", width: "160px", textAlign: "center"
};

class Map extends React.PureComponent {
  state = {
    isMarkerShown: false,
    lat: 49.680111,
    lng: 7.856220,
    markers: []
  }

  componentDidMount() {
    console.log(hiking);
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    })
    const userLocation = {
      location: {
        lat: 49.442860,
        lng: 7.740194
      },
      radius: 10
    };
    this.props.setLocations(userLocation)

  }

  render() {
    const {locations} = this.props
    const MyMapComponent = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.MAP_API_KEY}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `690px` }} />,
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
          console.log(`Current clicked markers length: ${clickedMarkers.length}`)
          console.log(clickedMarkers)
        }
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
        defaultOptions={{styles: mapStyles}}
      >
        <MarkerClusterer
          onClick={(event) => props.onMarkerClustererClick(event)}
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {
            locations.length > 0 && locations.map((event, index) => {
              let iconMarker = new window.google.maps.MarkerImage(
                        `/images/${event.primaryTag}.png`,
                        null, /* size is determined at runtime */
                        null, /* origin is 0,0 */
                        null, /* anchor is bottom center of the scaled image */
                        new window.google.maps.Size(40, 40)
                    );
              return (
                <Marker
                  key={index}
                  icon={iconMarker}
                  onClick={props.onToggleOpen}
                  position={{ lat: event.geoPoint._latitude, lng: event.geoPoint._longitude }}
                >
                  {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen(index)}>
                    <EventCard event={event}/>
                    </InfoWindow>
                  }
                </Marker>
              )
            })
          }
        </MarkerClusterer>
      </GoogleMap>
    )
    return (
      <div>
        <MyMapComponent/>
      </div>
    )
  }
}

Map.propTypes = {
  locations: PropTypes.array.isRequired,
  setLocations: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  locations: state.data.locations
})

export default connect(mapStateToProps, {setLocations})(Map)
