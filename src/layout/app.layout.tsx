import React from 'react';
import { Container, Typography } from '@material-ui/core';

export const AppLayout: React.FC = ({ children }) => {
  return (
    <Typography component="span">
      <Container>{children}</Container>
    </Typography>
  );
};
