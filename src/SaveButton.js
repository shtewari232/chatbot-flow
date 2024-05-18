import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SaveButton = ({ nodes, edges }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = () => {
    if (edges.length !== nodes.length - 1) {
      setOpenAlert(true);
      setSuccessMessage('');
    } else {
      // Save the flow to local storage
      const flow = { nodes, edges };
      localStorage.setItem('flow', JSON.stringify(flow));
      setSuccessMessage('Flow saved successfully!');
      setOpenAlert(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{ top: '8px' }} // Adjust top margin as needed
      >
        <MuiAlert
          onClose={handleClose}
          severity={successMessage ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {successMessage || 'Cannot save flow. Check connections between nodes.'}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default SaveButton;
