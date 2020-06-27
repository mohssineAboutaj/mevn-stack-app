const { port, title, apiBase, outputDir } = require("./config");

module.exports = {
	outputDir,
	devServer: {
		port,
		proxy: {
			"/api": {
				target: apiBase
			}
		}
	},
	chainWebpack: config => {
		config.plugin("html").tap(args => {
			args[0].title = title;
			return args;
		});
	}
};
