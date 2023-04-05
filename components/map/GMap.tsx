import { GoogleMap, GoogleMapProps, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

const GMap = React.forwardRef<GoogleMap, GoogleMapProps>(({ children, ...props }, ref) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string
  });
  return isLoaded ? (
    <GoogleMap ref={ref} {...props}>
      {children}
    </GoogleMap>
  ) : null;
});

GMap.displayName = 'GMap';

export default GMap;