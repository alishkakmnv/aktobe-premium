import Link from "next/link";
import { CONTACT, GENERAL_ENQUIRY, SITE, bookingUrl } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Страница не найдена" };

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center">
      <div className="container-page py-[clamp(6rem,14vw,10rem)]">
        <p className="tnum font-display text-sm text-acc-pale">404</p>
        <h1 className="mt-5 max-w-[20ch] text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.025em]">
          Такой страницы нет
        </h1>
        <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-muted">
          Ссылка устарела или в адресе опечатка. Автопарк и условия заказа на
          месте, а если нужна конкретная машина на дату, быстрее просто
          спросить.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Вернуться на главную</ButtonLink>
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
          Или позвоните:{" "}
          <Link
            href={CONTACT.phoneHref}
            className="tnum text-ink transition-colors duration-200 hover:text-acc-pale"
          >
            {CONTACT.phoneDisplay}
          </Link>
          <span className="sr-only"> ({SITE.name})</span>
        </p>
      </div>
    </main>
  );
}
