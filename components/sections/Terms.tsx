import { CONDITIONS, DEPOSIT_FREE } from "@/data/conditions";
import { bookingUrl } from "@/data/site";

/**
 * Условия аренды.
 *
 * Намеренно не карточки: карточная сетка уже отработала в каталоге, повтор того
 * же приёма превратил бы страницу в ленту одинаковых плиток. Здесь разделение
 * держат линии сетки, а вес несёт крупное значение.
 */
export function Terms() {
  return (
    <section id="terms" className="section-y border-t border-line">
      <div className="container-page">
        <div className="reveal grid gap-5 md:grid-cols-12 md:items-end">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.06] tracking-[-0.02em] md:col-span-5">
            Условия аренды
          </h2>
          <p className="text-muted md:col-span-6 md:col-start-7">
            Всё, что обычно выясняется по телефону, написано здесь: сколько
            минимум, куда подаём, чем платить. Стоимость поездки называем до
            выезда и в дороге не меняем.
          </p>
        </div>

        {DEPOSIT_FREE && (
          // Ключевой блок доверия. Включён флагом: в аренде с водителем залога
          // нет по самой схеме, машина всё время у нашего водителя.
          <p className="reveal mt-14 bg-acc-deep px-8 py-10 text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.02em] font-display">
            Без залога. Ни денег, ни документов в залог — за рулём наш водитель.
          </p>
        )}

        <dl className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {CONDITIONS.map((item) => (
            <div key={item.label} className="reveal bg-bg p-8">
              <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                {item.label}
              </dt>
              <dd>
                <p className="tnum mt-4 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-none tracking-[-0.02em] text-ink">
                  {item.value}
                </p>
                <p className="mt-4 text-sm leading-[1.6] text-muted">
                  {item.note}
                </p>
              </dd>
            </div>
          ))}
        </dl>

        {/* Не тупик: утверждение без действия обрывало поток. */}
        <p className="reveal mt-8 text-sm text-muted">
          Нужен кортеж из нескольких машин или поездка на весь день:{" "}
          <a
            href={bookingUrl(
              "Здравствуйте! Нужен кортеж или заказ на весь день. Подскажите по свободным машинам и стоимости.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="text-acc-pale transition-colors duration-200 hover:text-ink"
          >
            спросить в WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
