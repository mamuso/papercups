require("dotenv").config();
const fs = require("fs");
const dateFormat = require("dateformat");
const slugify = require("slugify");

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
query
  .orderBy("created_at", "desc")
  .get()
  .then(cups => {
    cups.docs.forEach(sip => {
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
          sip.get("location")._latitude,
          sip.get("location")._longitude
        ),
        function(err) {
          if (err) {
            return console.log(err);
          }
        }
      );
    });
  });

function setFrontMatter(
  title,
  address,
  city,
  country,
  instagram_id,
  latitude,
  longitude
) {
  return `---
layout: default
title: ${title}
address: ${address}
city: ${city}
country: ${country}
instragram_id: ${instagram_id}
location: 
  - ${latitude}
  - ${longitude}
---`;
}
