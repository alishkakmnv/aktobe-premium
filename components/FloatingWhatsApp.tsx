"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { GENERAL_ENQUIRY, bookingUrl } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Плавающая кнопка заявки.
 *
 * Появляется только после первого экрана: в hero уже есть та же кнопка, и
 * дублировать её поверх самой себя незачем. Оформление сдержанное, без
 * кислотно-зелёного пузыря и без пульсации, которая тянет внимание на себя
 * всё время чтения.
 */
export function FloatingWhatsApp() {
  const [pastHero, setPastHero] = useState(false);
  const [atContacts, setAtContacts] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () =>
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // У секции контактов уже есть та же кнопка прямо на экране, а плавающая к
  // тому же перекрывает подвал. Пока контакты видны, убираем её.
  useEffect(() => {
    const contacts = document.getElementById("contacts");
    if (!contacts) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAtContacts(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(contacts);
    return () => observer.disconnect();
  }, []);

  const shown = pastHero && !atContacts;

  return (
    <AnimatePresence>
      {shown && (
        <motion.a
          href={bookingUrl(GENERAL_ENQUIRY)}
          target="_blank"
          rel="noopener noreferrer"
          initial={
            reduced ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" }
          }
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={{
            opacity: 0,
            transition: { duration: reduced ? 0.12 : 0.2, ease: EASE },
          }}
          transition={{ duration: reduced ? 0.15 : 0.4, ease: EASE }}
          className="fixed bottom-6 right-6 z-[200] inline-flex h-14 items-center gap-2.5 rounded-md border border-line bg-surface/95 px-5 font-display text-sm text-ink shadow-none backdrop-blur-md transition-colors duration-200 hover:border-acc-pale sm:bottom-8 sm:right-8"
        >
          <MessageCircle
            size={17}
            strokeWidth={1.75}
            className="text-acc-pale"
            aria-hidden
          />
          <span className="hidden sm:inline">Написать в WhatsApp</span>
          <span className="sr-only sm:hidden">Написать в WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
