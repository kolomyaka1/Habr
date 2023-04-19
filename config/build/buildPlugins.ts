import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin  from 'circular-dependency-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BuildOptions } from './types/config';

export function buildPlugins({ paths, isDev, apiUrl, project }: BuildOptions): webpack.WebpackPluginInstance[] {

    const plugins = [
        // Плагин для html  странички, в настройках указываем темплейт нашей html странички из public
        new HTMLWebpackPlugin({
            template: paths.html
        }),
        // Плагин, который позволяет посмотреть отчет при компиляции
        new webpack.ProgressPlugin(),
        // Плагин, который будет генерить css файлы отдельно от js-кода при сборке в прод
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        // Плагин для создания глобальных переменных
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project)
        }),
        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }),

        new ReactRefreshWebpackPlugin(),
    ];

    if (isDev) {
        // Плагин для обновления элементов без перезагрузки страницы
        plugins.push(new webpack.HotModuleReplacementPlugin());
        // Плагин для анализа размеров сборки приложения
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false
        }));
        plugins.push(new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }));
    }

    // Функция, которая возвращает список плагинов в конфиге
    return plugins;
}