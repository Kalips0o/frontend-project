// Импортируем HTMLWebpackPlugin для генерации HTML-файла на основе шаблона
import HTMLWebpackPlugin from "html-webpack-plugin";

// Импортируем модуль path, который предоставляет утилиты для работы с путями файловой системы
import path from "path";

// Импортируем модуль webpack для использования типов и встроенных плагинов
import webpack from "webpack";

// Импортируем тип BuildOptions, который содержит параметры конфигурации сборки
import { BuildOptions } from "./types/config";

// Экспортируем функцию buildPlugins, которая возвращает массив плагинов для Webpack
export function buildPlugins({ paths }: BuildOptions): webpack.WebpackPluginInstance[] {

    return [
        // Создаем новый экземпляр HTMLWebpackPlugin
        // Он генерирует HTML-файл на основе шаблона, указанного в свойстве `template`
        new HTMLWebpackPlugin({
            template: paths.html, // Путь к HTML-шаблону, переданный через параметры конфигурации
        }),

        // Добавляем встроенный плагин Webpack для отображения прогресса сборки в терминале
        new webpack.ProgressPlugin(),
    ];
}
