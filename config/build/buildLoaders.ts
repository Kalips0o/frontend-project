// Импортируем модуль webpack для использования типов и функций, связанных с Webpack
import webpack from "webpack";

// Экспортируем функцию buildLoaders, которая возвращает массив правил загрузчиков для Webpack
export function buildLoaders(): webpack.RuleSetRule[] {

    // Определяем загрузчик для файлов TypeScript
    const typescriptLoader = {
        // Свойство `test` указывает регулярное выражение для поиска файлов,
        // которые должны обрабатываться этим загрузчиком. Здесь это файлы с расширением .ts и .tsx.
        test: /\.tsx?$/,

        // Свойство `use` указывает, какой загрузчик использовать.
        // В данном случае используется `ts-loader`, который компилирует TypeScript в JavaScript.
        use: 'ts-loader',

        // Свойство `exclude` указывает папки или файлы, которые нужно исключить из обработки.
        // Это позволяет избежать обработки файлов из папки `node_modules` для повышения производительности.
        exclude: /node_modules/,
    };

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from js strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
        ]
    }

    // Возвращаем массив правил загрузчиков
    return [
        typescriptLoader,
        cssLoader,
    ]
}
