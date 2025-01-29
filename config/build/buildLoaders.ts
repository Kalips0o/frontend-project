// Импортируем Webpack для использования его типов и интерфейсов
import webpack from "webpack";

// Импортируем плагин MiniCssExtractPlugin для извлечения CSS в отдельные файлы
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// Импортируем тип BuildOptions, который содержит параметры конфигурации сборки
import { BuildOptions } from "./types/config";

// Экспортируем функцию buildLoaders, которая возвращает массив настроек загрузчиков для Webpack
export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {

    // Конфигурация для загрузки CSS и SCSS файлов
    const cssLoader = {
        // Указываем регулярное выражение для файлов .scss и .sass
        test: /\.s[ac]ss$/i,
        // Настраиваем последовательность загрузчиков
        use: [
            // В режиме разработки используем 'style-loader' для внедрения стилей в DOM
            // В режиме продакшн используем MiniCssExtractPlugin.loader для извлечения CSS в отдельный файл
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                // Подключаем css-loader для обработки CSS-импортов
                loader: 'css-loader',
                options: {
                    // Настраиваем модули CSS (CSS Modules)
                    modules: {
                        // Автоматически активируем CSS Modules для файлов с ".module." в имени
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        // Формат имен CSS-классов: полный путь и имя файла в режиме разработки,
                        // а в режиме продакшн — короткий хэш
                        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
                    },
                }
            },
            // Используем sass-loader для преобразования SCSS/SASS в CSS
            'sass-loader',
        ]
    };

    // Конфигурация для загрузки TypeScript файлов
    const typescriptLoader = {
        // Указываем регулярное выражение для файлов .ts и .tsx
        test: /\.tsx?$/,
        // Используем ts-loader для компиляции TypeScript в JavaScript
        use: 'ts-loader',
        // Исключаем папку node_modules, чтобы ускорить процесс сборки
        exclude: /node_modules/,
    };

    // Возвращаем массив загрузчиков
    return [
        typescriptLoader, // Загрузчик для TypeScript
        cssLoader,        // Загрузчик для CSS/SCSS
    ];
}
