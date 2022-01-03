import Link from "next/link";

const CupContent = ({ cup, size }: any) => {
  return (
    <section className={`cup ${size}`}>
      <div className="meta">
        <h2>{cup.name}</h2>
        <address>
          <span>{cup.address}</span>
        </address>
      </div>
      <div className="cup">
        <img
          src={`/cups/${cup.slug}@${size}.png`}
          alt={`${cup.name} coffee cup`}
        />
      </div>
      </section>
  );
}

export function Cup({ cup, size }: any) {
  const linked = (size == 'small')
  return (
    (linked) ?
      <Link href={`/pour/${encodeURIComponent(cup.slug)}`}>
        <a>
          <CupContent cup={cup} size={size} />
        </a>
      </Link>
    : <CupContent cup={cup} size={size} />
  )
}

export default Cup;