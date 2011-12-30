function nav(url) {
	$.ajax({
		url: url + '?navRequest=true',
		type: 'get',
		success: function(d) {
			$('#content').html(d);
		}
	});

	return false;
}