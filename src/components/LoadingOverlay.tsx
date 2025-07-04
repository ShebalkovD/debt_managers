import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import type { JSX } from 'react';

export const LoadingOverlay = ({isLoading}: {isLoading: boolean}): JSX.Element => {
  return (
    <Backdrop
    sx={(theme) => ({ 
        color: 'blue',
        zIndex: theme.zIndex.drawer + 1,
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: 'rgba(239, 239, 239, 0.5)'

    })}
    open={isLoading}
    >
    <CircularProgress color="inherit" />
    </Backdrop>
  );
}