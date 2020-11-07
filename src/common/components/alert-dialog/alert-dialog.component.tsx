import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';

interface Props {
  open: boolean;
  title: string;
  message: string;
  buttonText: string;
  onClose: () => void;
}

export const AlertDialogComponent: React.FC<Props> = ({
  open,
  title,
  message,
  buttonText,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {buttonText}
        </Button>      
      </DialogActions>
    </Dialog>
  );
};
