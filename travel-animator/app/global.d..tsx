declare namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        autoRotate?: boolean;
        cameraControls?: boolean;
        shadowIntensity?: number | string;
        environmentImage?: string;
        exposure?: number | string;
        [key: string]: any; // Allow other custom attributes
      };
    }
  }
  