const Hero = () => {
  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center items-center text-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-white max-w-3xl px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Be the Help They Need. Right Now.
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Join thousands of volunteers and donors saving lives during Bangladesh’s toughest moments.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-700">
            Donate Now
          </button>
          <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600">
            Become a Volunteer
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-8 text-sm">
          <div>👥 <strong>2,300+</strong> Volunteers</div>
          <div>💰 <strong>৳12M+</strong> Raised</div>
          <div>📍 <strong>120+</strong> Crises Managed</div>
        </div>

        <div className="mt-6 text-yellow-400 font-semibold">
          🌪 Cyclone Relief Fund closes in: <span>02d 14h 35m</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
