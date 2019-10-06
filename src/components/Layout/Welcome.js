import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SwipeableViews from 'react-swipeable-views';
import $ from 'jquery';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      '/images/homeScreenMobile.png',
  },
  {
    label: 'Bird',
    imgPath:
      '/images/feedScreenMobile.png',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      '/images/profileScreenMobile.png',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      '/images/scheduleScreenMobile.png',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    height: '100%',
  },
  header: {
    alignItems: 'center',
    height: 20,
    padding: 5,
    textAlign: 'center'
  },
  img: {
    height: $(window).height(),
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
    objectFit: 'contain'
  },
  stepper: {
    position: 'absolute',
    width: $(window).width(),
    bottom: 0,
    background: 'transparent',
    color: 'whitesmoke'
  }
}));

function SwipeableTextMobileStepper(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(true)
  const maxSteps = tutorialSteps.length;

  function handleClose() {
    setOpen(false)
  }

  function handleNext() {
    if(activeStep === maxSteps - 1) {
      setOpen(false)
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleStepChange(step) {
    setActiveStep(step);
  }

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={$(window).width() < 600 ? true : false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{padding: 0}}>
          <div className={classes.root}>
            {
              // <Paper square elevation={0} className={classes.header}>
              //   <Typography>{tutorialSteps[activeStep].label}</Typography>
              // </Paper>
            }
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {tutorialSteps.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <img className={classes.img} src={step.imgPath} alt={step.label} />
                  ) : null}
                </div>
              ))}
            </SwipeableViews>
            <MobileStepper
            className={classes.stepper}
              steps={maxSteps}
              position="static"
              variant="progress"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={false}>
                  {
                    activeStep === maxSteps - 1 ? 'Finish' : 'Next'
                  }
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </div>
        </DialogContent>
      </Dialog>
  );
}

export default SwipeableTextMobileStepper;
