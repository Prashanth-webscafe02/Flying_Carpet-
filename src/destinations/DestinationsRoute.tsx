import { useEffect, useState } from "react";
import DestinationDetail from "./DestinationDetail";
import DestinationsPage from "./DestinationsPage";
import ExperienceDetail from "./ExperienceDetail";
import HotelDetail from "./HotelDetail";
import { destinations } from "./data";
import { details } from "./details";
import { slug } from "./navigate";
import { isOpen, isTab } from "./tabs";

// /destinations → personalised list; /destinations/<id>[/<tab>] → that destination;
// /destinations/<id>/hotels/<hotel> → that hotel; /destinations/<id>/experiences/<experience> → that experience.
export default function DestinationsRoute() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const [, , id, tab, itemSlug] = path.split("/");
  const d = destinations.find((x) => x.id === id);
  const hotel =
    d && tab === "hotels" && itemSlug
      ? details[d.id].hotels.find((h) => slug(h.name) === itemSlug)
      : undefined;
  const experience =
    d && tab === "experiences" && itemSlug
      ? details[d.id].experiences.find((e) => slug(e.title) === itemSlug)
      : undefined;

  // Unknown destination, hotel or experience: fall back to the nearest valid page with a clean URL.
  // A switched-off tab (e.g. /flights) falls back to the destination overview.
  const fallback =
    id && !d
      ? "/destinations"
      : d && itemSlug && !hotel && !experience
        ? `/destinations/${d.id}${isOpen(tab) ? `/${tab}` : ""}`
        : d && isTab(tab) && !isOpen(tab)
          ? `/destinations/${d.id}`
          : null;
  useEffect(() => {
    if (fallback) window.history.replaceState(null, "", fallback);
  }, [fallback]);

  if (!d) return <DestinationsPage />;
  if (hotel) return <HotelDetail key={path} d={d} hotel={hotel} />;
  if (experience)
    return <ExperienceDetail key={path} d={d} experience={experience} />;
  return (
    <DestinationDetail
      key={d.id}
      d={d}
      initialTab={isOpen(tab) ? tab : "hotels"}
    />
  );
}
