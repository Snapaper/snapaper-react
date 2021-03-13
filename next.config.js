const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public'
    },
    devIndicators: {
        autoPrerender: false,
    },
    pageExtensions: ['jsx', 'js'],
    poweredByHeader: false,
    generateEtags: false,
})