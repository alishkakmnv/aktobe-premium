import { CarFront, FileText, Timer, Headset, Plus } from "lucide-react";
import { FAQ, REASONS, type Reason } from "@/data/conditions";
import { GENERAL_ENQUIRY, bookingUrl } from "@/data/site";

const ICONS: Record<Reason["icon"], typeof CarFront> = {
  "car-front": CarFront,
  "file-text": FileText,
  timer: Timer,
  headset: Headset,
};

/**
 * Последний слой скепсиса перед контактами.
 *
 * Причины намеренно не в карточках и без крупных иконок над заголовками: это
 * два самых узнаваемых признака шаблона. Иконка идёт в строку с заголовком и
 * работает меткой, а не украшением.
 *
 * FAQ построен на нативных <details>: раскрытие, клавиатура и семантика
 * достаются бесплатно и работают без JS.
 */
export function Trust() {
  return (
    <section className="section-y border-t border-line">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="reveal max-w-[16ch] text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.06] tracking-[-0.02em]">
            Почему нам можно доверить поездку
          </h2>

          <ul className="mt-12 flex flex-col">
            {REASONS.map((reason, i) => {
              const Icon = ICONS[reason.icon];
              return (
                <li
                  key={reason.title}
                  className={`reveal border-t border-line py-7 first:border-t-0 first:pt-0 ${
                    i > 0 ? `reveal-step-${Math.min(i, 3)}` : ""
                  }`}
                >
                  <h3 className="flex items-center gap-3 text-[1.0625rem] font-medium tracking-[-0.01em]">
                    <Icon
                      size={17}
                      strokeWidth={1.75}
                      className="shrink-0 text-acc-pale"
                      aria-hidden
                    />
                    {reason.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-sm leading-[1.65] text-muted">
                    {reason.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="reveal text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
            Частые вопросы
          </h3>

          <div className="mt-8">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="reveal group border-b border-line first:border-t first:border-line"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[1.0625rem] font-medium tracking-[-0.01em] transition-colors duration-200 hover:text-acc-pale [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden
                    className="mt-1 shrink-0 text-acc-pale transition-transform duration-300 ease-out-quint group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-[56ch] pb-7 text-sm leading-[1.7] text-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          {/* Сомневающийся здесь ближе всего к диалогу — секция не должна
              обрываться в тупик. */}
          <p className="reveal mt-8 text-sm text-muted">
            Не нашли свой вопрос:{" "}
            <a
              href={bookingUrl(GENERAL_ENQUIRY)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-acc-pale transition-colors duration-200 hover:text-ink"
            >
              спросите в WhatsApp
            </a>
            , отвечаем круглосуточно
          </p>
        </div>
      </div>
    </section>
  );
}
