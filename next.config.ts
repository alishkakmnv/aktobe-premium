import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * В домашней папке пользователя лежит посторонний package-lock.json, из-за
   * которого Turbopack принимал за корень проекта C:\Users\Sulpak и вешал
   * watcher на всю домашнюю директорию. Фиксируем корень явно.
   */
  turbopack: {
    root: import.meta.dirname,
  },
  // Фото парка теперь локальные (/public/cars) — внешние источники не нужны.
};

export default nextConfig;
