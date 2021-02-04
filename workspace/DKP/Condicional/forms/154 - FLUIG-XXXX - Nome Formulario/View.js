$(document).ready(function() {
});

var VIEW = (function()
{
	var instance;

	function init()
	{
	
		function test()
		{
			return;
		};

		return {
			test: test
		};
	}

	return {
		getInstance: function()
		{
			if (!instance)
			{
				instance = init();
			}

			return instance;
		}
	}
})();