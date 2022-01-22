import type { NextPage } from 'next'
import Link from "next/link";
import {useEffect, useRef} from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import data from "../data/data.json";
import Layout from "../layouts/Layout";
import Cup from '../components/Cup';

/*
  Unique cities
*/
let uniqueCities: Array<string>= [];

for (var item, i = 0; (item = data[i++]); ) {
  const city = `${item.city}`;
  if (!(uniqueCities.includes(city))) {
    uniqueCities.push(city);
  }
}

const AboutPage: NextPage = () => {
  const googlemap = useRef(null);
  
  useEffect(() => {
    const loader = new Loader({
      apiKey: `${process.env.NEXT_PUBLIC_GMAPS}`,
      version: 'weekly',
    });
    let map: any;

    // const latLng = { lat: cup.location.lat, lng: cup.location.lng };
    loader.load().then(() => {
      const google = window.google;
      let prev_infowindow: any = false;

      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 40.4637, lng: 3.7492 },
        zoom: 15,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      });

      var bounds = new google.maps.LatLngBounds();

      data.map(p => {
        const latLng = { lat: p.location.lat, lng: p.location.lng };
        const contentString = `<a href="/pour/${p.slug}">${p.name}</a>`;
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        
        const marker: any = new google.maps.Marker({
          position: latLng,
          icon: { url: "/marker.png", scaledSize: new google.maps.Size(40, 40), },
          title: p.name,  
          map,
        });

        marker.addListener("click", () => {
          if( prev_infowindow ) {
           prev_infowindow.close();
        }
          prev_infowindow = infowindow;
          
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
          });
        });
        
        bounds.extend(marker.getPosition());
      });
      
      map.fitBounds(bounds);

      });
    });
  

  return (
    <Layout>
      <div className="about">
        <section className='blurb'>
        <h2>Sipping coffee all over the world</h2>
        <p>We 💖 coffee. We are the kind of family who has a commercial-grade espresso machine and grinder in the kitchen and gets excited when a bag of fresh beans comes home, or when <a href='https://twitter.com/killermuffin'>@killermuffin</a> roasts a small batch at home with her Gene Cafe.</p>
        <p>I also enjoy the graphics aspects of the coffee culture. I realized that my photo library was full of pictures of cute coffee paper cups after each trip to a new city. I started copying coffee paper cups as a non-creative exercise. I just wanted to have an excuse to draw when I was too tired to find inspiration.</p>
        <p>I started posting them to Instagram, but I thought that I could find a better home for them here :)</p>
      </section>

      <div id="map" ref={googlemap}></div>
      
      <section className='blurb citylist'>
        {uniqueCities.map(city => (
          <div className='city'>
          <h3>{city}</h3>
          <ul>
            {data
              .filter(x => x.city === city)
              .map(cup => (
                <li>
                  <Link href={`/pour/${encodeURIComponent(cup.slug)}`}>
                    <a>{cup.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        </section>
      </div>
    </Layout>

  )
}

export default AboutPage;
