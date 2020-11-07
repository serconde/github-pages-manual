import * as apiModel from 'api/picture.model';
import * as viewModel from './picture.vm';

const mapPictureInfoFromApiToVm = (
  picture: apiModel.PictureInfo
): viewModel.PictureInfo => ({
  ...picture,
  selected: false,
});

export const mapPictureInfoListFromApiToVm = (
  pictures: apiModel.PictureInfo[]
): viewModel.PictureInfo[] => pictures.map(p => mapPictureInfoFromApiToVm(p));
