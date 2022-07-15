import { createContext } from 'react';

enum Format {
  responce = 'responce',
  mobile = 'mobile',
  tablet = 'tablet',
  desktop = 'desktop',
}

const PageFormatContext = createContext<Format>(Format.responce);

export { PageFormatContext, Format };
