export enum Platform {
  Ios,
  Android,
  OtherMobile,
  Desktop,
}

type WindowWithOpera = Window &
  typeof globalThis & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    opera: any;
  };

export const getPlatform = (): Platform | undefined => {
  if (typeof window === 'undefined') return undefined;

  const ua =
    navigator.userAgent ||
    navigator.vendor ||
    (window as WindowWithOpera).opera;

  if (/android/i.test(ua)) {
    return Platform.Android;
  }

  if (
    /iPhone|iPad|iPod/i.test(ua) ||
    // iPad on iOS 13 detection
    (/Mac/i.test(ua) && 'ontouchend' in document)
  ) {
    return Platform.Ios;
  }

  if (/BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(ua)) {
    return Platform.OtherMobile;
  }

  return Platform.Desktop;
};
