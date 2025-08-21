import bannerImage from "../assets/Banner_1.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative  bg-cover bg-center flex flex-col "
      style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="flex">
        <div className="w-3/5">
          {/* Content */}
          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="text-center max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white">
                Be the Help They Need.{" "}
                <span className="text-red-400">Right Now.</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                Join thousands of volunteers and donors saving lives during
                Bangladesh's toughest moments:
              </p>

              {/* CTA Buttons with increased gap */}
              <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
                <a
                  href="#donate"
                  className="inline-flex items-center justify-center rounded-lg bg-red-600 text-white px-8 py-4 font-bold text-lg hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-red-600/30">
                  Donate Now
                </a>
                <a
                  href="#volunteer"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-red-600 px-8 py-4 font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-black/10">
                  Become a Volunteer
                </a>
              </div>
            </div>
          </div>

          {/* Stats + Countdown at Bottom Center with increased gap */}
          <div className="relative z-10 w-full max-w-4xl px-4 pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
              <div className="rounded-xl bg-white/15 backdrop-blur-md p-5 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1.5 shadow-lg hover:shadow-white/10 border border-white/10">
                <div className="text-2xl font-bold text-white">👥 2,300+</div>
                <p className="text-sm text-gray-200 mt-1">Volunteers</p>
              </div>
              <div className="rounded-xl bg-white/15 backdrop-blur-md p-5 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1.5 shadow-lg hover:shadow-white/10 border border-white/10">
                <div className="text-2xl font-bold text-white">💰 ৳12M+</div>
                <p className="text-sm text-gray-200 mt-1">Raised</p>
              </div>
              <div className="rounded-xl bg-white/15 backdrop-blur-md p-5 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1.5 shadow-lg hover:shadow-white/10 border border-white/10">
                <div className="text-2xl font-bold text-white">📍 120+</div>
                <p className="text-sm text-gray-200 mt-1">Crises Managed</p>
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-6 text-center bg-red-900/70 py-3 px-4 rounded-lg backdrop-blur-sm border border-red-800/50">
              <span className="text-orange-300 font-semibold text-sm sm:text-base">
                🌪 Cyclone Relief Fund closes in:{" "}
                <span className="font-bold">02d 14h 35m</span>
              </span>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
}
