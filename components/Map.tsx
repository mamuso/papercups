import { Component } from 'react'
// import { Map, TileLayer, Marker } from 'react-leaflet-universal'
// import L from 'leaflet'
// import styled from 'styled-components'

// delete L.Icon.Default.prototype._getIconUrl

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: '/coffee.png',
//   iconUrl: '/coffee.png',
//   shadowUrl: null,
//   iconSize: [32, 32],
// })

// export const Wrapper = styled.div`
//   position: relative;
//   z-index: 1;
//   width: 100%;
//   height: 75rem;
//   & .leaflet-container {
//     width: 100%;
//     height: 100%;
//   }
//   @media ${(props) => props.theme.device.large} {
//     & {
//       height: 40rem;
//     }
//   }
// `

// class MapItem extends Component {
//   state = {
//     lat: this.props.cup.location.lat,
//     lng: this.props.cup.location.lng,
//     zoom: 14,
//   }

//   render() {
//     const position = [this.state.lat, this.state.lng]
//     return (
//       <Wrapper>
//         <Map center={position} zoom={this.state.zoom} zoomControl={false}>
//           <TileLayer attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>' url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
//           {/* <ZoomControl position="topright" /> */}
//           <Marker position={position} />
//         </Map>
//       </Wrapper>
//     )
//   }
// }
// export default MapItem

class MapItem extends Component {

  render() {
    return (
      <div>map</div>
    )
  }
}
export default MapItem