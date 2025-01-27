// Импортируем тип BuildOptions из файла './types/config'.
// Этот тип определяет структуру конфигурации для сборки.
import { BuildOptions } from "./types/config";

// Импортируем тип DevServerConfiguration из 'webpack-dev-server'.
// Этот тип описывает конфигурацию для dev-сервера.
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

// Функция buildDevServer принимает объект options типа BuildOptions
// и возвращает конфигурацию для dev-сервера.
export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        // Указываем порт, на котором будет запущен dev-сервер.
        // Порт берется из переданного объекта options.
        port: options.port,

        // Автоматически открывать браузер при запуске dev-сервера.
        open: true,
    }
}
