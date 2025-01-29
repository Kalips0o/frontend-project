// Импортируем интерфейс BuildOptions для строгой типизации параметров сборки
import { BuildOptions } from "./types/config";

// Импортируем Webpack для использования типов и создания конфигурации
import webpack from "webpack";

// Импортируем функции для настройки Webpack
import { buildPlugins } from "./buildPlugins"; // Для настройки плагинов
import { buildLoaders } from "./buildLoaders"; // Для настройки загрузчиков
import { buildResolvers } from "./buildResolvers"; // Для настройки резолвера модулей
import { buildDevServer } from "./buildDevServer"; // Для настройки DevServer


// Определяем тип конфигурации
export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    // Деструктурируем необходимые параметры из объекта options
    const { paths, mode, isDev } = options;

    return {
        // Устанавливаем режим сборки: 'development' или 'production'
        mode,

        // Точка входа в приложение — главный файл
        entry: paths.entry,

        // Настройка выходных файлов сборки
        output: {
            // Шаблон имени файлов (имя входного файла + хэш содержимого)
            filename: "[name].[contenthash].js",

            // Папка, в которую будут собираться файлы
            path: paths.build,

            // Автоматическая очистка папки сборки перед новой сборкой
            clean: true,
        },

        // Плагины, которые будут использоваться Webpack
        plugins: buildPlugins(options),

        // Настройка модулей (правила обработки файлов)
        module: {
            // Массив правил для загрузчиков
            rules: buildLoaders(options),
        },

        // Настройка резолвера модулей (расширения файлов, пути)
        resolve: buildResolvers(options),

        // Генерация source map только в режиме разработки (для отладки)
        devtool: isDev ? 'inline-source-map' : undefined,

        // Настройка Webpack DevServer (если режим разработки)
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}
