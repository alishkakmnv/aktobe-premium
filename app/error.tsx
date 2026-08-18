"use client";

import { useEffect } from "react";
import { CONTACT, GENERAL_ENQUIRY, bookingUrl } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Граница ошибки страницы.
 *
 * Текст без кодов и стек-трейсов: посетителю нужно понимать, что делать дальше,
 * а не что упало. Путь к заявке остаётся открытым даже в этом состоянии, потому
 * что WhatsApp работает независимо от того, что сломалось на сайте.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Ошибку не глотаем: без этого причина потеряется совсем.
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center">
      <div className="container-page py-[clamp(6rem,14vw,10rem)]">
        <h1 className="max-w-[22ch] text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.025em]">
          Страница не загрузилась
        </h1>
        <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-[1.65] text-muted">
          Что-то пошло не так на нашей стороне. Попробуйте обновить: обычно
          этого достаточно. Если не помогло, напишите нам — подберём машину с
          водителем в переписке.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-acc px-7 py-4 font-display text-sm tracking-[0.01em] text-ink transition-[background-color,transform] duration-200 ease-out-quint hover:bg-acc-hi active:scale-[0.98] motion-reduce:active:scale-100"
          >
            Обновить страницу
          </button>
          <ButtonLink
            href={bookingUrl(GENERAL_ENQUIRY)}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            Написать в WhatsApp
          </ButtonLink>
        </div>

        <p className="mt-10 text-sm text-muted">
          Телефон:{" "}
          <a
            href={CONTACT.phoneHref}
            className="tnum text-ink transition-colors duration-200 hover:text-acc-pale"
          >
            {CONTACT.phoneDisplay}
          </a>
        </p>
      </div>
    </main>
  );
}
