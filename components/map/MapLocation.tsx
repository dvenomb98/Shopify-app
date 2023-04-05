import { Marker } from "@react-google-maps/api";
import React, { FC } from "react";
import GMap from "./GMap";

const containerStyle = {
	width: "1OO%",
	height: "400px",
};

const position = {
	lat: 49.195281111111,
	lng: 16.607058888889,
};

const MapLocation: FC = () => {
	return (
		<GMap mapContainerStyle={containerStyle} center={position} zoom={16}>
			<Marker position={position} />
		</GMap>
	);
};

export default MapLocation;
