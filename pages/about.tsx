import type { NextPage } from 'next'
import Link from "next/link";
import data from "../data/data.json";
import Layout from "../layouts/Layout";
import { useSurveyMap } from '../hooks/useGoogleMap';

interface Cup {
  slug: string;
  name: string;
  city: string;
  location: { lat: number; lng: number };
}

interface Props {
  cities: string[];
  cups: Cup[];
}

const AboutPage: NextPage<Props> = ({ cities, cups }) => {
  const mapRef = useSurveyMap(cups);

  return (
    <Layout>
      <div className="about">
        <section className='blurb'>
          <h2>Sipping coffee all over the world</h2>
          <p>We 💖 coffee. We are the kind of family who has a commercial-grade espresso machine and grinder in the kitchen and gets excited when a bag of fresh beans comes home, or when <a href='https://twitter.com/killermuffin'>@killermuffin</a> roasts a small batch at home with her Gene Cafe.</p>
          <p>I also enjoy the graphics aspects of the coffee culture. I realized that my photo library was full of pictures of cute coffee paper cups after each trip to a new city. I started copying coffee paper cups as a non-creative exercise. I just wanted to have an excuse to draw when I was too tired to find inspiration.</p>
          <p>I started posting them to Instagram, but I thought that I could find a better home for them here :)</p>
        </section>

        <div id="map" ref={mapRef}></div>

        <section className='blurb citylist'>
          {cities.map(city => (
            <div className='city' key={city}>
              <h3>{city}</h3>
              <ul>
                {cups
                  .filter(cup => cup.city === city)
                  .map(cup => (
                    <li key={cup.slug}>
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
  );
}

export function getStaticProps() {
  const cities = Array.from(new Set(data.map((cup) => cup.city)));
  return { props: { cities, cups: data } };
}

export default AboutPage;
