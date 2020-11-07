import React from 'react';
import { PictureCardComponent } from './picture-card.component';
import { PictureInfo } from 'common/vm/picture.vm';
import * as classes from './picture-list.styles';

interface PictureListProps {
  pictures: PictureInfo[];
  onSelectPicture: (pictureId: string, selected: boolean) => void;
  locale: string;
  currency: string;
}

export const PictureListComponent: React.FC<PictureListProps> = ({
  pictures,
  onSelectPicture,
  locale,
  currency,
}) => {
  return (
    <div className={classes.pictureContainer}>
      {pictures.map((p) => (
        <PictureCardComponent
          key={p.id}
          picture={p}
          onSelectPicture={onSelectPicture}
          locale={locale}
          currency={currency}
        ></PictureCardComponent>
      ))}
    </div>
  );
};
