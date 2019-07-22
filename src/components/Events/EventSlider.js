import React from 'react';
import "../../utils/EventSlider.scss";
import $ from 'jquery';
import EventCard from './EventCard'
import PropTypes from 'prop-types'
//mui imports
import Typography from '@material-ui/core/Typography';
//redux import
import {connect} from 'react-redux';

var scaling = 1.50;
//count
var currentSliderCount = 0;
var videoCount
var showCount = 6;
var sliderCount
var controlsWidth = 60;
var scollWidth = 0;

 function init(){
 // elements
 var win = $(window);
 var sliderFrame = $(".slider-frame");
 var sliderContainer = $(".slider-container");
 var slide = $(".slide");
 var btn = $(".btn")

 //counts
 var scollWidth = 0;


 //sizes
 var windowWidth = win.width();
 var frameWidth = win.width() - 80;
  if(windowWidth >= 0 && windowWidth <= 414){
    showCount = 4;
}else if(windowWidth >= 414 &&  windowWidth <= 768){
    showCount = 5;
}else{
    showCount = 6;
}
 var videoWidth = ((windowWidth - controlsWidth * 2) / showCount );
 var videoHeight = Math.round(videoWidth / (16/9));

 var videoWidthDiff = (videoWidth * scaling) - videoWidth;
 var videoHeightDiff = (videoHeight * scaling) - videoHeight;



 //set sizes
 sliderFrame.width(windowWidth);
 sliderFrame.height(videoHeight * scaling);


 //sliderFrame.css("top", (videoHeightDiff / 2));

 sliderContainer.height(videoHeight * scaling);
 sliderContainer.width((videoWidth * videoCount) + videoWidthDiff);
 sliderContainer.css("top", (videoHeightDiff / 2));
 sliderContainer.css("margin-left", (controlsWidth));

 console.log((videoWidth * videoCount) + videoWidthDiff, windowWidth);

 slide.height(videoHeight);
 slide.width(videoWidth);
 btn.height(videoHeight)
 btn.css('top', ((videoHeight * scaling) - (videoHeight))/2)

 //hover effect
 $(".slide").mouseover(function() {
     $('#cardAction').css("display", 'block')
     $(this).css("width", videoWidth * scaling);
     $(this).css("height", videoHeight * scaling);
     $(this).css("top", -(videoHeightDiff / 2));
     if($(".slide").index($(this)) == 0 || ($(".slide").index($(this))) % 4 == 0){
       // do nothing
     }
     else if(($(".slide").index($(this)) + 1) % 4 == 0 && $(".slide").index($(this)) != 0){
         $(this).parent().css("margin-left", -(videoWidthDiff - controlsWidth));
     }
     else{
         $(this).parent().css("margin-left", - (videoWidthDiff / 2));
     }
 }).mouseout(function() {
     $('#cardAction').css("display", 'none')
     $(this).css("width", videoWidth * 1);
     $(this).css("height", videoHeight * 1);
     $(this).css("top", 0);
     $(this).parent().css("margin-left", controlsWidth);
 });
 console.log((videoWidth * videoCount) + videoWidthDiff, windowWidth);
 // controls
 controls(frameWidth, scollWidth);
}


function controls(frameWidth, scollWidth){
 var prev = $(".prev");
 var next = $(".next");

 next.on("click", function(){
     console.log(currentSliderCount);
     console.log(sliderCount);
     scollWidth = scollWidth + frameWidth;
     $('.slider-container').animate({
         left: - scollWidth
     }, 300, function(){
         if(currentSliderCount >= sliderCount-1){
             $(".slider-container").css("left", 0);
             currentSliderCount = 0;
             scollWidth = 0;
         }else{
             currentSliderCount++;
         }
     });
 });
 prev.on("click", function(){
     scollWidth = scollWidth - frameWidth;
     $('.slider-container').animate({
         left: + scollWidth
     }, 300, function(){
         currentSliderCount--;
     });
     //$(".slider-container").css("left", scollWidth);
 });
};

class EventSlider extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {


    videoCount = $(".slider-container").children().length;
    sliderCount = videoCount / showCount;


    $(document).ready(function(){
        //$('.slider-container .slide:nth-last-child(-n+4)').prependTo('.slider-container');
        init();

    });
    $( window ).resize(function() {
        init();
    });
  }



  render() {
    const {locations} = this.props;
    console.log(locations);
    return(
        <div class="slider-frame">
            <div class="btn prev"></div>
            <div class="btn next"></div>
            <div class="slider-container">
              {
                locations.length > 0 && locations.map(event => {
                  return <div class="slide"><EventCard event={event}/></div>
                })
              }
            </div>
        </div>
    )
  }

}

EventSlider.propTypes = {
  locations: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  locations: state.data.locations
})

export default connect(mapStateToProps)(EventSlider);
