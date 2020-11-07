import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, withStyles } from '@material-ui/core';
import * as classes from './picture-list.styles';

interface PictureListMenuProps {
  pictureCategories: string[];
}

const StyledAppBar = withStyles({
  root: {
    background: '#d2a679',
    marginBottom: '20px',
  },
})(AppBar);

export const PictureListMenu: React.FC<PictureListMenuProps> = ({
  pictureCategories,
}) => {
  const { pathname } = useLocation();

  return (
    <StyledAppBar position="relative">
      <nav>
        {pictureCategories.map((pc) => (
          <Link
            key={pc}
            to={`/${pc}`}
            className={
              pc === pathname.substring(1)
                ? classes.navLinkActive
                : classes.navLink
            }
          >
            {pc}
          </Link>
        ))}
      </nav>
    </StyledAppBar>
  );
};
