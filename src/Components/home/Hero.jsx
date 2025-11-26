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
      className="relative bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="flex">
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

              {/* FIXED BUTTONS */}
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

          {/* Stats Section */}
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
