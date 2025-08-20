import { useEffect, useRef, useState } from "react";
import { useInView } from "../utils/useInView";

type Metric = { label: string; value: number; icon: string; suffix?: string };

const metrics: Metric[] = [
  { label: "People Rescued", value: 18420, icon: "🛶" },
  { label: "Shelters Opened", value: 312, icon: "🏚" },
  { label: "Meals Distributed", value: 540000, icon: "🍲" },
  { label: "Litres of Water", value: 1200000, icon: "💧", suffix: "L" },
];

function Counter({ target, inView, suffix = "" }: { target: number; inView: boolean; suffix?: string }) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(Math.floor(p * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [inView, target]);

  const fmt = new Intl.NumberFormat().format(val);
  return <span>{fmt}{suffix}</span>;
}

export default function ImpactMetrics() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      className="relative py-20"
      style={{ backgroundImage: "url('/hero.jpg')"}}
    >
      <div className="absolute inset-0 bg-fixed bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-white/70" />
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-bold">Our Impact</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-2xl bg-white p-6 text-center shadow">
              <div className="text-4xl">{m.icon}</div>
              <div className="mt-3 text-3xl font-extrabold text-red-600">
                <Counter target={m.value} suffix={m.suffix} inView={inView} />
              </div>
              <p className="mt-1 text-gray-600">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
