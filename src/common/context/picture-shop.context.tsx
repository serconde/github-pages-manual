import React from 'react';
import { PictureInfo } from 'common/vm/picture.vm';

interface PictureShopContext {
  selectedPictures: PictureInfo[];
  setSelectedPictures: (pictures: PictureInfo[]) => void;
  locale: string;
  currency: string;
}

interface PictureShopContextProviderProps {
  children: any;
  locale: string;
  currency: string;
}

export const ShopContext = React.createContext<PictureShopContext>({
  selectedPictures: [],
  setSelectedPictures: (pictures) => {},
  locale: 'en-US',
  currency: 'USD',
});

export const PictureShopContextProvider: React.FC<PictureShopContextProviderProps> = ({
  locale,
  currency,
  children,
}) => {
  const [selectedPictures, setSelectedPictures] = React.useState([]);

  return (
    <ShopContext.Provider
      value={{ selectedPictures, setSelectedPictures, locale, currency }}
    >
      {children}
    </ShopContext.Provider>
  );
};
