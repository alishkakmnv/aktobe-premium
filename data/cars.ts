/**
 * РЕАЛЬНЫЙ ФЛОТ КЛИЕНТА — 6 машин, Актобе, аренда С ВОДИТЕЛЕМ.
 *
 * Фото: 10 кадров клиента, разложены по папкам /public/cars/<id>/NN.jpg.
 * Карточка использует лучший экстерьерный кадр (01); остальные лежат рядом
 * под будущую галерею/модалку.
 *
 * Что подтверждено фотографиями: модель, кузов, цвет (весь флот белый).
 * Что подтверждено клиентом: цены за час, вместимость, классы.
 * Mercedes Sprinter: фото ещё нет, в карточке стоит помеченная заглушка.
 */

export type CarClassId = "suv" | "sedan" | "minivan" | "bus";

export interface CarClass {
  id: CarClassId;
  label: string;
  /** Одна строка о том, кому этот класс. Снимает вопрос «а мне какой?». */
  blurb: string;
}

/** Классы пересобраны под премиум-флот: эконома в нём нет. */
export const CAR_CLASSES: CarClass[] = [
  {
    id: "suv",
    label: "Внедорожник",
    blurb: "Свадьбы, VIP-сопровождение, встречи",
  },
  { id: "sedan", label: "Седан", blurb: "Деловые поездки и трансферы" },
  { id: "minivan", label: "Минивэн", blurb: "Группа до 14 человек с багажом" },
  {
    id: "bus",
    label: "Микроавтобус",
    blurb: "Большая группа, корпоратив, межгород",
  },
];

export interface Car {
  id: string;
  /** Марка и модель одной строкой, как показывается на карточке. */
  name: string;
  class: CarClassId;
  photo: string;
  /** Осмысленное описание кадра, не «машина». */
  alt: string;
  transmission: "Автомат" | "Механика";
  drive: "Передний" | "Задний" | "Полный";
  /** Строкой, а не числом: у минивэна и микроавтобуса вместимость — диапазон. */
  seats: string;
  /** Тариф за час, подтверждён клиентом. */
  pricePerHour: number;
  /** Цвет подтверждён фотографиями. */
  color: string;
  /** true → в карточке стоит заглушка вместо снимка машины. */
  photoPending?: true;
}

const photo = (id: string, n: string) => `/cars/${id}/${n}.jpg`;

export const CARS: Car[] = [
  // ---- Внедорожники ----------------------------------------------------
  {
    id: "land-cruiser-200",
    name: "Toyota Land Cruiser 200",
    class: "suv",
    photo: photo("land-cruiser-200", "01"),
    alt: "Белый Toyota Land Cruiser 200 у входа в ресторан под навесом, солнечный день",
    transmission: "Автомат",
    drive: "Полный",
    seats: "5",
    pricePerHour: 10000,
    color: "Белый",
  },
  {
    id: "lexus-lx570",
    name: "Lexus LX570",
    class: "suv",
    photo: photo("lexus-lx570", "01"),
    alt: "Белый Lexus LX570 на брусчатке у делового центра в солнечный день",
    transmission: "Автомат",
    drive: "Полный",
    seats: "5",
    pricePerHour: 10000,
    color: "Белый",
  },
  {
    id: "prado",
    name: "Toyota Land Cruiser Prado",
    class: "suv",
    photo: photo("prado", "01"),
    alt: "Белый Toyota Land Cruiser Prado у кирпичного дома в пасмурный день",
    transmission: "Автомат",
    drive: "Полный",
    seats: "5",
    pricePerHour: 10000,
    color: "Белый",
  },

  // ---- Седан -----------------------------------------------------------
  {
    id: "camry",
    name: "Toyota Camry",
    class: "sedan",
    photo: photo("camry", "01"),
    alt: "Белая Toyota Camry на тёмных дисках у частного дома",
    transmission: "Автомат",
    drive: "Передний",
    seats: "5",
    pricePerHour: 8000,
    color: "Белый",
  },

  // ---- Минивэн ---------------------------------------------------------
  {
    id: "hiace",
    name: "Toyota Hiace",
    class: "minivan",
    photo: photo("hiace", "01"),
    alt: "Белый минивэн Toyota Hiace с длинной базой на парковке во дворе",
    transmission: "Автомат",
    // Hiace нового поколения — заднеприводный, подтверждается кадром 01.
    drive: "Задний",
    seats: "8–14",
    pricePerHour: 10000,
    color: "Белый",
  },

  // ---- Микроавтобус ----------------------------------------------------
  {
    id: "sprinter",
    name: "Mercedes Sprinter",
    class: "bus",
    photo: photo("sprinter", "01"),
    alt: "Место под фото Mercedes Sprinter: снимок готовится",
    transmission: "Автомат",
    drive: "Задний",
    seats: "16–19",
    pricePerHour: 10000,
    color: "Белый",
    photoPending: true,
  },
];

/**
 * Кадр для hero: Land Cruiser 200 в три четверти на солнце. Взят кадр 02, а не
 * 01: hero режется по object-cover, и на широком экране от портретного 01
 * остаётся средняя полоса с навесом, без самой машины. В 02 машина стоит ровно
 * посередине кадра и переживает любой кроп — и 390px, и 1440px.
 */
export const HERO_PHOTO = {
  src: photo("land-cruiser-200", "02"),
  alt: "Белый Toyota Land Cruiser 200 в три четверти на солнце",
};

/** Тот же кадр под превью в мессенджерах. */
export const OG_IMAGE = {
  url: photo("land-cruiser-200", "01"),
  width: 960,
  height: 1280,
  alt: HERO_PHOTO.alt,
};

export const CAR_COUNT = CARS.length;

/** Нижняя граница прайса. Считается из флота, чтобы hero не расходился с карточками. */
export const MIN_PRICE = Math.min(...CARS.map((car) => car.pricePerHour));

/** Цена к показу: «10 000 ₸/час». */
export function priceLabel(car: Car, currency: string, unit: string): string {
  return `${car.pricePerHour.toLocaleString("ru-RU")} ${currency}/${unit}`;
}

/** Та же запись для произвольной суммы — hero и CTA берут её отсюда. */
export function amountLabel(
  amount: number,
  currency: string,
  unit: string,
): string {
  return `${amount.toLocaleString("ru-RU")} ${currency}/${unit}`;
}
