import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import AddBox from '@material-ui/icons/AddBox';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  uploadMediaCont: {
    display: 'grid'
  },
  dropzone: {
    float: 'left',
    padding: 7,
    cursor: 'pointer',
    marginTop: 10
  },
  addBoxIcon: {
    cursor: 'pointer',
    fontSize: 30,
    position:'absolute',
    color: 'darkgrey'
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    [theme.breakpoints.down('sm')]: {
    overflowX: 'scroll',
    justifyContent: 'center'
    }
  },
}));

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
  justifyContent: 'center'
};

const deleteMedia = {
  position: 'absolute',
  fontSize: 40,
  color: 'orangered'
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  width: 160,
  height: 160,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'contain'
};


export default function UploadMedia(props) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [openErrorDialog, setDialog] = useState(false);
  const [errorTitle, setErrorTitle] = useState('')
  const [errorBody, setErrorBody] = useState('')
  const {getRootProps, getInputProps} = useDropzone({
    maxSize: 50*1024*1024,
    accept: 'image/jpeg, image/png, video/mp4',
    onDrop: acceptedFiles => {
      if(acceptedFiles.length > 4) {
        setErrorTitle('Maximum files exceeded')
        setErrorBody('You can upload a max of 4 media files as your moments.')
        setDialog(true)
      }
      setFiles(acceptedFiles.slice(0, 4).map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      props.sendFiles(acceptedFiles.slice(0, 4))
    },
    onDropRejected: rejectedFiles => {
      if(!openErrorDialog) {
        setErrorTitle('File size exceeded!')
        setErrorBody('Maximum file size is 50MB of all uploads combined.')
        setDialog(true)
      }
    }
  });

  function handleFileDelete(file) {
    let tempArr = files.filter(elem => elem.path !== file.path)
    setFiles(tempArr)
    props.sendFiles(tempArr)
  }

  const thumbs = files.map(file => {
    return (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
        {
          file.type === 'video/mp4' ?
          <video style={img} controls>
            <source src={file.preview} type="video/mp4"/>
            Your browser does not support the video tag.
          </video> : <img
            src={file.preview}
            style={img}
          />
        }
        <Delete onClick={() => handleFileDelete(file)} style={deleteMedia}/>
        </div>
      </div>
    )
  });

  const closeErrorDialog = () => {
    setDialog(false)
  }

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className={classes.uploadMediaCont}>
      <div {...getRootProps({className: classes.dropzone})}>
        <input {...getInputProps()} />
        <Button disabled={files.length > 3} variant='contained' color='secondary' style={{fontWeight: 700}}>Add media</Button>
      </div>
      <aside className={classes.thumbsContainer}>
        {thumbs}
      </aside>
      <Dialog
        open={openErrorDialog}
        onClose={closeErrorDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{errorTitle}</DialogTitle>
        <DialogContent>
          {errorBody}
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={() => closeErrorDialog()}>Alright!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
