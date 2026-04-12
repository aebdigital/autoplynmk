import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov – Autoplyn MK",
  description: "Zásady ochrany osobných údajov spoločnosti Autoplyn MK s.r.o.",
};

export default function GdprPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-8">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-5xl font-black uppercase italic mb-2"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Ochrana osobných údajov
          </h1>
          <div className="w-16 h-1 bg-[#08a800] mb-10" />

          {/* Company info */}
          <div className="mb-10 text-gray-700 space-y-1">
            <p className="font-semibold">Autoplyn MK s.r.o.</p>
            <p>Nová Ľubovňa 95, 065 11 Nová Ľubovňa</p>
            <p>IČO: 52426238, DIČ: 2121029735</p>
            <p>E-mail: <a href="mailto:info@autoplynmk.sk" className="text-[#08a800] hover:underline">info@autoplynmk.sk</a></p>
            <p>Tel.: <a href="tel:0907321693" className="text-[#08a800] hover:underline">0907 321 693</a></p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-10">
            Tieto Zásady ochrany osobných údajov (ďalej len „Zásady") popisujú, aké osobné údaje
            spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.
          </p>

          <hr className="border-gray-200 mb-10" />

          {/* Section I */}
          <section className="mb-10">
            <h2
              className="text-2xl font-black uppercase italic mb-4"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              I. Kontaktný formulár
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Na stránke www.autoplynmk.sk prevádzkujeme kontaktný formulár, ktorého účelom je
              umožniť vám:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
              <li>Položiť otázku k našim produktom a službám</li>
              <li>Požiadať o cenovú ponuku</li>
            </ul>

            <p className="font-semibold text-gray-800 mb-1">Rozsah spracúvaných údajov:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
              <li>Meno a priezvisko</li>
              <li>E-mailová adresa</li>
              <li>Telefónne číslo</li>
            </ul>

            <p className="font-semibold text-gray-800 mb-1">Účel spracovania:</p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.
            </p>

            <p className="font-semibold text-gray-800 mb-1">Právny základ:</p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť
              dotknutej osoby.
            </p>

            <p className="font-semibold text-gray-800 mb-1">Doba uchovávania:</p>
            <p className="text-gray-600 leading-relaxed">
              Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ
              nevznikne ďalší zmluvný vzťah.
            </p>
          </section>

          <hr className="border-gray-200 mb-10" />

          {/* Section II */}
          <section className="mb-10">
            <h2
              className="text-2xl font-black uppercase italic mb-4"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              II. Súbory cookies
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Na našej webovej stránke používame cookies výlučne na nasledujúce účely:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>
                <span className="font-semibold">Nevyhnutné cookies</span> – zabezpečujú základnú
                funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).
              </li>
              <li>
                <span className="font-semibold">Štatistické (analytické) cookies</span> – pomáhajú
                nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom
                používateľa).
              </li>
            </ul>

            <p className="font-semibold text-gray-800 mb-1">Správa súhlasov:</p>
            <p className="text-gray-600 leading-relaxed">
              Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies
              prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.
            </p>
          </section>

          <hr className="border-gray-200 mb-10" />

          {/* Section III */}
          <section className="mb-10">
            <h2
              className="text-2xl font-black uppercase italic mb-4"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              III. Práva dotknutej osoby
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Podľa nariadenia GDPR máte nasledujúce práva:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Prístup k osobným údajom, ktoré spracúvame</li>
              <li>Oprava nepresných alebo neúplných údajov</li>
              <li>
                Vymazanie („právo zabudnutia"), ak na spracovanie už nie je právny základ
              </li>
              <li>Obmedzenie spracovania</li>
              <li>Prenosnosť údajov</li>
              <li>Odvolanie súhlasu – stane sa účinným dňom odvolania</li>
              <li>
                Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07
                Bratislava,{" "}
                <a
                  href="https://www.dataprotection.gov.sk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#08a800] hover:underline"
                >
                  www.dataprotection.gov.sk
                </a>
                )
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na{" "}
              <a href="mailto:info@autoplynmk.sk" className="text-[#08a800] hover:underline">
                info@autoplynmk.sk
              </a>{" "}
              alebo telefónnom čísle{" "}
              <a href="tel:0907321693" className="text-[#08a800] hover:underline">
                0907 321 693
              </a>
              .
            </p>
          </section>

          <hr className="border-gray-200 mb-8" />

          <p className="text-gray-400 text-sm">
            Tieto Zásady nadobúdajú účinnosť dňom 10. 6. 2025.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
