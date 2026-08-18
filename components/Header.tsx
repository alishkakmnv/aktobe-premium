"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE, GENERAL_ENQUIRY, bookingUrl } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Порог небольшой: хедер должен залиться сразу, как только под ним пошёл контент.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Блокировка прокрутки под открытым меню + Esc + удержание фокуса внутри панели.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <a
        href="#fleet"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-md focus:bg-acc focus:px-5 focus:py-3 focus:text-ink"
      >
        Перейти к автопарку
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ease-out-quint ${
          scrolled
            ? "border-b border-line bg-bg/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-6">
          <a
            href="#top"
            // -my-3 py-3 расширяет тач-цель до 44px по высоте, не меняя вёрстку.
            className="-my-3 py-3 font-display text-[0.95rem] font-medium tracking-[-0.01em] whitespace-nowrap text-ink"
          >
            {SITE.name}
          </a>

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative py-2 text-sm text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-acc-pale transition-transform duration-200 ease-out-quint group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Видимость через обёртку: класс display на самой кнопке конфликтовал
                бы с inline-flex из её базового стиля. */}
            <div className="hidden sm:block">
              <ButtonLink
                href={bookingUrl(GENERAL_ENQUIRY)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3"
              >
                Забронировать
              </ButtonLink>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Открыть меню"
              className="grid h-11 w-11 place-items-center rounded-md border border-line text-ink transition-colors duration-200 hover:border-acc-pale lg:hidden"
            >
              <Menu size={18} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={
              reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }
            }
            // Выход быстрее входа: решение уже принято, ответ должен быть мгновенным.
            // Длительность задана на самом exit — снаружи её пришлось бы вычислять
            // по open, а уходящий элемент получает пропсы того рендера, где open ещё true.
            exit={{
              ...(reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }),
              transition: { duration: reduced ? 0.12 : 0.3, ease: EASE },
            }}
            transition={{ duration: reduced ? 0.15 : 0.5, ease: EASE }}
            className="fixed inset-0 z-[310] flex flex-col bg-bg lg:hidden"
          >
            <div className="container-page flex h-[72px] shrink-0 items-center justify-between">
              <span className="font-display text-[0.95rem] font-medium text-ink">
                {SITE.name}
              </span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label="Закрыть меню"
                className="grid h-11 w-11 place-items-center rounded-md border border-line text-ink transition-colors duration-200 hover:border-acc-pale"
              >
                <X size={18} strokeWidth={1.75} aria-hidden />
              </button>
            </div>

            <nav
              aria-label="Мобильная навигация"
              className="container-page flex flex-1 flex-col justify-center"
            >
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    // Полная строка transform вместо шортката y: шорткаты Framer
                    // считаются на главном потоке и роняют кадры под нагрузкой.
                    initial={
                      reduced
                        ? false
                        : { opacity: 0, transform: "translateY(18px)" }
                    }
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{
                      delay: reduced ? 0 : 0.16 + i * 0.06,
                      duration: 0.5,
                      ease: EASE,
                    }}
                    className="border-b border-line"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-5 font-display text-2xl text-ink"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <ButtonLink
                href={bookingUrl(GENERAL_ENQUIRY)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-10 w-full"
              >
                Написать в WhatsApp
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
