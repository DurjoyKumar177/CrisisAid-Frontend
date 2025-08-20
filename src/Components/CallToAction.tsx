export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-red-600 to-orange-500 py-14 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <h3 className="text-2xl font-extrabold">
            Your Help Today Saves Lives Tomorrow
          </h3>
          <div className="flex gap-3">
            <a
              href="#donate"
              className="rounded-lg bg-white px-5 py-3 font-semibold text-red-700 hover:bg-gray-100"
            >
              Donate Now
            </a>
            <a
              href="#volunteer"
              className="rounded-lg border border-white px-5 py-3 font-semibold hover:bg-white hover:text-red-700"
            >
              Join as Volunteer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
