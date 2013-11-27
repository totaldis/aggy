var aggy = aggy || {};

aggy.config = function () {

	var 
		tokenId = null,
		client_id = 'c36a303e66b840b29bb0f23216ed01c2',
		tag = 'ancpbg',
		updateTimer = 10000, // miliseconds
		sliderTimer = 13570, // miliseconds
		scrollSpeed = 1000, // milliseconds
		topOffset = 450,
		redirect_uri = 'http://www.aaronandchony.com/static/instagram/',
		authUrl = 'https://instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=token',
		apiUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=';


	return {
		tokenId: tokenId,
		authUrl: authUrl,
		apiUrl: apiUrl,
		updateTimer: updateTimer,
		sliderTimer: sliderTimer,
		topOffset: topOffset,
		scrollSpeed: scrollSpeed
	}
}();