import { useEffect, useState } from "react";
import bannerImage from "../../assets/Banner_1.png";
import { getCrisisPosts } from "../../services/crisisService";
import api from "../../services/api";

export default function Hero() {
  const [stats, setStats] = useState({
    volunteers: 2300,
    fundsRaised: 12000000,
    crisesManaged: 120,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const crises = await getCrisisPosts();
      const crisisCount = crises.filter((c) => c.status === "approved").length;

      // Donations
      let totalFunds = 0;
      try {
        const donationPromises = crises.slice(0, 10).map(async (crisis) => {
          try {
            const response = await api.get(
              `/api/donations/crisis/${crisis.id}/summary/`
            );
            return parseFloat(response.data.total_money || 0);
          } catch {
            return 0;
          }
        });
        const amounts = await Promise.all(donationPromises);
        totalFunds = amounts.reduce((sum, amt) => sum + amt, 0);
      } catch {}

      // Volunteers
      let volunteerCount = 2300;
      try {
        const response = await api.get("/api/volunteers/my-applications/");
        volunteerCount =
          response.data.length > 100 ? response.data.length : 2300;
      } catch {}

      setStats({
        volunteers: volunteerCount,
        fundsRaised: totalFunds > 0 ? totalFunds : 12000000,
        crisesManaged: crisisCount > 0 ? crisisCount : 120,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `৳${(amount / 1000).toFixed(1)}K`;
    return `৳${amount}`;
  };

  return (
    <section
      id="home"
      className="relative bg-cover bg-center flex flex-col min-h-screen"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Overlay for better text readability on mobile (hidden on md+) */}
      <div className="absolute inset-0 bg-black/40 md:hidden"></div>

      {/* Desktop Layout (unchanged) */}
      <div className="hidden md:flex">
        <div className="w-3/5">
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

              <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
                <a
                  href="/crisis"
                  className="inline-flex items-center justify-center rounded-lg bg-red-600 text-white px-8 py-4 font-bold text-lg hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-red-600/30"
                >
                  Donate Now
                </a>

                <a
                  href="/crisis"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-red-600 px-8 py-4 font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-black/10"
                >
                  Become a Volunteer
                </a>
              </div>
            </div>
          </div>

          {/* Stats Section - Desktop */}
          <div className="relative z-10 w-full max-w-4xl px-4 pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
              <div className="rounded-xl bg-white/15 backdrop-blur-md p-5 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1.5 shadow-lg hover:shadow-white/10 border border-white/10">
                <div className="text-2xl font-bold text-white">
                  💥 {stats.volunteers.toLocaleString()}+
                </div>
                <p className="text-sm text-gray-200 mt-1">Volunteers</p>
              </div>

              <div className="rounded-xl bg-white/15 backdrop-blur-md p-5 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1.5 shadow-lg hover:shadow-white/10 border border-white/10">
                <div className="text-2xl font-bold text-white">
                  💰 {formatCurrency(stats.fundsRaised)}+
                </div>
                <p className="text-sm text-gray-200 mt-1">Raised</p>
              </div>

              <div className="rounded-xl bg-white/15 backdrop-blur-md p-5 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1.5 shadow-lg hover:shadow-white/10 border border-white/10">
                <div className="text-2xl font-bold text-white">
                  📢 {stats.crisesManaged}+
                </div>
                <p className="text-sm text-gray-200 mt-1">Crises Managed</p>
              </div>
            </div>

            {/* Countdown - Desktop */}
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

      {/* Mobile Layout (new responsive design) */}
      <div className="md:hidden relative z-10 flex flex-col justify-between min-h-screen pt-20 pb-6 px-4">
        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white drop-shadow-lg">
            Be the Help <br />They Need.{" "}
            <span className="text-red-400">Right Now.</span>
          </h1>

          <p className="mt-4 text-base text-gray-100 max-w-md drop-shadow-md">
            Join thousands of volunteers and donors saving lives during
            Bangladesh's toughest moments
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 w-full max-w-sm space-y-3">
            <a
              href="/crisis"
              className="block w-full rounded-xl bg-red-600 text-white px-6 py-3.5 font-bold text-base hover:bg-red-700 transition-all duration-300 shadow-xl shadow-red-600/40"
            >
              Donate Now
            </a>

            <a
              href="/crisis"
              className="block w-full rounded-xl bg-white text-red-600 px-6 py-3.5 font-bold text-base hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              Become a Volunteer
            </a>
          </div>
        </div>

        {/* Stats Section - Mobile (Compact) */}
        <div className="mt-auto">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="rounded-xl bg-white/20 backdrop-blur-md p-3 border border-white/20 shadow-lg">
              <div className="text-xl font-bold text-white">
                💥 {(stats.volunteers / 1000).toFixed(1)}K+
              </div>
              <p className="text-xs text-gray-100 mt-0.5">Volunteers</p>
            </div>

            <div className="rounded-xl bg-white/20 backdrop-blur-md p-3 border border-white/20 shadow-lg">
              <div className="text-xl font-bold text-white">
                💰 {formatCurrency(stats.fundsRaised)}+
              </div>
              <p className="text-xs text-gray-100 mt-0.5">Raised</p>
            </div>

            <div className="rounded-xl bg-white/20 backdrop-blur-md p-3 border border-white/20 shadow-lg">
              <div className="text-xl font-bold text-white">
                📢 {stats.crisesManaged}+
              </div>
              <p className="text-xs text-gray-100 mt-0.5">Crises</p>
            </div>
          </div>

          {/* Countdown - Mobile */}
          <div className="bg-red-900/80 py-3 px-4 rounded-xl backdrop-blur-sm border border-red-800/50 shadow-lg">
            <div className="flex items-center justify-center gap-2">
              <span className="text-orange-300 font-semibold text-sm">
                🌪 Relief Fund closes:
              </span>
              <span className="text-white font-bold text-sm">02d 14h 35m</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}