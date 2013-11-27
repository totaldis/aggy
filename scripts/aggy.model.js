aggy.model = function () {
	var
		unmapped = [],
		collection = {},
		currentIndex = -1,
		queueCount = 0,
		showLatestItem = function (element) { if (element.nodeType === 1) $(element).hide().slideDown(); },
		isSliderOn = ko.observable(true),
		isUpdateOn = ko.observable(false);

	return {
		unmapped: unmapped,
		collection: collection,
		currentIndex: currentIndex,
		queueCount: queueCount,
		isSliderOn: isSliderOn,
		isUpdateOn: isUpdateOn,
		showLatestItem: showLatestItem
	}
}();