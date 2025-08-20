import { useEffect, useMemo, useRef, useState } from "react";

type Crisis = {
  id: string;
  title: string;
  location: string;
  date: string;
  progress: number; // 0..100
  image?: string;
};

const sample: Crisis[] = [
  { id: "1", title: "Flood in Dhaka", location: "Dhaka", date: "22 Jul 2024", progress: 65, image: "" },
  { id: "2", title: "Cyclone in Coast", location: "Cox’s Bazar", date: "17 Apr 2024", progress: 48, image: "" },
  { id: "3", title: "River Erosion", location: "Kurigram", date: "15 Jan 2025", progress: 82, image: "" },
  { id: "4", title: "Landslide Relief", location: "Bandarban", date: "10 Mar 2025", progress: 30, image: "" },
];

export default function CrisisCarousel() {
  const [index, setIndex] = useState(0);
  const [vw, setVw] = useState(window.innerWidth);
  const intervalRef = useRef<number | null>(null);

  const perView = useMemo(() => (vw >= 1024 ? 3 : vw >= 640 ? 2 : 1), [vw]);
  const pages = Math.max(1, Math.ceil(sample.length / perView));

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % pages);
    }, 3500);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [pages]);

  return (
    <section id="map" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-bold">Real-Time Crisis Highlights</h2>
        <p className="mt-2 text-center text-gray-600">
          Live posts show progress, needs, and transparency.
        </p>

        <div className="relative mt-8 overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${index * 100}%)`, width: `${pages * 100}%` }}
          >
            {Array.from({ length: pages }).map((_, page) => (
              <div key={page} className="flex w-full flex-none gap-6 px-1"
                   style={{ width: `${100 / pages}%` }}>
                {sample
                  .slice(page * perView, page * perView + perView)
                  .map((c) => (
                    <CrisisCard key={c.id} crisis={c} />
                  ))}
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 w-6 rounded-full transition ${
                  i === index ? "bg-red-600" : "bg-gray-300"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CrisisCard({ crisis }: { crisis: Crisis }) {
  return (
    <article className="group relative w-full rounded-2xl bg-white shadow hover:shadow-lg transition overflow-hidden">
      <div className="h-44 w-full bg-gray-200 bg-cover bg-center"
           style={{ backgroundImage: `url(${crisis.image || "/placeholder.webp"})` }} />
      <div className="p-5">
        <h3 className="text-lg font-semibold">{crisis.title}</h3>
        <p className="text-sm text-gray-500">
          {crisis.location} • {crisis.date}
        </p>

        <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-red-600"
            style={{ width: `${crisis.progress}%` }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-gray-500">
          {crisis.progress}% funded
        </div>

        <div className="mt-4 flex items-center justify-between">
          <a
            href="#donate"
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Donate
          </a>
          <a
            href="#details"
            className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Details
          </a>
        </div>
      </div>
    </article>
  );
}
