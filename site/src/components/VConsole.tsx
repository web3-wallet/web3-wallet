import { getIsMobile } from '@site/utils/getIsMobile';
import Script from 'next/script';

/**
 * A lightweight, extendable front-end developer tool for mobile web page.
 *
 * https://github.com/Tencent/vConsole
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VConsole: any;
  }
}

export const VConsole = () => {
  if (!getIsMobile()) return null;

  return (
    <Script
      src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        // VConsole will be exported to `window.VConsole` by default.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new window.VConsole();
      }}
    />
  );
};
