var path    = require('path');
var webpack = require('webpack');


module.exports = function (env) {
    var plugins = [
        // new webpack.ContextReplacementPlugin(
        //     // The (\\|\/) piece accounts for path separators in *nix and Windows
        //     /angular(\\|\/)core/,
        //     root('./src'), // location of your src
        //     { }
        // ),
        // new webpack.ProvidePlugin({
        //     jQuery: "jquery", // use from bootstrap
        //     Tether: "tether", // use from bootstrap
        // })
    ];
    if (env && env.watch) {
        var WebpackShellPlugin = require('webpack-shell-plugin');

        plugins.push(
            new WebpackShellPlugin({
                // onBuildStart:['echo "Webpack Start"'],
                onBuildEnd:['npm start'],
                dev: false
            })
        );
    }

return [{
        entry: (env && env.env === 'test') ? void 0 : {
            app: [
                path.resolve(__dirname, 'src/app.tsx')
            ],
            spec: [
                path.resolve(__dirname, 'src/_spec/index.ts')
            ]
        },
        // node: {
        //     fs: false,
        //     console: false,
        //     process: true,
        //     global: false,
        //     __filename: false,
        //     __dirname: false,
        //     Buffer: false,
        //     setImmediate: false,
        // },
        output: (env && env.env === 'test') ? void 0 : {
            library: 'RdAgateExampleApp',

            libraryTarget: 'commonjs2',
            filename: process.env.NODE_ENV === 'production' ? '[name].js' : '[name].js',
            path: path.resolve(__dirname, 'dist'),
            devtoolModuleFilenameTemplate: process.env.NODE_ENV === 'production' ? '[resource-path]' : void 0
        },
        target: "node",
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    'ts-loader?' + JSON.stringify({
                        configFile: 'tsconfig.json'
                    }),
                ],
                exclude: /node_modules[\/\\](?!red-agate).*$/
            }, {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules[\/\\](?!red-agate).*$/
            }, {
                enforce: 'pre',
                test: /\.[tj]sx?$/,
                use: {
                    loader: 'source-map-loader',
                    options: {
                    }
                },
                exclude: [
                    // instead of /\/node_modules\//
                    path.join(process.cwd(), 'node_modules')
                ]
            }, {
                test: /\.html?(\?.+)?$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeAttributeQuotes: false,
                        caseSensitive: true,
                        customAttrSurround: [
                            [/#/, /(?:)/],
                            [/\*/, /(?:)/],
                            [/\[?\(?/, /(?:)/]
                        ],
                        customAttrAssign: [/\)?\]?=/]
                    }
                }
            }, {
                test: /\.(css|scss)$/,
                use: [
                    'to-string-loader',
                    'css-loader',
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: () => [
                    //             require('postcss-custom-properties')(),
                    //             require('postcss-nested')(),
                    //             require('autoprefixer')({ browsers: ['last 2 versions'] })
                    //         ]
                    //     }
                    // },
                    // 'sass-loader'
                ]
            }, {
                test: /\.(jpg|jpeg|png|ttf|otf|eot|svg|woff2?)(\?.+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }]
        },
        plugins: plugins,
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js']
        },
        devServer: {
            contentBase: [
                path.resolve(__dirname, "src"),
                path.resolve(__dirname, "node_modules")
            ],
            publicPath: "/",
            compress: true,
            port: 8080
        },
        devtool: 'source-map'
    },
]}