import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import MapView from '../components/MapView';
import Layout from '../layouts/Layout';
import { getAboutMapMarkers, getCities, groupCupsByCity } from '../lib/cups';
import type { CupListItem } from '../types/cup';
import type { MapMarker } from '../components/MapView';

interface AboutProps {
  cities: string[];
  cupsByCity: Record<string, CupListItem[]>;
  mapMarkers: MapMarker[];
}

const AboutPage: NextPage<AboutProps> = ({ cities, cupsByCity, mapMarkers }) => {
  return (
    <Layout>
      <div className="about">
        <section className="blurb">
          <h2>Sipping coffee all over the world</h2>
          <p>We 💖 coffee. We are the kind of family who has a commercial-grade espresso machine and grinder in the kitchen and gets excited when a bag of fresh beans comes home, or when <a href="https://twitter.com/killermuffin">@killermuffin</a> roasts a small batch at home with her Gene Cafe.</p>
          <p>I also enjoy the graphics aspects of the coffee culture. I realized that my photo library was full of pictures of cute coffee paper cups after each trip to a new city. I started copying coffee paper cups as a non-creative exercise. I just wanted to have an excuse to draw when I was too tired to find inspiration.</p>
          <p>I started posting them to Instagram, but I thought that I could find a better home for them here :)</p>
        </section>

        <MapView fitBounds markers={mapMarkers} />

        <section className="blurb citylist">
          {cities.map((city) => (
            <div className="city" key={city}>
              <h3>{city}</h3>
              <ul>
                {cupsByCity[city].map((cup) => (
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
  );
};

export const getStaticProps: GetStaticProps<AboutProps> = async () => ({
  props: {
    cities: getCities(),
    cupsByCity: groupCupsByCity(),
    mapMarkers: getAboutMapMarkers(),
  },
});

export default AboutPage;
