import { Button, withStyles } from '@material-ui/core';

export const StyledButton = withStyles({
  root: {
    backgroundColor: '#d2a679',
    '&:hover': {
      backgroundColor: '#604020',
      color: '#fff',
    },
  },
})(Button);
