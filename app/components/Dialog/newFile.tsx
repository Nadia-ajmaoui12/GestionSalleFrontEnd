import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  dialogTitle: {
    color: 'rgba(67,100,70, 255)',
    padding: '5px',
    fontWeight: '500',
    fontSize: '2.5rem',
    fontFamily: 'Raleway, sans-serif',
    margin: '5px',
  },
  dialogStyle: {
    backgroundColor: 'rgba(67,100,70, 0.7)',
  },
});

export const CustomDialog = ({
  open,
  title,
  handleClose,
  children,
}: {
  open: boolean;
  title: string;
  handleClose: any;
  children: any;
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      className={classes.dialogStyle}
    >
      <DialogTitle display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h3" className={classes.dialogTitle}>
          {title}
        </Typography>
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
