"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

export default function KalkulackaClient() {
  const [cenaPrestavby, setCenaPrestavby] = useState(1200);
  const [cenaBenzinu, setCenaBenzinu] = useState(1.55);
  const [cenaLPG, setCenaLPG] = useState(0.65);
  const [spotrebaBenzinu, setSpotrebaBenzinu] = useState(7.5);
  const [mesacnyNajazd, setMesacnyNajazd] = useState(1500);

  // Autoplyn MK calculates with ~20% higher consumption
  const LPG_CONSUMPTION_FACTOR = 1.2;

  // Calculations
  const results = useMemo(() => {
    const spotrebaLPG = spotrebaBenzinu * LPG_CONSUMPTION_FACTOR;

    const naklady100kmBenzin = (spotrebaBenzinu / 100) * cenaBenzinu * 100;
    const naklady100kmLPG = (spotrebaLPG / 100) * cenaLPG * 100;

    const naklady1kmBenzin = (spotrebaBenzinu / 100) * cenaBenzinu;
    const naklady1kmLPG = (spotrebaLPG / 100) * cenaLPG;

    const uspora100km = naklady100kmBenzin - naklady100kmLPG;
    const uspora1km = naklady1kmBenzin - naklady1kmLPG;

    const mesacneNakladyBenzin = (mesacnyNajazd / 100) * naklady100kmBenzin;
    const mesacneNakladyLPG = (mesacnyNajazd / 100) * naklady100kmLPG;

    const mesacnaUspora = mesacneNakladyBenzin - mesacneNakladyLPG;
    const rocnaUspora = mesacnaUspora * 12;

    const navratnostMesiace = mesacnaUspora > 0 ? cenaPrestavby / mesacnaUspora : Infinity;
    const navratnostKm = uspora1km > 0 ? cenaPrestavby / uspora1km : Infinity;

    const rocneNakladyBenzin = mesacneNakladyBenzin * 12;
    const rocneNakladyLPG = mesacneNakladyLPG * 12;

    const percentualnaUspora =
      naklady100kmBenzin > 0
        ? ((naklady100kmBenzin - naklady100kmLPG) / naklady100kmBenzin) * 100
        : 0;

    return {
      spotrebaLPG,
      naklady100kmBenzin,
      naklady100kmLPG,
      uspora100km,
      mesacneNakladyBenzin,
      mesacneNakladyLPG,
      mesacnaUspora,
      rocnaUspora,
      navratnostMesiace,
      navratnostKm,
      rocneNakladyBenzin,
      rocneNakladyLPG,
      percentualnaUspora,
    };
  }, [cenaPrestavby, cenaBenzinu, cenaLPG, spotrebaBenzinu, mesacnyNajazd]);

  const formatEuro = useCallback((value: number) => {
    return new Intl.NumberFormat("sk-SK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }, []);

  const formatNumber = useCallback((value: number, decimals = 0) => {
    return new Intl.NumberFormat("sk-SK", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }, []);

  const timelineData = useMemo(() => {
    const years = [1, 2, 3, 5];
    return years.map((y) => ({
      year: y,
      label: y === 1 ? "1 rok" : y < 5 ? `${y} roky` : `${y} rokov`,
      benzin: results.rocneNakladyBenzin * y,
      lpg: results.rocneNakladyLPG * y + cenaPrestavby,
    }));
  }, [results, cenaPrestavby]);

  const maxTimelineValue = useMemo(() => {
    return Math.max(...timelineData.map((d) => Math.max(d.benzin, d.lpg)), 1);
  }, [timelineData]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative text-center pt-32 pb-24 px-6 md:px-12 bg-black text-white overflow-hidden flex flex-col items-center justify-center">
        {/* Radial highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,168,0,0.15)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-0.5 w-12 bg-[#08a800]" />
            <span
              className="text-[#08a800] text-xl uppercase italic font-black tracking-wide"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Kalkulačka návratnosti
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-black uppercase italic mb-6 leading-tight"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Zistite, koľko ušetríte prestavbou na LPG
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl leading-relaxed">
            Vypočítajte si orientačnú návratnosť investície do montáže LPG systému KME. Stačí zadať údaje o vašej spotrebe a nájazde.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 -mt-8 pt-16 pb-24 px-6 md:px-12 bg-white rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.25)] w-full">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Input Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="mb-8 pb-4 border-b-2 border-gray-100">
                <h3
                  className="font-black uppercase italic text-2xl text-black"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  Vstupné parametre
                </h3>
                <p className="text-gray-500 text-sm mt-1">Prispôsobte údaje vášmu vozidlu</p>
              </div>

              {/* Cena prestavby */}
              <div className="mb-6">
                <label className="flex items-center justify-between text-sm font-semibold text-black mb-2" htmlFor="cena-prestavby">
                  Cena prestavby na LPG
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">€</span>
                </label>
                <div className="relative">
                  <input
                    id="cena-prestavby"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl text-black font-semibold text-lg focus:outline-none focus:bg-white focus:border-[#08a800] focus:ring-4 focus:ring-[#08a800]/10 transition-all duration-150"
                    type="number"
                    value={cenaPrestavby}
                    onChange={(e) => setCenaPrestavby(Number(e.target.value) || 0)}
                    min="0"
                    step="50"
                  />
                </div>
                <input
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4 accent-[#08a800]"
                  type="range"
                  min="500"
                  max="3500"
                  step="50"
                  value={cenaPrestavby}
                  onChange={(e) => setCenaPrestavby(Number(e.target.value))}
                />
                <div className="flex justify-between text-xs text-gray-400 font-medium mt-1">
                  <span>500 €</span>
                  <span>3 500 €</span>
                </div>
              </div>

              {/* Cena benzínu */}
              <div className="mb-6">
                <label className="flex items-center justify-between text-sm font-semibold text-black mb-2" htmlFor="cena-benzinu">
                  Cena benzínu
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">€ / liter</span>
                </label>
                <div className="relative">
                  <input
                    id="cena-benzinu"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl text-black font-semibold text-lg focus:outline-none focus:bg-white focus:border-[#08a800] focus:ring-4 focus:ring-[#08a800]/10 transition-all duration-150"
                    type="number"
                    value={cenaBenzinu}
                    onChange={(e) => setCenaBenzinu(Number(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <input
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4 accent-[#08a800]"
                  type="range"
                  min="1.00"
                  max="2.50"
                  step="0.01"
                  value={cenaBenzinu}
                  onChange={(e) => setCenaBenzinu(Number(e.target.value))}
                />
                <div className="flex justify-between text-xs text-gray-400 font-medium mt-1">
                  <span>1,00 €</span>
                  <span>2,50 €</span>
                </div>
              </div>

              {/* Cena LPG */}
              <div className="mb-6">
                <label className="flex items-center justify-between text-sm font-semibold text-black mb-2" htmlFor="cena-lpg">
                  Cena LPG
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">€ / liter</span>
                </label>
                <div className="relative">
                  <input
                    id="cena-lpg"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl text-black font-semibold text-lg focus:outline-none focus:bg-white focus:border-[#08a800] focus:ring-4 focus:ring-[#08a800]/10 transition-all duration-150"
                    type="number"
                    value={cenaLPG}
                    onChange={(e) => setCenaLPG(Number(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <input
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4 accent-[#08a800]"
                  type="range"
                  min="0.30"
                  max="1.20"
                  step="0.01"
                  value={cenaLPG}
                  onChange={(e) => setCenaLPG(Number(e.target.value))}
                />
                <div className="flex justify-between text-xs text-gray-400 font-medium mt-1">
                  <span>0,30 €</span>
                  <span>1,20 €</span>
                </div>
              </div>

              {/* Spotreba benzínu */}
              <div className="mb-6">
                <label className="flex items-center justify-between text-sm font-semibold text-black mb-2" htmlFor="spotreba-benzinu">
                  Priemerná spotreba benzínu
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">l / 100 km</span>
                </label>
                <div className="relative">
                  <input
                    id="spotreba-benzinu"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl text-black font-semibold text-lg focus:outline-none focus:bg-white focus:border-[#08a800] focus:ring-4 focus:ring-[#08a800]/10 transition-all duration-150"
                    type="number"
                    value={spotrebaBenzinu}
                    onChange={(e) => setSpotrebaBenzinu(Number(e.target.value) || 0)}
                    min="0"
                    step="0.1"
                  />
                </div>
                <input
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4 accent-[#08a800]"
                  type="range"
                  min="3"
                  max="20"
                  step="0.1"
                  value={spotrebaBenzinu}
                  onChange={(e) => setSpotrebaBenzinu(Number(e.target.value))}
                />
                <div className="flex justify-between text-xs text-gray-400 font-medium mt-1">
                  <span>3 l</span>
                  <span>20 l</span>
                </div>
              </div>

              {/* Spotreba LPG (Read-only, +20%) */}
              <div className="mb-6">
                <label className="flex items-center justify-between text-sm font-semibold text-black mb-2" htmlFor="spotreba-lpg">
                  Vypočítaná spotreba LPG (+20%)
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">l / 100 km</span>
                </label>
                <div className="relative">
                  <input
                    id="spotreba-lpg"
                    className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-500 font-semibold text-lg cursor-not-allowed"
                    type="text"
                    value={formatNumber(results.spotrebaLPG, 1)}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              {/* Mesačný nájazd */}
              <div>
                <label className="flex items-center justify-between text-sm font-semibold text-black mb-2" htmlFor="mesacny-najazd">
                  Mesačný nájazd
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">km / mesiac</span>
                </label>
                <div className="relative">
                  <input
                    id="mesacny-najazd"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl text-black font-semibold text-lg focus:outline-none focus:bg-white focus:border-[#08a800] focus:ring-4 focus:ring-[#08a800]/10 transition-all duration-150"
                    type="number"
                    value={mesacnyNajazd}
                    onChange={(e) => setMesacnyNajazd(Number(e.target.value) || 0)}
                    min="0"
                    step="100"
                  />
                </div>
                <input
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4 accent-[#08a800]"
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={mesacnyNajazd}
                  onChange={(e) => setMesacnyNajazd(Number(e.target.value))}
                />
                <div className="flex justify-between text-xs text-gray-400 font-medium mt-1">
                  <span>100 km</span>
                  <span>5 000 km</span>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:sticky lg:top-24 flex flex-col gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="mb-8 pb-4 border-b-2 border-gray-100">
                  <h3
                    className="font-black uppercase italic text-2xl text-black"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    Vaša úspora
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">Vypočítané údaje s LPG</p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-l-4 border-l-gray-300">
                    <span className="text-sm font-semibold text-gray-700">Cena za 100 km na benzín</span>
                    <span className="text-lg font-bold text-black">{formatEuro(results.naklady100kmBenzin)} €</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-l-4 border-l-[#08a800]">
                    <span className="text-sm font-semibold text-gray-700">Cena za 100 km na LPG</span>
                    <span className="text-lg font-bold text-[#08a800]">
                      {formatEuro(results.naklady100kmLPG)} €
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-l-4 border-l-[#08a800]">
                    <span className="text-sm font-semibold text-gray-700">Čistá úspora na 100 km</span>
                    <span className="text-lg font-bold text-[#08a800]">
                      {formatEuro(results.uspora100km)} €
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-l-4 border-l-[#08a800]">
                    <span className="text-sm font-semibold text-gray-700">Mesačná úspora</span>
                    <span className="text-lg font-bold text-[#08a800]">
                      {formatEuro(results.mesacnaUspora)} €
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-l-4 border-l-[#08a800]">
                    <span className="text-sm font-semibold text-gray-700">Ročná úspora</span>
                    <span className="text-lg font-bold text-[#08a800]">
                      {formatEuro(results.rocnaUspora)} €
                    </span>
                  </div>
                </div>

                {/* Highlight - návratnosť */}
                <div className="mt-8 p-6 bg-[#08a800] rounded-2xl text-center text-white shadow-[0_10px_25px_rgba(8,168,0,0.3)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full translate-x-12 -translate-y-12" />
                  <div
                    className="font-black uppercase italic text-lg mb-2 tracking-wider"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    Návratnosť investície
                  </div>
                  <div
                    className="text-5xl md:text-6xl font-black italic"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {results.navratnostMesiace === Infinity
                      ? "∞"
                      : formatNumber(results.navratnostMesiace, 1)}
                  </div>
                  <div className="text-sm font-semibold mt-1 opacity-90">
                    {results.navratnostMesiace === Infinity
                      ? ""
                      : results.navratnostMesiace <= 1
                      ? "MESIAC"
                      : results.navratnostMesiace < 5
                      ? "MESIACE"
                      : "MESIACOV"}
                  </div>
                  <div className="mt-4 text-xs opacity-90">
                    (po najazdení {results.navratnostKm === Infinity ? "∞" : formatNumber(results.navratnostKm)} km)
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Monthly Comparison */}
          <section className="mt-20">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-0.5 w-12 bg-[#08a800]" />
                <span
                  className="text-[#08a800] text-xl uppercase italic font-black tracking-wide"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  Porovnanie nákladov
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-black uppercase italic leading-tight"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Benzín verzus Autoplyn
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 border-t-4 border-t-red-500 transition-all duration-300">
                <div
                  className="font-black uppercase italic text-lg mb-2 text-gray-700"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  Benzín ročne
                </div>
                <div
                  className="text-4xl font-black italic mb-2 text-red-500"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {formatEuro(results.rocneNakladyBenzin)} €
                </div>
                <div className="text-xs text-gray-500 font-semibold">
                  {formatEuro(results.mesacneNakladyBenzin)} € mesačne
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 border-t-4 border-t-green-500 transition-all duration-300">
                <div
                  className="font-black uppercase italic text-lg mb-2 text-gray-700"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  LPG ročne
                </div>
                <div
                  className="text-4xl font-black italic mb-2 text-green-600"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {formatEuro(results.rocneNakladyLPG)} €
                </div>
                <div className="text-xs text-gray-500 font-semibold">
                  {formatEuro(results.mesacneNakladyLPG)} € mesačne
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 border-t-4 border-t-[#08a800] transition-all duration-300">
                <div
                  className="font-black uppercase italic text-lg mb-2 text-gray-700"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  Celková úspora
                </div>
                <div
                  className="text-4xl font-black italic mb-2 text-[#08a800]"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {formatNumber(results.percentualnaUspora, 0)} %
                </div>
                <div className="text-xs text-gray-500 font-semibold">
                  nižšie náklady oproti benzínu
                </div>
              </div>
            </div>
          </section>

          {/* Timeline - Cumulative costs over years */}
          <section className="mt-20">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-md">
              <div className="mb-8 pb-4 border-b-2 border-gray-100">
                <h3
                  className="font-black uppercase italic text-2xl text-black"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  Z dlhodobého hľadiska
                </h3>
                <p className="text-gray-500 text-sm mt-1">Kumulatívne náklady (vrátane počiatočnej investície do prestavby)</p>
              </div>

              <div className="flex flex-col gap-6 mt-8">
                {timelineData.map((item) => (
                  <div key={item.year} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                    <div
                      className="font-black uppercase italic text-lg text-black mb-4"
                      style={{ fontFamily: "var(--font-barlow)" }}
                    >
                      Po {item.label}
                    </div>
                    <div className="grid grid-cols-[80px_1fr_100px] items-center gap-4 mb-2">
                      <div className="text-xs text-gray-500 font-semibold">Benzín</div>
                      <div className="h-6 bg-gray-100 rounded overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded transition-all duration-1000 ease-out"
                          style={{ width: `${(item.benzin / maxTimelineValue) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm font-bold text-right text-red-500">
                        {formatEuro(item.benzin)} €
                      </div>
                    </div>
                    <div className="grid grid-cols-[80px_1fr_100px] items-center gap-4">
                      <div className="text-xs text-gray-500 font-semibold">LPG</div>
                      <div className="h-6 bg-gray-100 rounded overflow-hidden">
                        <div
                          className="h-full bg-green-600 rounded transition-all duration-1000 ease-out"
                          style={{ width: `${(item.lpg / maxTimelineValue) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm font-bold text-right text-green-600">
                        {formatEuro(item.lpg)} €
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-50 border-l-4 border-l-[#08a800] rounded-r-lg text-gray-600 text-sm leading-relaxed">
                <strong>Upozornenie:</strong> Výpočty sú orientačné a slúžia na základné porovnanie nákladov. 
                V kalkulácii pre LPG je zahrnutá počiatočná investícia vo výške <strong>{formatEuro(cenaPrestavby)} €</strong> a 
                zvýšená spotreba LPG o <strong>20 %</strong> voči benzínu.
              </div>
            </div>
          </section>

          {/* Call to action */}
          <div className="mt-16 text-center">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center bg-[#08a800] text-white font-black uppercase italic text-lg px-10 py-4 rounded shadow-[0_4px_14px_rgba(8,168,0,0.3)] hover:bg-green-700 hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border-none"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Mám záujem o montáž
            </a>
          </div>

        </div>
      </main>

      {/* ── CONTACT ── */}
      <section id="kontakt" className="py-24 px-8 bg-white border-t border-gray-150 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-0.5 w-12 bg-[#08a800]" />
            <span
              className="text-[#08a800] text-xl uppercase italic font-black tracking-wide"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Kontakt
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black uppercase italic mb-10 leading-tight"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Objednať termín
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <div>
              <h3
                className="text-2xl font-bold uppercase italic mb-6 text-black"
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
    </div>
  );
}
