"use client";

import { useEffect, useRef } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STEPS } from "@/data/conditions";
import { GENERAL_ENQUIRY, bookingUrl } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Четыре шага оформления.
 *
 * Нумерация здесь заслуженная: это настоящая последовательность, порядок несёт
 * смысл. По той же причине нумерация не появляется больше нигде на странице.
 *
 * Линия прогресса заполняется по мере скролла. Она чисто декоративная, поэтому
 * её можно вешать на JS: без него шаги остаются полностью читаемыми.
 */
export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current || !lineRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            end: "bottom 72%",
            scrub: 0.4,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="section-y border-t border-line"
    >
      <div className="container-page">
        <h2 className="reveal max-w-[18ch] text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.06] tracking-[-0.02em]">
          Как это работает
        </h2>

        <div className="relative mt-16">
          <span
            aria-hidden
            className="absolute inset-x-0 top-[7px] hidden h-px bg-line lg:block"
          />
          <span
            ref={lineRef}
            aria-hidden
            className="absolute inset-x-0 top-[7px] hidden h-px origin-left bg-acc-pale lg:block"
          />

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <li
                key={step.n}
                className={`reveal ${i > 0 ? `reveal-step-${Math.min(i, 3)}` : ""}`}
              >
                <span
                  aria-hidden
                  className="hidden h-[15px] w-[15px] rounded-full border border-acc-pale bg-bg lg:block"
                />
                <p className="tnum mt-6 font-display text-sm text-acc-pale lg:mt-8">
                  {step.n}
                </p>
                <h3 className="mt-3 text-[1.0625rem] font-medium tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-sm leading-[1.65] text-muted">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Шаг 04 «В путь» — эмоциональный пик страницы. Раньше он упирался
            в заголовок следующей секции, и импульс не собирался. */}
        <div className="reveal mt-16 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#fleet">
            <ArrowUp size={16} strokeWidth={1.75} aria-hidden />
            Выбрать автомобиль
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
      </div>
    </section>
  );
}
