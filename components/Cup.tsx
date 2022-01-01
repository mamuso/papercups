const Cup = ({ cup, size }: any) => (
  <section className={size}>
    <div className="meta">
      <h2>{cup.name}</h2>
      <address>{cup.address}</address>
    </div>
    <div className="cup">
      <img
        src={`/cups/${cup.slug}@${size}.png`}
        alt={`${cup.name} coffee cup`}
      />
    </div>
  </section>
);

export default Cup;


// import Link from 'next/link'

// import Cup from './Cup'

// const SmallCupItem = ({ cup }: any) => (
//   <Link href={`/pour/${encodeURIComponent(cup.slug)}`}>
//     <a>
//       <div className="smallcup">
//         <Cup cup={cup} size="small" />
//       </div>
//     </a>
//   </Link>
// )

// export default SmallCupItem
