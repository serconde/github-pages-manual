import React from 'react';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShopContext } from 'common/context/picture-shop.context';

export const ShoppingCartContainer: React.FC = () => {
  const {
    selectedPictures,
    setSelectedPictures,
    locale,
    currency,
  } = React.useContext(ShopContext);

  const onRemovePicture = (pictureId: string) => {
    const pictureToRemove = selectedPictures.find((p) => p.id === pictureId);
    pictureToRemove.selected = false;

    const newSelectedPictures = selectedPictures.filter(
      (p) => p.id !== pictureId
    );
    setSelectedPictures(newSelectedPictures);
  };

  const onEmptyShoppingCart = () => {
    selectedPictures.forEach((p) => (p.selected = false));
    setSelectedPictures([]);
  };

  return (
    <ShoppingCartComponent
      pictures={selectedPictures}
      onRemovePicture={onRemovePicture}
      onEmptyShoppingCart={onEmptyShoppingCart}
      locale={locale}
      currency={currency}
    ></ShoppingCartComponent>
  );
};
