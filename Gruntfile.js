module.exports = function(grunt)
{
	// Setup the default game tasks
	require('grunt-springroll')(grunt, {
		configFolder: '<%= distFolder %>/assets/config',
		configSrc: 'src/cloudkid/config'/*,
		eventSpec: 'spec-slug'*/
	});
};