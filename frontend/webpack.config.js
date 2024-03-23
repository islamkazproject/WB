const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/")
        }
    },
    entry: './src/index.js', // Путь к вашему главному файлу сборки
    output: {
        path: path.resolve(__dirname, 'dist'), // Путь к папке, куда будут сохранены собранные файлы
        filename: 'bundle.js'
    }
};