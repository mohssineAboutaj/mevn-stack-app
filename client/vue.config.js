module.exports = {
	devServer: {
		port: 7701
	},
	chainWebpack: config => {
		config.plugin("html").tap(args => {
			args[0].title = "Manchour - MEVN app";
			return args;
		});
	}
};
