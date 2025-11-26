import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getCrisisPosts } from "../../services/crisisService";
import Loader from "../common/Loader";
import placeholder1 from "../../assets/placeholder1.jpg";

export default function CrisisCarousel() {
  const [crises, setCrises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  // Determine cards per view based on screen size
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    fetchCrises();
  }, []);

  const fetchCrises = async () => {
    try {
      const data = await getCrisisPosts();
      // Filter approved posts only
      const approvedPosts = data.filter((post) => post.status === "approved");
      setCrises(approvedPosts);
    } catch (error) {
      console.error("Error fetching crises:", error);
      setCrises([]);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(crises.length / cardsPerView);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
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
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Real-Time Crisis Highlights
          </h2>
          <p className="text-gray-600">No active crises at the moment.</p>
        </div>
      </section>
    );
  }

  // Get current page crises
  const startIdx = index * cardsPerView;
  const currentCrises = crises.slice(startIdx, startIdx + cardsPerView);

  return (
    <section id="map" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-bold text-blue-600">
          Real-Time Crisis Highlights
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Live posts show progress, needs, and transparency.
        </p>

        <div className="relative mt-8">
          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="text-red-600 text-xl" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
                aria-label="Next slide"
              >
                <FaChevronRight className="text-red-600 text-xl" />
              </button>
            </>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out gap-6"
              style={{
                transform: `translateX(-${index * 100}%)`,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <div
                  key={pageIdx}
                  className="flex gap-6 flex-shrink-0"
                  style={{ width: "100%" }}
                >
                  {crises
                    .slice(pageIdx * cardsPerView, (pageIdx + 1) * cardsPerView)
                    .map((crisis) => (
                      <CrisisCard key={crisis.id} crisis={crisis} />
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
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

function CrisisCard({ crisis }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Use backend image if available, otherwise placeholder
  const imageUrl = crisis.banner_image || placeholder1;

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
          {crisis.location || "Bangladesh"} • {formatDate(crisis.created_at)}
        </p>

        {/* Progress bar - simulated for now */}
        <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-red-600"
            style={{ width: `${Math.floor(Math.random() * 40 + 30)}%` }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-gray-500">In Progress</div>

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