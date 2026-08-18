"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CARS,
  CAR_CLASSES,
  CAR_COUNT,
  priceLabel,
  type CarClassId,
} from "@/data/cars";
import { SITE, bookingUrl, carEnquiry } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

type Filter = CarClassId | "all";

export function Fleet() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();

  const visible = useMemo(
    () => (filter === "all" ? CARS : CARS.filter((c) => c.class === filter)),
    [filter],
  );

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: "Все" },
    ...CAR_CLASSES.map((c) => ({ id: c.id as Filter, label: c.label })),
  ];

  return (
    <section id="fleet" className="section-y">
      <div className="container-page">
        <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[16ch] text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.06] tracking-[-0.02em]">
            Автопарк
          </h2>
          <p className="max-w-[38ch] text-muted">
            <span className="tnum text-ink">{CAR_COUNT}</span> автомобилей в
            четырёх классах: внедорожники, седан, минивэн и микроавтобус. Все —
            с водителем, тариф почасовой.
          </p>
        </div>

        <div
          role="group"
          aria-label="Фильтр по классу автомобиля"
          className="reveal mt-12 flex flex-wrap gap-2"
        >
          {tabs.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                aria-pressed={active}
                className={`rounded-md border px-5 py-3 text-sm transition-[background-color,border-color,color] duration-200 ease-out-quint ${
                  active
                    ? "border-acc bg-acc text-ink"
                    : "border-line text-muted hover:border-acc-pale hover:text-ink"
                }`}
              >
                {tab.label}
                {/* Активность помечена не только заливкой: цвет не может быть
                    единственным носителем смысла. */}
                {active && <span className="sr-only"> (выбрано)</span>}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-6 text-sm text-muted">
          Показано <span className="tnum text-ink">{visible.length}</span> из{" "}
          <span className="tnum">{CAR_COUNT}</span>
        </p>

        <motion.ul
          layout={!reduced}
          className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-6 gap-y-12"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((car) => {
              const klass = CAR_CLASSES.find((c) => c.id === car.class);
              return (
                <motion.li
                  key={car.id}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-surface">
                    <Image
                      src={car.photo}
                      alt={car.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className="object-cover transition-[filter,transform] duration-500 ease-out-quint
                                 [filter:saturate(0.4)_brightness(0.78)]
                                 group-hover:[filter:saturate(1)_brightness(1)]
                                 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-4 top-4 rounded-sm border border-acc-pale/35 bg-bg/70 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-acc-pale backdrop-blur-sm">
                      {klass?.label}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[1.0625rem] font-medium tracking-[-0.01em]">
                    {car.name}
                  </h3>
                  {/* Линия под названием: та самая line-reveal на наведение.
                      Характеристики при этом видны всегда — прятать их за hover
                      значило бы скрыть их от тач-устройств. */}
                  <span
                    aria-hidden
                    className="mt-2 block h-px w-full origin-left scale-x-0 bg-acc-pale transition-transform duration-500 ease-out-quint group-hover:scale-x-100"
                  />

                  <dl className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
                    <div className="flex gap-1.5">
                      <dt className="sr-only">Цвет</dt>
                      <dd>{car.color}</dd>
                    </div>
                    <span aria-hidden className="text-line">
                      ·
                    </span>
                    <div className="flex gap-1.5">
                      <dt className="sr-only">Коробка передач</dt>
                      <dd>{car.transmission}</dd>
                    </div>
                    <span aria-hidden className="text-line">
                      ·
                    </span>
                    <div className="flex gap-1.5">
                      <dt className="sr-only">Привод</dt>
                      <dd>{car.drive}</dd>
                    </div>
                    <span aria-hidden className="text-line">
                      ·
                    </span>
                    <div className="flex gap-1.5">
                      <dt className="sr-only">Мест</dt>
                      <dd>{car.seats} мест</dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
                    <span className="tnum text-[0.9375rem] text-ink">
                      {priceLabel(car, SITE.currency, SITE.unit)}
                    </span>
                    <a
                      href={bookingUrl(carEnquiry(car.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-sm text-acc-pale transition-colors duration-200 hover:text-ink"
                    >
                      Забронировать
                      {/* Марка уходит в sr-only: на экране она уже над кнопкой,
                          а скринридеру ссылка должна быть понятна вне контекста. */}
                      <span className="sr-only"> {car.name} в WhatsApp</span>
                    </a>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
