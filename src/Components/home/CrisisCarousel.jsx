import { useEffect, useMemo, useState } from "react";
import { getCrisisPosts } from "../../services/crisisService";
import Loader from "../common/Loader";

// Fallback images
import image1 from "../../assets/image1.webp";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";

const fallbackImages = [image1, image2, image3, image4];

export default function CrisisCarousel() {
  const [crises, setCrises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const perView = useMemo(() => (vw >= 1024 ? 3 : vw >= 640 ? 2 : 1), [vw]);
  const pages = Math.max(1, Math.ceil(crises.length / perView));

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    fetchCrises();
  }, []);

  const fetchCrises = async () => {
    try {
      const data = await getCrisisPosts({ post_type: '' });
      // Take first 6 approved posts
      const approvedPosts = data.filter(post => post.status === 'approved').slice(0, 6);
      setCrises(approvedPosts);
    } catch (error) {
      console.error('Error fetching crises:', error);
      // Use dummy data as fallback
      setCrises([
        {
          id: 1,
          title: "Flood in Dhaka",
          location: "Dhaka",
          created_at: "2024-07-22",
          banner_image: null,
        },
        {
          id: 2,
          title: "Cyclone in Coast",
          location: "Cox's Bazar",
          created_at: "2024-04-17",
          banner_image: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Loader size="lg" />
        </div>
      </section>
    );
  }

  if (crises.length === 0) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-gray-600">No active crises at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="map" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-bold text-blue-600">
          Real-Time Crisis Highlights
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Live posts show progress, needs, and transparency.
        </p>

        <div className="relative mt-8 overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{
              transform: `translateX(-${index * 100}%)`,
              width: `${pages * 100}%`,
            }}>
            {Array.from({ length: pages }).map((_, page) => (
              <div
                key={page}
                className="flex w-full flex-none gap-6 px-1"
                style={{ width: `${100 / pages}%` }}>
                {crises
                  .slice(page * perView, page * perView + perView)
                  .map((crisis, idx) => (
                    <CrisisCard 
                      key={crisis.id} 
                      crisis={crisis}
                      fallbackImage={fallbackImages[idx % fallbackImages.length]}
                    />
                  ))}
              </div>
            ))}
          </div>

          {pages > 1 && (
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
          )}
        </div>
      </div>
    </section>
  );
}

function CrisisCard({ crisis, fallbackImage }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Use banner_image if available, otherwise use fallback
  const imageUrl = crisis.banner_image 
    ? `http://127.0.0.1:8000${crisis.banner_image}` 
    : fallbackImage;

  return (
    <article className="group relative w-full rounded-2xl bg-white shadow hover:shadow-lg transition overflow-hidden">
      <div
        className="h-44 w-full bg-gray-200 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold line-clamp-1">{crisis.title}</h3>
        <p className="text-sm text-gray-500">
          {crisis.location || 'Bangladesh'} • {formatDate(crisis.created_at)}
        </p>

        {/* Progress bar - simulated for now */}
        <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-red-600"
            style={{ width: `${Math.floor(Math.random() * 40 + 30)}%` }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-gray-500">
          In Progress
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <a
            href={`/crisis/${crisis.id}`}
            className="flex-1 text-center rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition text-sm font-medium"
          >
            Donate
          </a>

          <a
            href={`/crisis/${crisis.id}`}
            className="flex-1 text-center rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 transition text-sm font-medium"
          >
            Details
          </a>
        </div>
      </div>
    </article>
  );
}