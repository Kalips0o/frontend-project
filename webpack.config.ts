import webpack from 'webpack';
import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const mode = env.mode || 'development';
    const isDev = mode === 'development';
    const PORT = env.port || 3000;

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
    });

    // Добавляем игнорирование предупреждений для определенных файлов
    if (config.module?.rules) {
        config.module.rules = config.module.rules.map((rule) => {
            if (typeof rule === 'object' && rule.test instanceof RegExp && rule.test.test('.tsx')) {
                return {
                    ...rule,
                    exclude: [/node_modules/, /\.d\.ts$/],
                };
            }
            return rule;
        });
    }

    return config;
};
