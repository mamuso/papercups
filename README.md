# Paper cups

We 💖 coffee. We are the kind of family who has a commercial-grade espresso machine and grinder in the kitchen and gets excited when a bag of fresh beans comes home, or when [@killermuffin](https://twitter.com/killermuffin) roasts a small batch at home with her Gene Cafe.

I also enjoy the graphics aspects of the coffee culture. I realized that my photo library was full of pictures of cute coffee paper cups after each trip to a new city. I started copying coffee paper cups as a non-creative exercise. I just wanted to have an excuse to draw when I was too tired to find inspiration.

I started posting them to Instagram, but I thought that I could find a better home for them here :)

## Working on the site

This is a statically exported Next.js site. Use Node 24.

```sh
fnm exec --using 24 npm install
fnm exec --using 24 npm run dev
```

The development server runs at `http://localhost:3000`.

### Environment

Maps use Leaflet with MapTiler Dataviz Light tiles. Create `.env.local` from `.env.example` and add a MapTiler browser key:

```sh
NEXT_PUBLIC_MAPTILER_KEY=your_maptiler_key
```

The key is public in the browser, so restrict it to the production domain in MapTiler.

### Useful commands

```sh
fnm exec --using 24 npm run lint
fnm exec --using 24 npm run build
fnm exec --using 24 npm run stitchjson
```

`npm run build` writes the static export to `out/`.

### Adding a cup

1. Add a numbered JSON file under `data/`.
2. Add matching cup images under `public/cups/`:
   - `{slug}@small.png`, 600 by 600
   - `{slug}@large.png`, 1200 by 1200
3. Run `fnm exec --using 24 npm run stitchjson`.
4. Run lint and build before committing.

## Where did we sip coffee?

### Barcelona, ES

- [x] Nømad Coffee
- [x] Satan's Coffee

### Madrid, ES

- [x] The Fix
- [x] Toma Cafe

### Copenhagen, DK

- [x] Lagkagehuset

### London, UK

- [x] Allpress
- [ ] Bread & Bean
- [x] Department of Coffee Affairs
- [ ] Fernandez & Wells
- [ ] Flat White
- [ ] Kaffeine
- [x] Koa Coffee
- [x] Look mum no hands
- [x] Monmouth Coffee
- [ ] Nude Espresso
- [ ] Ozone Coffee Roasters
- [x] Prufrock Coffee
- [ ] Sharps Barber and Shop
- [x] Shoreditch Grind
- [x] Timberyard

### Stockholm, SE

- [ ] Wayne's Coffee

### Hyderabad, IN

- [x] Barista
- [ ] Café Coffee Day

### Berkeley, CA, US

- [x] Rasa Caffe
- [ ] Timeless
- [ ] The hidden cafe

### Los Angeles, CA, US

- [ ] Alfred Coffee
- [ ] Colectivo Coffee
- [ ] Commissary
- [x] Dinosaur Coffee
- [ ] Eightfold
- [ ] G&B Grand Central
- [ ] Intelligentsia Coffee
- [ ] La Colombe
- [ ] Lamill Coffee
- [x] Menottis
- [x] Smith & Tait
- [ ] The Good People
- [x] Woodcat
- [ ] 10 speed coffee

### Martinez, CA, US

- [ ] States

### Mill Valley, CA, US

- [ ] Equator Coffee

### Monterey, CA, US

- [ ] Captain + Stoker
- [x] Tidal

### Oakland, CA, US

- [ ] Bicycle Coffee
- [x] Coloso
- [ ] Farley's East
- [ ] Highwire Coffee
- [x] Red Bay Coffee
- [ ] Snow White
- [ ] Wilde Brothers Coffee
- [ ] Motivat

### Pasadena, CA, US

- [ ] Rosebud

### Sacramento, CA, US

- [ ] Temple Coffee

### San Diego, CA, US

- [ ] Heartsleeves Coffee

### San Francisco, CA, US

- [x] Andytown
- [ ] Blue Bottle
- [x] Chapel Coffee
- [ ] Coffee Cultures
- [ ] Dynamo Donuts
- [ ] Fayes Coffee
- [ ] Fiore Caffe
- [ ] Four Barrel
- [x] George and Lennie
- [x] Grand Coffee
- [ ] Haus
- [ ] Hollow Coffee
- [x] Jane
- [ ] La Capra
- [x] Lady Falcon Coffee Club
- [x] Linea Cafe
- [ ] Matching Half
- [ ] Mazarine
- [ ] Native Twins Coffee
- [x] Pentacle
- [ ] Philz Coffee
- [ ] Reveille
- [ ] Ritual
- [ ] Saint Frank
- [ ] Sextant Coffee
- [ ] Sightglass
- [x] Snowbird
- [ ] Vega
- [ ] Wise Sons
- [ ] Wrecking Ball Coffee Roasters
- [ ] Cento Coffee

### San Luis Obispo, CA, US

- [ ] Kreuzberg
- [ ] Kraken
- [ ] Field Day Coffee
- [ ] 

### Santa Barbara, CA, US

- [x] Dune Coffee Roasters
- [ ] Handlebar
- [ ] Low Pigeon

### Santa Cruz, CA, US

- [x] Cat and cloud
- [ ] Verve

### Santa Rosa, CA, US

- [ ] Crooks Coffee

### Petaluma, CA, US

- [ ] Acre Coffee Roasters

### Walnut Creek, CA, US

- [ ] Coffee Shop

### Chicago, IL, US

- [ ] Elaine's
- [ ] Fairgrounds

### Raleigh, NC, US

- [ ] Benelux
- [ ] Cup-a-Joe
- [x] Jubala
- [ ] Morning Times
- [x] Sola Coffee

### Las Vegas, NV, US

- [x] Milk

### Reno, NV, US

- [ ] Old World Coffee Lab

### Bend, OR, US

- [x] Backporch

### Portland, OR, US

- [ ] Barista
- [ ] Case Study
- [x] Coava
- [ ] Dapper and Wise
- [ ] Deadstock Coffee
- [ ] Flying Cat Coffee
- [x] Good
- [ ] Heart
- [x] Never Coffee Labs
- [x] Pip's Original Doughnuts
- [ ] Stumptown Coffee

### Austin, TX, US

- [x] Flat Track Coffee
- [ ] Houndstooth
- [ ] Jo's Coffee
- [ ] Little Brother

### Seattle, WA, US

- [x] Anchorhead
- [ ] La Marzocco Cafe
- [x] Little Oddfellows
- [ ] Mr West
- [ ] Seattle Coffee Works
- [x] Victrola
- [x] Vita

### New York, NY, US

- [ ] Brooklyn Roasting Company
- [ ] Culture Espresso
- [ ] Gregorys Coffee
- [ ] St Kilda Coffee
- [ ] Partners Coffee

### Jersey City, NJ, US

- [ ] Lackawanna

### Miami, FL, US

- [ ] Panther Coffee
- [ ] Cortadito
- [ ] XO Coffee
- [ ] Pasion del Cielo Coffee
- [ ] Walt Grace Vintage
- [ ] Las Palmas Cafeteria

### Nashville, TN, US

- [ ] Crema
- [ ] Drug Store
