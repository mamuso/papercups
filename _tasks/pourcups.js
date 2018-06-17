require("dotenv").config();
const fs = require("fs");
const dateFormat = require("dateformat");
const slugify = require("slugify");
const ogs = require("open-graph-scraper");

const Firestore = require("@google-cloud/firestore");
const firestore = new Firestore({
  credentials: {
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL
  }
});

// May I have a latte or two?
const document = firestore.collection("papercups");

let query = firestore.collection("papercups");
try {
  query
    .orderBy("created_at", "desc")
    .get()
    .then(cups => {
      cups.docs.forEach(sip => {
        const ogsoptions = {
          url: `https://www.instagram.com/p/${sip.get("instagram_id")}/`
        };

        ogs(ogsoptions)
          .then(result => {
            return result.data.ogImage.url;
          })
          .then(instagram_url => {
            const date = dateFormat(sip.get("created_at"), "yyyy-mm-dd");
            const slug = slugify(sip.get("name"), {
              lower: true,
              remove: /[$*_+~.()'"!\-:@]/g
            });
            fs.writeFile(
              `_posts/${date}-${slug}.md`,
              setFrontMatter(
                sip.get("name"),
                sip.get("address"),
                sip.get("city"),
                sip.get("country"),
                sip.get("instagram_id"),
                instagram_url,
                sip.get("location")._latitude,
                sip.get("location")._longitude
              ),
              err => {
                if (err) {
                  return console.log(err);
                }
              }
            );
          });
      });
    });
} catch (err) {
  console.log(err);
}

const setFrontMatter = (
  title,
  address,
  city,
  country,
  instagram_id,
  instagram_image_url,
  latitude,
  longitude
) => {
  return `---
layout: default
title: ${title}
address: ${address}
city: ${city}
country: ${country}
instragram_id: ${instagram_id}
instagram_image_url: ${instagram_image_url}
location: 
  - ${latitude}
  - ${longitude}
---`;
};
