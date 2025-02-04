// Импортируем HTMLWebpackPlugin для генерации HTML-файла на основе шаблона
import HTMLWebpackPlugin from 'html-webpack-plugin';

// Импортируем модуль webpack для использования типов и встроенных плагинов
import webpack from 'webpack';

// Импортируем тип BuildOptions, который содержит параметры конфигурации сборки
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

// Экспортируем функцию buildPlugins, которая возвращает массив плагинов для Webpack
export function buildPlugins({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        // Создаем новый экземпляр HTMLWebpackPlugin
        // Он генерирует HTML-файл на основе шаблона, указанного в свойстве `template`
        new HTMLWebpackPlugin({
            template: paths.html, // Путь к HTML-шаблону, переданный через параметры конфигурации
        }),

        // Добавляем встроенный плагин Webpack для отображения прогресса сборки в терминале
        new webpack.ProgressPlugin(),

        // Создаем экземпляр MiniCssExtractPlugin для извлечения CSS в отдельные файлы
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css', // Имя и содержимое CSS файлов
            chunkFilename: 'css/[name].[contenthash:8].css', // Имя и содержимое для чанков CSS
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ];
}
