import { getPlatform, Platform } from './getPlatform';

export const getIsMobile = () => {
  const platform = getPlatform();

  return (
    platform === Platform.Ios ||
    platform === Platform.Android ||
    platform === Platform.OtherMobile
  );
};
