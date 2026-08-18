import { MessageCircle, Phone, MapPin, Clock } from "lucide-react";
import { CONTACT, GENERAL_ENQUIRY, SITE, bookingUrl } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";

export function Contacts() {
  return (
    <section id="contacts" className="section-y border-t border-line">
      <div className="container-page">
        {/* Крупная заливка acc-deep: это плоскость, а не контрол, поэтому
            низкий контраст к фону здесь работает на глубину, а не мешает. */}
        <div className="reveal bg-acc-deep px-[clamp(1.5rem,5vw,4.5rem)] py-[clamp(3rem,7vw,5.5rem)]">
          <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,3rem)] font-medium leading-[1.04] tracking-[-0.025em]">
            Готовы к выезду?
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.65] text-ink/80">
            Напишите в WhatsApp: подберём машину под событие и число гостей,
            назовём полную стоимость и подадим авто с водителем к нужному часу.
          </p>
          <ButtonLink
            href={bookingUrl(GENERAL_ENQUIRY)}
            target="_blank"
            rel="noopener noreferrer"
            variant="onAccent"
            className="mt-10"
          >
            <MessageCircle size={16} strokeWidth={1.75} aria-hidden />
            Написать в WhatsApp
          </ButtonLink>
        </div>

        {/* Три колонки, а не четыре: Instagram у клиента нет, пустую плитку
            под него держать незачем. */}
        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <li className="reveal">
            <h3 className="flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
              <Phone size={13} strokeWidth={1.75} aria-hidden />
              Телефон
            </h3>
            <a
              href={CONTACT.phoneHref}
              className="tnum mt-3 inline-block font-display text-[1.0625rem] text-ink transition-colors duration-200 hover:text-acc-pale"
            >
              {CONTACT.phoneDisplay}
            </a>
          </li>

          <li className="reveal reveal-step-1">
            <h3 className="flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
              <MapPin size={13} strokeWidth={1.75} aria-hidden />
              Адрес
            </h3>
            <p className="mt-3 font-display text-[1.0625rem] text-ink">
              {CONTACT.address}
            </p>
          </li>

          <li className="reveal reveal-step-2">
            <h3 className="flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
              <Clock size={13} strokeWidth={1.75} aria-hidden />
              Часы работы
            </h3>
            <p className="mt-3 font-display text-[1.0625rem] text-ink">
              {CONTACT.hours}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-[0.95rem] font-medium text-ink">
          {SITE.name}
        </span>
        <span className="text-sm text-muted">© 2026 {SITE.name}</span>
      </div>
    </footer>
  );
}
