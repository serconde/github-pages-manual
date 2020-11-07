import { PictureInfo } from './picture.model';
import { pictureListMockData } from './picture.mock-data';

export const getPicturesByCategory = (
  category: string
): Promise<PictureInfo[]> =>
  !!pictureListMockData[category] ? pictureListMockData[category] : [];
