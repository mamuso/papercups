import type { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Layout from '../layouts/Layout';
import { getAboutMapMarkers, getCities, groupCupsByCity } from '../lib/cups';
import type { CupListItem } from '../types/cup';
import type { MapMarker } from '../components/MapView';

const MapView = dynamic(() => import('../components/MapView'), { ssr: false });

interface AboutProps {
  cities: string[];
  cupsByCity: Record<string, CupListItem[]>;
  mapMarkers: MapMarker[];
}

const AboutPage: NextPage<AboutProps> = ({ cities, cupsByCity, mapMarkers }) => {
  return (
    <Layout>
      <div>
        <section className="mb-10 max-w-prose">
          <h1 className="mb-6 font-mono text-3xl font-medium uppercase tracking-tight leading-none">
            Paper Cups
          </h1>
          <p className="text-base leading-relaxed">
            I tend to take photos of paper coffee cups whenever I travel. I love the little bits of design and personality they carry. At some point I started drawing them, mostly as an excuse to keep sketching. This is where they all ended up.
          </p>
        </section>

        <MapView fitBounds markers={mapMarkers} />

        <section>
          {cities.map((city) => (
            <div key={city}>
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
