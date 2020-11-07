import React from 'react';
import { css } from 'emotion';
import { Typography } from '@material-ui/core';

const root = css`
  display: grid;
  grid-template-columns: 2fr 0.1fr 1fr;
  width: 1000px;
  margin: auto;
  box-sizing: border-box;
  padding-top: 40px;
`;

export const AppLayout: React.FC = ({ children }) => {
  return (
    <Typography component="span">
      <div className={root}>{children}</div>
    </Typography>
  );
};
