import React from 'react';
import { Card } from '@material-ui/core';
import { PictureInfo } from 'common/vm/picture.vm';
import * as classes from './picture-card.styles';
import { formatCurrency } from 'common/utils';

interface PictureCardProps {
  picture: PictureInfo;
  onSelectPicture: (pictureId: string, selected: boolean) => void;
  locale: string;
  currency: string;
}

export const PictureCardComponent: React.FC<PictureCardProps> = ({
  picture,
  onSelectPicture,
  locale,
  currency,
}) => {
  const handleSelectPicture = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => onSelectPicture(event.target.value, event.target.checked);
  const img = require('images/' + picture.picUrl);
  return (
    <Card key={picture.id} className={classes.pictureCardStyles}>
      <img
        className={classes.imageStyles}
        src={img.default}
        alt={picture.name}
      ></img>
      <p>
        {picture.name}{' '}
        <strong>{formatCurrency(picture.price, locale, currency)}</strong>
      </p>
      <label>
        <input
          type="checkbox"
          name={'pic_' + picture.id}
          value={picture.id}
          checked={picture.selected}
          onChange={handleSelectPicture}
          className={classes.buyCheckStyles}
        ></input>
        Buy
      </label>
    </Card>
  );
};
