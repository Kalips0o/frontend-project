// Импортируем модуль 'path' для работы с путями файловой системы
import path from 'path';

// Импортируем webpack для настройки конфигурации сборки
import webpack from 'webpack';

// Импортируем плагин HTMLWebpackPlugin для генерации HTML-файла
import HTMLWebpackPlugin from "html-webpack-plugin";

// Создаем конфигурацию для webpack
const config: webpack.Configuration = {
    // Устанавливаем режим сборки: 'development' (разработка) или 'production' (продакшн)
    mode: 'development',

    // Указываем точку входа для сборки. В данном случае это файл 'index.ts' в папке 'src'
    entry: path.resolve(__dirname, 'src', 'index.ts'),

    // Настройка выходных файлов
    output: {
        // Имя выходного файла будет динамически генерироваться с хэшем для кэширования
        filename: "[name].[contenthash].js",

        // Путь, куда будет сохранен собранный проект (папка 'build')
        path: path.resolve(__dirname, 'build'),

        // Очищать папку 'build' перед каждой сборкой
        clean: true
    },

    // Подключаем плагины
    plugins: [
        // Плагин для генерации HTML-файла на основе шаблона 'index.html' из папки 'public'
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),

        // Плагин для отображения прогресса сборки в консоли
        new webpack.ProgressPlugin(),
    ],

    // Настройка модулей и правил для обработки файлов
    module: {
        rules: [
            {
                // Регулярное выражение для обработки файлов с расширением .ts или .tsx
                test: /\.tsx?$/,

                // Используем 'ts-loader' для компиляции TypeScript в JavaScript
                use: 'ts-loader',

                // Исключаем папку 'node_modules' из обработки
                exclude: /node_modules/,
            }
        ],
    },

    // Настройка разрешения расширений файлов
    resolve: {
        // Указываем, какие расширения файлов будут обрабатываться по умолчанию
        extensions: ['.tsx', '.ts', '.js'],
    },
}

// Экспортируем конфигурацию для использования в webpack
export default config;
