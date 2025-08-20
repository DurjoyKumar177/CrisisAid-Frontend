export default function Footer() {
  return (
    <footer className="bg-[#003049] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-red-500 grid place-content-center font-bold">CA</div>
            <span className="text-lg font-bold">CrisisAid</span>
          </div>
          <p className="mt-3 text-sm text-gray-200/90">
            A transparent, real-time platform to coordinate relief and empower communities across Bangladesh.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-200/90">
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#privacy" className="hover:underline">Privacy</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Stay Connected</h4>
          <form className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="Email for updates"
              className="w-full rounded-lg px-3 py-2 text-gray-900"
            />
            <button className="rounded-lg bg-red-500 px-4 py-2 font-semibold hover:bg-red-600">
              Subscribe
            </button>
          </form>
          <div className="mt-4 flex gap-4 text-white/80">
            <a href="#" aria-label="Facebook"></a>
            <a href="#" aria-label="Twitter"></a>
            <a href="#" aria-label="Instagram"></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-white/80">
        Built with ❤️ for Bangladesh • React + Vite + Tailwind
      </div>
    </footer>
  );
}
