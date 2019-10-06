import React from "react"
import { compose, withProps, withHandlers, withStateHandlers } from "recompose"
import { withScriptjs, MarkerWithLabel, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import $ from 'jquery';
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import _ from 'lodash';
import mapStyles from '../utils/mapStyle'
import axios from 'axios'
import PropTypes from 'prop-types'
import hiking from '../images/hiking.png';
import PlaceIcon from '@material-ui/icons/Place';
import EventCard from './Events/EventCard';
//redux imports
import {connect} from 'react-redux';
import {setLocations} from '../redux/actions/dataActions'

const markerStyling= {
  clear: "both", display: "inline-block", backgroundColor: "#00921A", fontWeight: '500',
  color: "#FFFFFF", boxShadow: "0 6px 8px 0 rgba(63,63,63,0.11)", borderRadius: "23px",
  padding: "8px 16px", whiteSpace: "nowrap", width: "160px", textAlign: "center"
};

const defaultMapOptions ={
  fullscreenControl: false,
  mapTypeControl: false,
}

class Map extends React.PureComponent {
  state = {
    isMarkerShown: false,
    location: {},
    markers: [],
    filter: {},
    mapCentreIcon: null
  }


  getMapZoom = (radius) => {
    if(radius > 0 && radius <= 3) {
      return 18
    } else if(radius > 3 && radius <=6) {
      return 17
    } else if(radius > 6 && radius <= 11) {
      return 16
    } else if(radius > 11 && radius <= 15) {
      return 15
    } else if(radius > 15 && radius <= 20) {
      return 14
    } else if(radius > 20 && radius <= 30) {
      return 13
    } else {
      return 12
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.filter && this.props.filter.location !== this.state.filter.location) {
      this.setState({
        filter: this.props.filter
      })
      console.log('map updated');
      return true
    } else {
      console.log('map updated');
      return false
    }
  }

  render() {
    const {locations, userLocation, filter, authenticated, handle} = this.props
    console.log('in map: ',userLocation, filter);
    const mapZoom = this.getMapZoom(filter.radius)
    let mapCenter = new window.google.maps.MarkerImage(
      '/images/myLocation.png',
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new window.google.maps.Size(20, 30),
    );
    var groupped = _.mapValues(_.groupBy(locations, 'locationString'), clist => clist.map(event => _.omit(event, 'locationString')))
    Object.keys(groupped).length > 0 && Object.keys(groupped).forEach((key) => {
    })
    const MyMapComponent = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_API_KEY}`,
        loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={$(window).width() > 600 ? {
        height: 500
      } : {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100vh'
      }} />,
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
        defaultZoom={mapZoom}
        mapTypeControl={false}
        defaultCenter={this.state.filter.location}
        defaultOptions={{
          styles: mapStyles,
          fullscreenControl: false,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        <Marker
          key='center'
          labelStyle={{ textAlign: "center", width:220 + 'px', backgroundColor: "#7fffd4", fontSize: "14px", padding:  8 + "px"}}
          icon={mapCenter}
          position={this.state.filter.location}></Marker>
        <MarkerClusterer
          onClick={(event) => props.onMarkerClustererClick(event)}
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {
            Object.keys(groupped).length > 0 && Object.keys(groupped).map((key, index) => {
              let iconMarker = new window.google.maps.MarkerImage(
                        `/images/mapIcon.jpg`,
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
                  position={{ lat: parseFloat(key.split(' ')[0]), lng: parseFloat(key.split(' ')[1]) }}
                >
                  {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen(index)}>
                    <EventCard event={groupped[key]}/>
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
  userLocation: PropTypes.object.isRequired,
  setLocations: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  locations: state.data.locations,
  userLocation: state.user.userLocation,
  filter: state.user.filter,
  authenticated: state.user.authenticated,
  handle: state.user.credentials.handle
})

export default connect(mapStateToProps, {setLocations})(Map)
