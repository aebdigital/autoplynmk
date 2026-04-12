"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div>
          <Image
            src="/uploads/2024/09/IMG_9163-removebg-preview.png"
            alt="Autoplyn MK"
            width={200}
            height={43}
            className="h-10 w-auto"
          />
        </div>
        <div>
          <h4
            className="font-bold uppercase italic mb-4 text-sm tracking-wider"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Navigácia
          </h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="/#sluzby" className="hover:text-[#08a800] transition-colors">Služby</Link></li>
            <li><Link href="/#o-nas" className="hover:text-[#08a800] transition-colors">O nás</Link></li>
            <li><Link href="/#galeria" className="hover:text-[#08a800] transition-colors">Galéria</Link></li>
          </ul>
        </div>
        <div className="text-gray-400 text-sm space-y-2">
          <Link href="/ochrana-osobnych-udajov" className="block hover:text-white transition-colors">
            Ochrana osobných údajov
          </Link>
          <button
            onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
            className="block hover:text-white transition-colors cursor-pointer focus:outline-none"
          >
            Cookies
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-white/10 text-center text-gray-600 text-xs">
        © {new Date().getFullYear()} Autoplyn MK s.r.o. Všetky práva vyhradené.
      </div>
    </footer>
  );
}
