import React from 'react';
import { PictureInfo } from 'common/vm/picture.vm';
import { ShopContext } from 'common/context/picture-shop.context';
import { getPicturesByCategory } from 'api/picture-list.api';
import { mapPictureInfoListFromApiToVm } from 'common/vm/picture.mapper';
import { PictureListComponent } from './picture-list.component';

interface PictureListContainerProps {
  pictureCategory: string;
}

export const PictureListContainer: React.FC<PictureListContainerProps> = ({
  pictureCategory,
}) => {
  const {
    selectedPictures,
    setSelectedPictures,
    locale,
    currency,
  } = React.useContext(ShopContext);
  const [pictures, setPictures] = React.useState<PictureInfo[]>([]);

  const loadPictureList = async (category: string) => {
    const pictureList = await getPicturesByCategory(category);
    const pictureListViewModels = mapPictureInfoListFromApiToVm(pictureList);

    selectedPictures.map((sp) => {
      const picture = pictureListViewModels.find((p) => sp.id === p.id);
      !!picture && (picture.selected = true);
    });
    setPictures(pictureListViewModels);
  };

  const handleSelectPicture = (pictureId: string, selected: boolean) => {
    const picture = pictures.find((p) => p.id === pictureId);
    picture.selected = selected;

    picture.selected
      ? setSelectedPictures([...selectedPictures, picture])
      : setSelectedPictures(
          selectedPictures.filter((p) => p.id !== picture.id)
        );
  };

  React.useEffect(() => {
    (async () => await loadPictureList(pictureCategory))();
  }, [pictureCategory]);

  return (
    <PictureListComponent
      pictures={pictures}
      onSelectPicture={handleSelectPicture}
      locale={locale}
      currency={currency}
    ></PictureListComponent>
  );
};
