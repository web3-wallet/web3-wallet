type WindowWithOpera = Window &
  typeof globalThis & {
    opera?: string;
  };

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;

  const ua =
    navigator.userAgent ||
    navigator.vendor ||
    (window as WindowWithOpera).opera ||
    '';

  if (/android/i.test(ua)) {
    return true;
  }

  if (
    /iPhone|iPad|iPod/i.test(ua) ||
    (/Mac/i.test(ua) && 'ontouchend' in document)
  ) {
    return true;
  }

  if (/BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(ua)) {
    return true;
  }

  return false;
};
