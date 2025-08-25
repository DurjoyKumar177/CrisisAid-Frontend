const steps = [
  {
    title: "Identify a Crisis",
    desc: "Find where help is needed most from verified posts.",
    icon: "🔎",
  },
  {
    title: "Contribute / Volunteer",
    desc: "Donate funds or sign up to help — securely and instantly.",
    icon: "🤝",
  },
  {
    title: "Track Progress",
    desc: "See exactly how your support changes lives in real-time.",
    icon: "📈",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-bold !text-blue-300">How It Works</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <div className="text-4xl">{s.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
