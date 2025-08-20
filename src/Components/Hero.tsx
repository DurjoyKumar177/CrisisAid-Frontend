export default function Hero() {
  return (
    <section
      id="home"
      className="relative grid min-h-screen place-items-center overflow-hidden"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      {/* subtle top gradient to help navbar */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Be the Help They Need. <span className="text-red-400">Right Now.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg md:text-xl text-gray-100/90">
          Join thousands of volunteers and donors saving lives during Bangladesh’s toughest moments.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#donate"
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold shadow-lg shadow-red-600/30 hover:bg-red-700"
          >
            Donate Now
          </a>
          <a
            href="#volunteer"
            className="rounded-xl border border-white/70 px-6 py-3 font-semibold hover:bg-white hover:text-red-700 transition"
          >
            Become a Volunteer
          </a>
        </div>

        {/* Micro-stats */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
            👥 <span className="font-bold">2,300+</span> Volunteers
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
            💰 <span className="font-bold">৳12M+</span> Raised
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
            📍 <span className="font-bold">120+</span> Crises Managed
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-6 text-orange-300 font-semibold">
          🌪 Cyclone Relief Fund closes in: <span>02d 14h 35m</span>
        </div>
      </div>
    </section>
  );
}
