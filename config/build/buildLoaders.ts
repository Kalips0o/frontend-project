import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";
export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {

    // Конфигурация для загрузки CSS и SCSS файлов
    const cssLoader = {
        test: /\.s[ac]ss$/i,
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
            'sass-loader',
        ]
    };


    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };


    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack']
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    }

    // Возвращаем массив загрузчиков
    return [
        typescriptLoader,
        cssLoader,
        svgLoader,
        fileLoader
    ];
}
