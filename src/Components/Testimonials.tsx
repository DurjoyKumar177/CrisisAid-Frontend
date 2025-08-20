import { useEffect, useState } from "react";

type T = { quote: string; name: string; role: string; avatar?: string };

const items: T[] = [
  { quote: "CrisisAid gave me the tools to help my own community after floods.", name: "Rahim", role: "Volunteer, Sunamganj" },
  { quote: "Donation tracking is transparent — I know where my money goes.", name: "Ayesha", role: "Donor, Dhaka" },
  { quote: "We received food and medicine in time. Thank you.", name: "Shorna", role: "Survivor, Kurigram" },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, []);

  const t = items[i];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold">Stories from the Ground</h2>
        <div className="relative mt-8 rounded-2xl border bg-gray-50 p-8 shadow">
          <p className="text-lg italic text-gray-700">“{t.quote}”</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <img
              src={t.avatar || "/avatar.webp"}
              alt={t.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="text-sm text-gray-600">
              <div className="font-semibold">{t.name}</div>
              <div>{t.role}</div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full ${idx === i ? "bg-red-600" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
