// import React from "react"
// import { compose, withProps, withStateHandlers } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import mapStyles from '../../utils/mapStyle'
//
// const MyMapComponent = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBWQW_w7pSqu50DbNtvuU-SrwhPc02nTrA",
//     loadingElement: <div style={{ height: `100%` }} />,
//   containerElement: <div style={{ height: `900px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withStateHandlers(() => ({
//         isMarkerShown: false,
//         markerPosition: null
//       }), {
//         onMapClick: ({ isMarkerShown }) => (e) => ({
//             markerPosition: e.latLng,
//             isMarkerShown:true
//         })
//       }),
//   withScriptjs,
//   withGoogleMap
// )((props) =>
//   <GoogleMap
//     defaultZoom={18}
//     defaultCenter={{ lat: 49.442470, lng: 7.741396 }}
//     onClick={props.onMapClick}
//     defaultOptions={{styles: mapStyles}}
//   >
//     {props.isMarkerShown && <Marker position={props.markerPosition} />}
//   </GoogleMap>
// )
//
// export default class LocateMap extends React.PureComponent {
//   state = {
//     isMarkerShown: false,
//   }
//
//   componentDidMount() {
//     this.delayedShowMarker()
//   }
//
//   delayedShowMarker = () => {
//     setTimeout(() => {
//       this.setState({ isMarkerShown: true })
//     }, 3000)
//   }
//
//   handleMarkerClick = () => {
//     this.setState({ isMarkerShown: false })
//     this.delayedShowMarker()
//   }
//
//   onMapClick(event) {
//     console.log(event);
//   }
//
//   render() {
//     return (
//       <Fragment>
//         <MyButton tip='Locate on map' onClick={this.handleClose} btnClassName={classes.closeButton}>
//           <CloseIcon color='secondary'/>
//         </MyButton>
//         <Dialog fullScreen open={this.state.openMap} onClose={this.handleClose} TransitionComponent={Transition}>
//           <AppBar className={classes.appBar}>
//             <Toolbar>
//               <IconButton edge="start" color="inherit" onClick={this.handleCloseMap} aria-label="Close">
//                 <CloseIcon />
//               </IconButton>
//               <Typography variant="h6" className={classes.title}>
//                 Map
//               </Typography>
//               <Button color="inherit" onClick={this.handleCloseMap}>
//                 save
//               </Button>
//             </Toolbar>
//           </AppBar>
//             <MyMapComponent
//               isMarkerShown={this.state.isMarkerShown}
//               onMarkerClick={this.handleMarkerClick}
//               onClick={() => {console.log('clicked');}}
//             />
//         </Dialog>
//
//       </Fragment>
//     )
//   }
// }
