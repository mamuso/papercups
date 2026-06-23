import type { NextPage } from 'next'
import Link from "next/link";
import {useEffect, useRef} from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import data from "../data/data.json";
import Layout from "../layouts/Layout";
import type { CupData } from "../types/cup";

/*
  Unique cities
*/
const cups = data as CupData[];
const uniqueCities = Array.from(new Set(cups.map((item) => item.city)));

const AboutPage: NextPage = () => {
  const googlemap = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!googlemap.current) {
      return;
    }

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GMAPS ?? "",
      version: 'weekly',
    });

    loader.load().then(() => {
      if (!googlemap.current) {
        return;
      }

      const google = window.google;
      let prevInfowindow: google.maps.InfoWindow | null = null;

      const map = new google.maps.Map(googlemap.current, {
        center: { lat: 40.4637, lng: 3.7492 },
        zoom: 15,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      });

      const bounds = new google.maps.LatLngBounds();

      cups.forEach(p => {
        const latLng = { lat: p.location.lat, lng: p.location.lng };
        const contentString = `<a href="/pour/${p.slug}">${p.name}</a>`;
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        
        const marker = new google.maps.Marker({
          position: latLng,
          icon: { url: "/marker.png", scaledSize: new google.maps.Size(40, 40), },
          title: p.name,  
          map,
        });

        marker.addListener("click", () => {
          if (prevInfowindow) {
            prevInfowindow.close();
          }
          prevInfowindow = infowindow;
          
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
          });
        });
        
        bounds.extend(latLng);
      });
      
      map.fitBounds(bounds);

      });
  }, []);
  

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
          <div className='city' key={city}>
          <h3>{city}</h3>
          <ul>
            {cups
              .filter(x => x.city === city)
              .map(cup => (
                <li key={cup.slug}>
                  <Link href={`/pour/${encodeURIComponent(cup.slug)}`}>{cup.name}</Link>
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
