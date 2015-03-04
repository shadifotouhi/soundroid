module.exports = function(grunt)
{
	grunt.registerTask(
		'default',
		'Default task to build all the project code', [
			'build',
			'clean:manifests',
			'manifests',
			'clean:config',
			'config'
		]
	);

	grunt.registerTask(
		'debug',
		'Default task to build all the project code', [
			'build-debug',
			'clean:manifests',
			'manifests',
			'clean:config',
			'config-debug'
		]
	);

	grunt.registerTask(
		'create-manifests',
		'Combine the FLA manifests into a single file', [
			'manifests'
		]
	);

	grunt.registerTask(
		'config',
		'Combine the config JSONs within config/ into a single file', [
			//'curl:release',
			'concat-json'
		]
	);

	grunt.registerTask(
		'config-debug',
		'Combine the config JSONs within config/ into a single file', [
			//'curl:debug',
			'concat-json'
		]
	);
};
