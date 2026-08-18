"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_PHOTO, CAR_COUNT, MIN_PRICE, amountLabel } from "@/data/cars";
import { CONTACT, GENERAL_ENQUIRY, SITE, bookingUrl } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!photoRef.current || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Параллакс: кадр отстаёт от страницы. Двигаем только transform,
    // масштаб задан заранее, чтобы снизу не открылся край изображения.
    const ctx = gsap.context(() => {
      gsap.to(photoRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* bg-surface под кадром: на медленной сети до загрузки фото экран
          остаётся тёмно-серым, а не проваливается в чёрное. */}
      <div
        ref={photoRef}
        className="absolute inset-0 -bottom-[14%] bg-surface will-change-transform"
      >
        <Image
          src={HERO_PHOTO.src}
          alt={HERO_PHOTO.alt}
          fill
          // priority объявлен устаревшим в Next 16. Для LCP-кадра документация
          // предписывает связку loading="eager" + fetchPriority="high".
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          style={{ filter: "saturate(0.5) brightness(0.72)" }}
        />
      </div>

      {/* Затемнение под текст. Функциональное, не декоративное:
          без него светлый текст не проходит по контрасту на светлых участках кадра. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(100deg,#0b0c0b_0%,#0b0c0bee_34%,#0b0c0b66_62%,#0b0c0b26_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,#0b0c0b_4%,transparent_100%)]"
      />
      {/* Верхнее затемнение — под навигацию. Светлый потолок паркинга приходится
          ровно на правую часть хедера, без него ссылки не проходят по контрасту. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(to_bottom,#0b0c0be6_0%,#0b0c0b80_45%,transparent_100%)]"
      />

      <div className="container-page relative pb-[clamp(3rem,7vw,6rem)] pt-[9rem]">
        <div className="max-w-[46rem]">
          <p
            className="rise text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-acc-pale"
            style={{ "--d": "0.05s" } as React.CSSProperties}
          >
            Аренда с водителем · {CONTACT.city}
          </p>

          <h1
            className="rise mt-6 text-[clamp(2rem,4.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            style={{ "--d": "0.14s" } as React.CSSProperties}
          >
            {/* Перенос через блочный span, а не <br>: с <br> строки заголовка
                склеиваются в «с водителемв Актобе» при чтении вслух. */}
            Премиум-авто с водителем{" "}
            <span className="block">
              в {CONTACT.city} — от{" "}
              <span className="tnum">
                {amountLabel(MIN_PRICE, SITE.currency, SITE.unit)}
              </span>
            </span>
          </h1>

          <p
            className="rise mt-8 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-muted"
            style={{ "--d": "0.26s" } as React.CSSProperties}
          >
            Свадьбы, трансферы, встречи гостей, деловые поездки и
            VIP-сопровождение. Внедорожники, седан и микроавтобусы с водителем,
            подача круглосуточно. Стоимость называем до выезда.
          </p>

          <div
            className="rise mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ "--d": "0.38s" } as React.CSSProperties}
          >
            <ButtonLink href="#fleet">
              Смотреть автопарк
              <ArrowDown size={16} strokeWidth={1.75} aria-hidden />
            </ButtonLink>
            <ButtonLink
              href={bookingUrl(GENERAL_ENQUIRY)}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <MessageCircle size={16} strokeWidth={1.75} aria-hidden />
              Написать в WhatsApp
            </ButtonLink>
          </div>

          {/* Не плитки с крупными числами, а одна строка фактов:
              шаблон hero-метрик — жанровый штамп, он под запретом. */}
          <ul
            className="rise mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted"
            style={{ "--d": "0.5s" } as React.CSSProperties}
          >
            <li className="whitespace-nowrap">
              <span className="tnum text-ink">{CAR_COUNT}</span> автомобилей
            </li>
            <li aria-hidden className="text-line">
              ·
            </li>
            {/* Число классов ручное: русские числительные из length не собрать */}
            <li className="whitespace-nowrap">четыре класса</li>
            <li aria-hidden className="text-line">
              ·
            </li>
            <li className="whitespace-nowrap">
              подача <span className="text-ink">{CONTACT.hours}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
