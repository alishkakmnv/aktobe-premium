import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "onAccent";

// Переход перечисляет свойства поимённо: transition-colors не покрывал бы
// transform, и нажатие срабатывало бы скачком.
const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-display text-sm " +
  "tracking-[0.01em] transition-[background-color,border-color,color,transform] " +
  "duration-200 ease-out-quint active:scale-[0.98] motion-reduce:active:scale-100";

const sizes = "px-7 py-4";

const variants: Record<Variant, string> = {
  // Заливка acc: текст на ней 4.87:1, сама к фону 3.12:1 — проходит и как текст, и как объект.
  primary: "bg-acc text-ink hover:bg-acc-hi",
  // Граница вместо тени: пара «1px border + широкая тень» запрещена в DESIGN.md.
  secondary: "border border-line text-ink hover:border-acc-pale hover:text-acc-pale",
  // Для кнопки поверх зелёной плоскости. Отдельный вариант, а не bg-* через
  // className: два класса на один и тот же background конфликтуют, и побеждает
  // порядок в собранном CSS, а не порядок в строке классов.
  onAccent: "bg-ink text-bg hover:bg-white",
};

interface ButtonLinkProps extends ComponentPropsWithoutRef<"a"> {
  variant?: Variant;
}

/**
 * Все CTA проекта — ссылки: либо якорь, либо мессенджер.
 * Кнопки без назначения не допускаются.
 */
export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      {...props}
      className={`${base} ${sizes} ${variants[variant]} ${className}`}
    />
  );
}
