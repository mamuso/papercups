import { Component } from "react";
import Head from "next/head";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1000px;
  height: 1000px;
  opacity: 0.8;
  & .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

class MapItem extends Component {
  state = {
    lat: this.props.cup.location.lat,
    lng: this.props.cup.location.lng,
    zoom: 16
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Wrapper>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
        </Map>
      </Wrapper>
    );
  }
}
export default MapItem;
