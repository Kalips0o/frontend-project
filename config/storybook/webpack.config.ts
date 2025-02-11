import webpack, { RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    const newConfig = { ...config };

    newConfig.resolve = { ...config.resolve };
    newConfig.resolve.modules = [...(config.resolve?.modules || [])];
    newConfig.resolve.extensions = [...(config.resolve?.extensions || [])];
    newConfig.module = { ...config.module };
    newConfig.module.rules = [...(config.module?.rules || [])];

    newConfig.resolve.modules.push(paths.src);
    newConfig.resolve.extensions.push('.ts', '.tsx');

    // Обновляем правило для обработки jsx/tsx файлов
    newConfig.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    ['@babel/preset-react', { runtime: 'automatic' }],
                    '@babel/preset-typescript',
                ],
            },
        },
    });

    newConfig.module.rules = newConfig.module.rules.map((rule: RuleSetRule | null | undefined | string | false | 0 | '...') => {
        if (rule && typeof rule === 'object' && 'test' in rule && rule.test && /svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
    }) as RuleSetRule[];

    newConfig.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    newConfig.module.rules.push(buildCssLoader(true));

    return newConfig;
};
