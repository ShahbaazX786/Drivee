/* eslint-disable prettier/prettier */

import { Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
const Map = () => {
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-full"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle={"light"}
    >
      <Text>Map</Text>
    </MapView>
  );
};

export default Map;
