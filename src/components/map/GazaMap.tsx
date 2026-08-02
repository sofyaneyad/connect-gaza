import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import { getNeighborhood, getUser, posts } from "@/data/mock";

/**
 * Leaflet map with mock markers. Browser-only: loaded lazily behind <ClientOnly>.
 */
export default function GazaMap({ height = "70vh" }: { height?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = await import("leaflet");
      if (cancelled || !ref.current || mapRef.current) return;

      const map = L.map(ref.current, { scrollWheelZoom: true }).setView([31.44, 34.38], 11);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 18,
      }).addTo(map);

      for (const post of posts) {
        const hood = getNeighborhood(post.neighborhoodId);
        const user = getUser(post.userId);
        const jitter = () => (Math.random() - 0.5) * 0.012;
        const icon = L.divIcon({
          className: "",
          html: `<span style="display:grid;place-items:center;width:34px;height:34px;border-radius:14px;background:${
            post.type === "offer" ? "#075E66" : "#1d63c9"
          };color:#fff;font-size:15px;box-shadow:0 6px 18px -6px rgba(7,94,102,.7)">${
            post.type === "offer" ? "🎁" : "🙋"
          }</span>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });

        L.marker([hood.lat + jitter(), hood.lng + jitter()], { icon })
          .addTo(map)
          .bindPopup(
            `<div dir="rtl" style="font-family:Cairo,sans-serif;width:220px">
              <img src="${post.images[0]}" alt="" style="width:100%;height:110px;object-fit:cover;border-radius:10px"/>
              <div style="font-weight:700;margin-top:6px">${post.title}</div>
              <div style="font-size:12px;color:#5b6b6d">${hood.name} · ${user.name}</div>
              <div style="font-size:12px;margin-top:4px"><b>المعروض:</b> ${post.offerItems.join("، ")}</div>
              <a href="/search?q=${encodeURIComponent(post.title)}" style="display:block;margin-top:8px;text-align:center;background:#075E66;color:#fff;padding:7px;border-radius:9px;font-size:12px;text-decoration:none">فتح المنشور</a>
            </div>`,
          );
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={ref} style={{ height }} className="w-full rounded-3xl shadow-card" />;
}
