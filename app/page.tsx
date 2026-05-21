import Image from "next/image";
import Link from "next/link";
import ContactForm from "./components/ContactForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";

const galleryImages = [
  "446990146_949074346960237_8410255066470914201_n-1024x768.jpg",
  "472233987_1090532099481127_7081232028345984493_n-1024x473.jpg",
  "1655734405583-1024x473.jpg",
  "447028598_949071596960512_2147862644278183572_n-1024x768.jpg",
  "1644689556978-1024x473.jpg",
  "447010757_949079853626353_338407881830078932_n-1024x768.jpg",
  "1621497536643-1024x576.jpg",
  "1705420342943-1024x768.jpg",
  "1621497536635-1024x576.jpg",
];

const serviceCards = [
  {
    img: "1705420342943-1024x768.jpg",
    label: "Servis a diagnostika",
    text: "Poskytujeme všetky bežné servisné úkony vrátane diagnostiky pre LPG vozidlá.",
  },
  {
    img: "447010757_949079853626353_338407881830078932_n-1024x768.jpg",
    label: "Montáž",
    text: "Špecializujeme sa na montáž LPG systémov značky KME, čím vám pomáhame znížiť náklady na palivo a prispieť k ekologickejšej prevádzke.",
  },
  {
    img: "KONTROLA-1024x820.jpg",
    label: "Kontrola emisií",
    text: "Zabezpečujeme odbornú kontrolu emisií pre vozidlá na LPG aj benzín, aby sme zaručili ich súlad s platnými ekologickými normami.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-2">
      <div className="h-0.5 w-12 bg-[#08a800]" />
      <span
        className="text-[#08a800] text-xl uppercase italic font-black tracking-wide"
        style={{ fontFamily: "var(--font-barlow)" }}
      >
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-5xl md:text-6xl font-black uppercase italic mb-10 leading-tight"
      style={{ fontFamily: "var(--font-barlow)" }}
    >
      {children}
    </h2>
  );
}

