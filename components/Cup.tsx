import Image from "next/image";
import Link from "next/link";
import MapView from "./MapView";
import type { CupData, CupSize } from "../types/cup";

type CupContentProps = {
  cup: CupData;
  size: CupSize;
};

const CupContent = ({ cup, size }: CupContentProps) => {
  const imageSize = size === "large" ? 1200 : 600;

  return (
    <section className={`card ${size}`}>
      <div className="meta">
        <h2>{cup.name}</h2>
        <address>
          <span>{cup.address}</span>
          <CupMap cup={cup} size={size} />
        </address>
      </div>
      <div className="cup">
        <Image
          src={`/cups/${cup.slug}@${size}.png`}
          alt={`${cup.name} coffee cup`}
          width={imageSize}
          height={imageSize}
          sizes={size === "large" ? "(max-width: 1024px) 130vw, 700px" : "(max-width: 1024px) 180px, 350px"}
          priority={size === "large"}
        />
      </div>
      </section>
  );
}

export function CupMap({ cup, size }: CupContentProps) {
  return size === "large" ? (
    <MapView center={cup.location} markers={[{ position: cup.location, title: cup.name }]} />
  ) : null;
}

export function Cup({ cup, size }: CupContentProps) {
  const linked = size === 'small';
  return (
    (linked) ?
      <Link href={`/pour/${encodeURIComponent(cup.slug)}`} className="card-link">
        <CupContent cup={cup} size={size} />
      </Link>
    : <CupContent cup={cup} size={size} />
  )
}

export default Cup;
