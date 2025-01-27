// Импортируем тип ResolveOptions из Webpack для строгой типизации возвращаемого значения
import { ResolveOptions } from "webpack";

// Экспортируем функцию buildResolvers, которая возвращает объект настроек для резолвера Webpack
export function buildResolvers(): ResolveOptions {
    return {
        // Свойство `extensions` задает массив расширений файлов, которые Webpack будет обрабатывать.
        // Это позволяет импортировать модули без явного указания их расширений.
        extensions: ['.tsx', '.ts', '.js'], // Например: import MyComponent from './MyComponent' (без .tsx)
    };
}
