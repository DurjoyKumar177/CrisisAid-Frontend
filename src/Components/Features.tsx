const features = [
  {
    title: "Fund Posting & Transparency",
    desc: "Itemized expenses, withdrawal logs, and open reporting for full donor trust.",
    icon: "📑",
  },
  {
    title: "Volunteer Tracking",
    desc: "Skill & location matching, task assignment, and field-update permissions.",
    icon: "📍",
  },
  {
    title: "Real-Time Crisis Updates",
    desc: "API-driven dashboards for weather, alerts, and on-ground reports.",
    icon: "⚡",
  },
  {
    title: "Donation History & Wallet",
    desc: "Instant wallet top-ups, receipts, and a clear donation timeline.",
    icon: "👛",
  },
  {
    title: "Shelter Finder (Future)",
    desc: "Map-based nearest shelter discovery with live capacity.",
    icon: "🧭",
  },
  {
    title: "Secure & Scalable",
    desc: "JWT & OAuth, DRF backend, Dockerized, cloud hosted.",
    icon: "🛡️",
  },
];

export default function Features() {
  return (
    <section id="about" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold">Why CrisisAid?</h2>
            <p className="mt-3 text-gray-600">
              A unified platform that coordinates relief, increases transparency, and speeds response —
              built for Bangladesh’s realities.
            </p>
            <img
              src="/placeholder.webp"
              alt="App preview"
              className="mt-6 rounded-2xl border shadow-sm"
            />
          </div>

          <ul className="grid sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <li key={f.title} className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-gray-600">{f.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
