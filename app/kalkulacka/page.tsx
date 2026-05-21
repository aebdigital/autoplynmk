import type { Metadata } from "next";
import KalkulackaClient from "./KalkulackaClient";

export const metadata: Metadata = {
  title: "Kalkulačka návratnosti LPG prestavby | Autoplyn MK",
  description:
    "Vypočítajte si orientačnú návratnosť investície do montáže LPG systému KME vo vašom vozidle. Zistite mesačnú a ročnú úsporu, cenu na 100 km a dobu návratnosti.",
  keywords: ["LPG kalkulačka", "návratnosť LPG", "úspora na palive", "prestavba na LPG", "Autoplyn MK", "Nová Ľubovňa"],
  openGraph: {
    title: "Kalkulačka návratnosti LPG prestavby | Autoplyn MK",
    description:
      "Vypočítajte si orientačnú návratnosť investície do montáže LPG systému KME vo vašom vozidle.",
    url: "https://www.autoplynmk.sk/kalkulacka",
    siteName: "Autoplyn MK",
    locale: "sk_SK",
    type: "website",
  },
};

export default function KalkulackaPage() {
  return <KalkulackaClient />;
}