function CtaButton({
  href,
  children,
  variant = "green",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "green" | "outline";
}) {
  const base =
    "inline-block font-black text-lg uppercase italic px-8 py-3 transition-colors shadow-md";
  const styles =
    variant === "green"
      ? "bg-[#08a800] text-white hover:bg-green-700"
      : "border-2 border-black text-black hover:bg-black hover:text-white";
  return (
    <a
      href={href}
      className={`${base} ${styles}`}
      style={{ fontFamily: "var(--font-barlow)" }}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />

      {/* ── HERO (sticky, parallax bg) ── */}
      <HeroSection>
        <div className="px-8 md:px-20 pt-20 max-w-4xl">
          <SectionLabel>Autoservis</SectionLabel>
          <h1
            className="text-5xl md:text-7xl font-black uppercase italic leading-tight text-white mb-4 max-w-2xl"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            LPG servis na ktorý sa dá spoľahnúť
          </h1>
          <p className="text-white/75 text-lg mb-8">
            Zaoberáme sa prestavbou vozidiel na LPG vrátane kompletného servisu a poradenstva.
          </p>
          <CtaButton href="#sluzby">Dohodnúť termín</CtaButton>
        </div>
      </HeroSection>

      {/* Everything below slides OVER the sticky hero */}
      <div className="relative z-10">

      {/* ── SERVICES ── */}
      <section id="sluzby" className="py-24 px-8 bg-white rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.25)]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Služby</SectionLabel>
          <SectionHeading>Naše Služby</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {serviceCards.map(({ img, label, text }) => (
              <div
                key={label}
                className="relative overflow-hidden shadow-md hover:shadow-2xl transition-shadow cursor-pointer group"
                style={{ height: "40vh", borderRadius: "10px" }}
              >
                <div
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('/uploads/2025/01/${img}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3
                    className="text-3xl font-black text-white uppercase italic mb-2"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {label}
                  </h3>
                  <p className="text-white/80 text-sm leading-snug">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <CtaButton href="#kontakt">Dohodnúť termín</CtaButton>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="preco-my" className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          {/* Parallelogram image */}
          <div className="w-full md:w-1/2 relative" style={{ height: "480px" }}>
            <div
              className="absolute bg-[#08a800]"
              style={{
                clipPath: "polygon(0% 0%, 85% 0%, 100% 100%, 15% 100%)",
                width: "52%",
                height: "52%",
                bottom: "-8%",
                left: "-1%",
                zIndex: 1,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url('/uploads/2025/01/423006512_879604463907226_5141533172808493750_n.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                clipPath: "polygon(0% 0%, 85% 0%, 100% 100%, 15% 100%)",
              }}
            />
          </div>
          {/* Content */}
          <div className="w-full md:w-1/2">
            <SectionLabel>Prečo práve my?</SectionLabel>
            <SectionHeading>V Čom sme iní?</SectionHeading>
            <p className="text-gray-600 leading-relaxed mb-8">
              Sme jedným z mála LPG servisov na Slovensku, ktorý vám dokáže ponúknuť kompletné
              služby vrátane profesionálnej montáže, spoľahlivého servisu a odborného poradenstva.
              Naša práca je založená na kvalite a individuálnom prístupe k zákazníkovi, čím vám
              zabezpečujeme maximálnu spokojnosť a bezpečnosť na cestách.
            </p>
            <div className="flex gap-12 mb-10">
              <div>
                <div
                  className="text-6xl font-black text-[#08a800]"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  300
                </div>
                <div
                  className="font-bold uppercase italic text-sm mt-1"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  spokojných zákazníkov
                </div>
              </div>
              <div>
                <div
                  className="text-6xl font-black text-[#08a800]"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  20
                </div>
                <div
                  className="font-bold uppercase italic text-sm mt-1"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  rokov skúseností
                </div>
              </div>
            </div>
            <CtaButton href="#kontakt">Dohodnúť termín</CtaButton>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="o-nas"
        className="py-24 px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          {/* Parallelogram image */}
          <div className="w-full md:w-1/2 relative" style={{ height: "480px" }}>
            <div
              className="absolute bg-[#08a800]"
              style={{
                clipPath: "polygon(0% 0%, 85% 0%, 100% 100%, 15% 100%)",
                width: "52%",
                height: "52%",
                bottom: "-8%",
                left: "-1%",
                zIndex: 1,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/uploads/2025/01/1633702400226-576x1024.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                clipPath: "polygon(0% 0%, 85% 0%, 100% 100%, 15% 100%)",
              }}
            />
          </div>
          {/* Content */}
          <div className="w-full md:w-1/2">
            <SectionLabel>O nás</SectionLabel>
            <SectionHeading>O našom lpg servise</SectionHeading>
            <p className="text-gray-600 leading-relaxed mb-4">
              V našom autoservise sa špecializujeme na údržbu a servis vozidiel poháňaných LPG.
              Ponúkame profesionálnu montáž LPG systémov, pričom sa zameriavame hlavne na osvedčenú
              značku KME. Naši skúsení technici však poskytujú servis a diagnostiku aj pre iné
              značky a typy LPG systémov, aby sme zabezpečili, že vaše vozidlo bude vždy v
              najlepšej kondícii.
            </p>
            <p className="text-gray-600 leading-relaxed mb-10">
              Sme tu preto, aby sme vám poskytli odborné poradenstvo a služby na najvyššej úrovni,
              čím prispievame k vašej bezpečnej a ekonomickej jazde. Vaša spokojnosť a dôvera sú
              pre nás prvoradé, a preto sa neustále snažíme zlepšovať naše služby a prispôsobiť sa
              potrebám našich zákazníkov.
            </p>
            <CtaButton href="#kontakt" variant="outline">
              Dohodnúť termín
            </CtaButton>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="galeria" className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Galéria</SectionLabel>
          <SectionHeading>Naša práca</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                style={{
                  height: "25vh",
                  backgroundImage: `url('/uploads/2025/01/${img}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="kontakt" className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Kontakt</SectionLabel>
          <SectionHeading>Objednať termín</SectionHeading>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <div>
              <h3
                className="text-2xl font-bold uppercase italic mb-6"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Autoplyn MK s.r.o.
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Nová Ľubovňa 95</p>
                <p>065 11 Nová Ľubovňa</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@autoplynmk.sk"
                    className="text-[#08a800] hover:underline"
                  >
                    info@autoplynmk.sk
                  </a>
                </p>
                <p>
                  Mobil:{" "}
                  <a href="tel:0907321693" className="text-[#08a800] hover:underline">
                    0907 321 693
                  </a>
                </p>
              </div>
              <p className="text-gray-400 text-sm mt-6">
                IČO: 52426238 &nbsp;|&nbsp; DIČ: 2121029735
              </p>
            </div>
            {/* Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
      </div> {/* end slide-over wrapper */}

      {/* Floating Calculator Action Button */}
      <Link
        href="/kalkulacka"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#08a800] text-white font-bold uppercase italic px-5 py-3.5 rounded-full shadow-[0_8px_30px_rgba(8,168,0,0.4)] hover:bg-[#15803d] hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        style={{ fontFamily: "var(--font-barlow)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="18" />
          <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
        </svg>
        <span>Kalkulačka návratnosti</span>
      </Link>
    </div>
  );
}
