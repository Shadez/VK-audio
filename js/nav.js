function nav(url) {
	$.ajax({
		url: url + '?navRequest=true',
		type: 'get',
		success: function(d) {
			$('#content').html(d);
			try {
				history.pushState({}, '', url);
				return;
			}
			catch (e) {}
			location.hash = '#/' + url;
		}
	});

	return false;
}