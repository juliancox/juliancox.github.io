const { resolve } = require('path')

module.exports = {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                join: resolve(__dirname, 'joinus.html'),
                coord: resolve(__dirname, 'coordinators.html'),
                locations: resolve(__dirname, 'locations.html'),
                newsite: resolve(__dirname, 'newsite.html'),
                gallery: resolve(__dirname, 'gallery.html'),
                more: resolve(__dirname, 'more.html'),
            }
        }
    }
}