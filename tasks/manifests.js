module.exports = {
	all: {
		output: "<%= configFolder %>/manifests.json",
		files: "assets/fla/**/*.js",
		remove: "../../../deploy/"
	}
};
