import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/90 backdrop-blur-sm">
      <Link href="/">
        <Image
          src="/uploads/2024/09/IMG_9163-removebg-preview.png"
          alt="Autoplyn MK"
          width={200}
          height={43}
          className="h-10 w-auto"
          priority
        />
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <Link href="/#sluzby" className="text-white font-semibold uppercase text-sm tracking-wider hover:text-[#08a800] transition-colors">Služby</Link>
        <Link href="/#o-nas" className="text-white font-semibold uppercase text-sm tracking-wider hover:text-[#08a800] transition-colors">O nás</Link>
        <Link href="/#galeria" className="text-white font-semibold uppercase text-sm tracking-wider hover:text-[#08a800] transition-colors">Galéria</Link>
      </div>
      <a
        href="tel:0907321693"
        className="hidden md:block bg-[#08a800] text-white font-bold px-5 py-2 hover:bg-green-700 transition-colors text-sm tracking-wide"
      >
        0907 321 693
      </a>
    </nav>
  );
}
