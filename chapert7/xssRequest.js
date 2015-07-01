ADS.addEvent(window, 'load', function() {

	ADS.xssRequest('xssRequest.php',{
		completeListener: function() {
			ADS.log.write(this.responseJSON.message);
		},errorListener:function () {
			ADS.log.write(this.statusText);
		},
		timeout:10000
	});

	ADS.xssRequest('xssRequest.php',{
		completeListener: function() {
			ADS.log.write(this.responseJSON.message);
		},errorListener:function () {
			ADS.log.write(this.statusText);
		},
		timeout:1
	});


});