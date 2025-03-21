// Импортируем тип ResolveOptions из Webpack для строгой типизации возвращаемого значения
import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

// Экспортируем функцию buildResolvers, которая возвращает объект настроек для резолвера Webpack
export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        // Свойство `extensions` задает массив расширений файлов, которые Webpack будет обрабатывать.
        // Это позволяет импортировать модули без явного указания их расширений.
        extensions: ['.tsx', '.ts', '.js'], // Например: import MyComponent from './MyComponent' (без .tsx)
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {
            '@': options.paths.src,
        },
    };
}
