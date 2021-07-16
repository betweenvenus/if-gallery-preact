export default {
    webpack(config, _, helpers) {
        const { rule } = helpers.getLoadersByName(config, "css-loader")[0];
        const cssLoaderOptions = rule.use.find((r) =>
            r.loader && r.loader.includes("css-loader")
        ).options.modules;
				/**
				 * enable camel case props for css objects 
				 * (`styles.fooBarBaz` instead of `styles["foo-bar-bar"]`)
				 * christ why isn't this on by default? there goes 
				 * 30 minutes of my life
				 */
        cssLoaderOptions.exportLocalsConvention = "camelCase";
    },
};
