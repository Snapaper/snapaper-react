const withPWA = require("next-pwa")({
	disable: process.env.NODE_ENV === "development",
	dest: "public",
});

module.exports = withPWA({
	pageExtensions: ["jsx", "js"],
	poweredByHeader: false,
	generateEtags: false,
});
