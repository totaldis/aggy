aggy.utils = function () {
	
	var
	authorizeUser = function () {
		window.location.replace(aggy.config.authUrl);
	},
	getHashParam = function (url, param) {
		var regx = new RegExp("#" + param + "=([^&]+)(&|$)");
		var match = url.match(regx);
		return (match ? match[1] : "");
	},
	interval = function (repeatFunction, time) {
		repeatFunction();
		return setTimeout(function () {
			interval(repeatFunction, time);
		}, time);
	},
	scrollToId = function (id) {
		$('html, body').animate({
			scrollTop: $(id).offset().top-aggy.config.topOffset
		}, aggy.config.scrollSpeed);
	},

	getData = function (next_url) {
		return $.ajax({
			dataType: "jsonp",
			url: next_url
		});
	},

	getAllItems = function () {
		var next_url = aggy.config.apiUrl + aggy.config.tokenId;
		aggy.model.unmapped = [];

		var deferred = $.Deferred();

		getData(next_url).then(concatData);

		function concatData(response) {
			if (response.code == '400') {
				alert(response.error_message);
				return false;
			}
			aggy.model.unmapped = aggy.model.unmapped.concat(response.data);
			if (response.pagination && response.pagination.next_url) {
				setTimeout(function () {
					getData(response.pagination.next_url).then(concatData); 
				}, 500);
			} else {
				aggy.model.collection = ko.mapping.fromJSON(JSON.stringify(aggy.model.unmapped));
				ko.applyBindings(aggy.model);
				deferred.resolve();
			}
		};

		return deferred.promise();
	},
	getLatestItem = function () {
		if (aggy.model.isUpdateOn()) {
			var next_url = aggy.config.apiUrl + aggy.config.tokenId + '&count=1';

			getData(next_url).then(function (response) {
				if (response.data.length > 0) {
					var matchingId = response.data[0].id;
					var matched = ko.utils.arrayFirst(aggy.model.collection(), function (item) {
						return matchingId == ko.utils.unwrapObservable(item.id);
					});
					if (!matched) {
						aggy.model.collection.splice(aggy.model.currentIndex + aggy.model.queueCount + 1, 0, response.data[0]);
						aggy.model.queueCount++;
					}
				}
			});
		}
	},

	moveSlider = function () {
		if (aggy.model.isSliderOn()) {
			var length = ko.utils.unwrapObservable(aggy.model.collection).length;
			if (length) {
				aggy.model.currentIndex++;
				aggy.model.queueCount = 0;
				if (aggy.model.currentIndex >= length) {
					aggy.utils.scrollToId('#top');
					aggy.model.currentIndex = -1;
				} else {
					var elementId = ko.utils.unwrapObservable(aggy.model.collection()[aggy.model.currentIndex].id);
					aggy.utils.scrollToId('#' + elementId);
				}
			}
		}
	};

	return {
		authorizeUser: authorizeUser,
		getHashParam: getHashParam,
		getAllItems: getAllItems,
		getLatestItem: getLatestItem,
		moveSlider: moveSlider,
		scrollToId: scrollToId,
		interval: interval,
	}
}();