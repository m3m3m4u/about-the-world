declare module 'h5p-standalone' {
  export interface H5POptions {
    h5pJsonPath: string;
    librariesPath?: string;
    frameJs?: string;
    frameCss?: string;
    saveFreq?: number | boolean;
    contentUserData?: Array<{ state: string }>;
    [key: string]: any;
  }

  export class H5P {
    constructor(container: HTMLElement | null, options: H5POptions);
  }
}
