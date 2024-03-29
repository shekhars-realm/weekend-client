import React from "react"
import { compose, withProps, withHandlers, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
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

  componentDidMount() {
    const filter = {
      radius: 20,
      location: this.props.userLocation,
      searchText: '',
      startTime: new Date().toISOString()
    };
    this.setState({
      filter: this.props.filter
    })
    const {authenticated, userImage} = this.props
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.filter && this.props.filter.location !== this.state.filter.location) {
      this.setState({
        filter: this.props.filter
      })
    }
  }

  getMapZoom = (radius) => {
    if(radius > 0 && radius <= 3) {
      return 18
    } else if(radius > 3 && radius <=6) {
      return 16
    } else if(radius > 6 && radius <= 11) {
      return 14
    } else if(radius > 11 && radius <= 15) {
      return 13
    } else {
      return 12
    }
  }

  render() {
    const {locations, userLocation, filter, authenticated, userImage} = this.props
    const mapZoom = this.getMapZoom(filter.radius)
    let mapCenter = new window.google.maps.MarkerImage(
      authenticated ? userImage : 'https://firebasestorage.googleapis.com/v0/b/weekend-62173.appspot.com/o/no-img.png?alt=media&token=619f0cbc-8770-4ef6-a73a-905dc02bf144',
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new window.google.maps.Size(30, 30)
    );
    var groupped = _.mapValues(_.groupBy(locations, 'locationString'), clist => clist.map(event => _.omit(event, 'locationString')))
    console.log('groupped: ',groupped);
    Object.keys(groupped).length > 0 && Object.keys(groupped).forEach((key) => {
      console.log(key, parseFloat(key.split(' ')[0]), parseFloat(key.split(' ')[1]), groupped[key]);
    })
    const MyMapComponent = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_API_KEY}`,
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
          icon={mapCenter}
          position={this.state.filter.location}/>
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
  userImage: state.user.credentials.imageUrl
})

export default connect(mapStateToProps, {setLocations})(Map)
