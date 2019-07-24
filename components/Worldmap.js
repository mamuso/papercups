import { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";
import data from "../data/data.json";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/static/coffee.png",
  iconUrl: "/static/coffee.png",
  shadowUrl: null,
  iconSize: [32, 32]
});

export const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 60rem;
  & .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

class WorldmapItem extends Component {
  render() {
    const bounds = L.latLngBounds([0, 0]);
    data.map(p => {
      bounds.extend([p.location.lat, p.location.lng]);
    });

    return (
      <Wrapper>
        <Map bounds={bounds} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          />
          {/* <ZoomControl position="topright" /> */}
          {data.map(p => (
            <Marker position={[p.location.lat, p.location.lng]}>
              <Popup>
                <strong>
                  <a href={`/pour/${p.slug}`}>{p.name}</a>
                </strong>
                <br />
                {p.address}
              </Popup>
            </Marker>
          ))}
        </Map>
      </Wrapper>
    );
  }
}
export default WorldmapItem;
