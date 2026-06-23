import type { NextPage } from 'next'
import Link from "next/link";
import data from "../data/data.json";
import Layout from "../layouts/Layout";
import MapView from "../components/MapView";
import type { CupData } from "../types/cup";

/*
  Unique cities
*/
const cups = data as CupData[];
const uniqueCities = Array.from(new Set(cups.map((item) => item.city)));

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <div className="about">
        <section className='blurb'>
        <h2>Sipping coffee all over the world</h2>
        <p>We 💖 coffee. We are the kind of family who has a commercial-grade espresso machine and grinder in the kitchen and gets excited when a bag of fresh beans comes home, or when <a href='https://twitter.com/killermuffin'>@killermuffin</a> roasts a small batch at home with her Gene Cafe.</p>
        <p>I also enjoy the graphics aspects of the coffee culture. I realized that my photo library was full of pictures of cute coffee paper cups after each trip to a new city. I started copying coffee paper cups as a non-creative exercise. I just wanted to have an excuse to draw when I was too tired to find inspiration.</p>
        <p>I started posting them to Instagram, but I thought that I could find a better home for them here :)</p>
      </section>

      <MapView
        fitBounds
        markers={cups.map((cup) => ({
          href: `/pour/${encodeURIComponent(cup.slug)}`,
          position: cup.location,
          title: cup.name,
        }))}
      />
      
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
