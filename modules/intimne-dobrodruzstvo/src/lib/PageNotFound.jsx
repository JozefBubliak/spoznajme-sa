import { Link, useLocation } from 'react-router-dom';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1) || '/';

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #12050b 0%, #351225 44%, #10212a 100%)' }}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/12 bg-white/[0.07] p-7 text-center shadow-2xl backdrop-blur-xl">
        <p className="text-6xl font-light text-[#e8b06f]/60">404</p>
        <h1
          className="mt-5 text-3xl font-bold text-[#f5dde3]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Stránka neexistuje
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#c9a0aa]">
          Adresa „{pageName}“ v tomto súkromnom priestore nie je dostupná.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center rounded-2xl bg-[#e8b06f] px-5 text-sm font-semibold text-[#1a0710] transition hover:bg-[#f0c28a]"
        >
          Späť na úvod
        </Link>
      </div>
    </div>
  );
}
