import type { Metadata, Viewport } from "next";
import { Unbounded, Golos_Text } from "next/font/google";
import { CONTACT, SITE } from "@/data/site";
import { OG_IMAGE, MIN_PRICE } from "@/data/cars";
import "./globals.css";

/* Дисплейный. Кириллица родная (Cyreal), поэтому subsets включает cyrillic —
   без него русские заголовки уехали бы в системный фолбэк. */
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  // Боевой адрес деплоя. От него строятся абсолютные ссылки на OG-картинку,
  // иначе превью при отправке ссылки в мессенджер приходит без изображения.
  // ЗАМЕНИТЬ, когда у клиента появится собственный домен.
  metadataBase: new URL("https://aktobe-rent.vercel.app"),
  title: {
    default: `Премиум-авто с водителем в ${CONTACT.city} | ${SITE.name}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    `Аренда премиум-авто с водителем в ${CONTACT.city} от ${MIN_PRICE.toLocaleString("ru-RU")} ${SITE.currency}/${SITE.unit}. ` +
    "Land Cruiser 200, LX570, Prado, Camry, Hiace, Sprinter. Свадьбы, трансферы, " +
    "деловые поездки и VIP-сопровождение. Подача круглосуточно, заказ в WhatsApp.",
  applicationName: SITE.name,
  keywords: [
    "аренда авто с водителем",
    `аренда авто ${CONTACT.city}`,
    "авто на свадьбу Актобе",
    "трансфер Актобе",
    "Land Cruiser 200 с водителем",
    SITE.name,
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.name,
    title: `Премиум-авто с водителем в ${CONTACT.city} | ${SITE.name}`,
    description: `Внедорожники, седан и микроавтобусы с водителем от ${MIN_PRICE.toLocaleString("ru-RU")} ${SITE.currency}/${SITE.unit}. Свадьбы, трансферы, VIP-сопровождение. Подача круглосуточно.`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Премиум-авто с водителем в ${CONTACT.city} | ${SITE.name}`,
    description: `Внедорожники, седан и микроавтобусы с водителем от ${MIN_PRICE.toLocaleString("ru-RU")} ${SITE.currency}/${SITE.unit}. Свадьбы, трансферы, VIP-сопровождение. Подача круглосуточно.`,
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${golos.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
