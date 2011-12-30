var is_hiding = false;
var cancel_hiding = false;
var hiding = false;
var current_audio = '';
var showTimeLeft = false;
var audio_duration = 0;

$(document).ready(function() {
	$('#player').draggable();
	$('#pr_slider').draggable({
		axis:'x',
		containment: 'parent',
		start: function() {
			$('#jp').jPlayer('pause');
		},
		drag: function(e, ui) {
			var slider_pos = ((ui.position.left / 316) * 100);
			if (slider_pos > 100)
				slider_pos = 100;
			$('#jp').jPlayer('playHead', slider_pos);
		},
		stop: function() {
			$('#jp').jPlayer('play');
		}
	});
	$('#vol_slider').draggable({
		axis: 'x',
		containment: 'parent',
		drag: function(e, ui) {
			$('#jp').jPlayer('option', 'volume', (ui.position.left / 33));
		}
	});

	$('#player').mouseenter(function() {
		$('#small').hide();
		$('#large').show();
		if (is_hiding)
		{
			is_hiding = false;
			clearTimeout(hiding);
		}
	});

	$('#player').mouseleave(function() {
		if (!is_hiding) {
			is_hiding = true;
			hiding = setTimeout(function() {
				if (is_hiding) {
					$('#large').hide();
					$('#small').show();
				}
				is_hiding = false;
			}, 1000);
		}
	});

	$('#pl_close').mouseenter(function() {
		$('#close').attr('style', 'background-position: 0px -76px;')
	});

	$('#pl_close').mouseleave(function() {
		$('#close').attr('style', 'background-position: 0px -68px;')
	});

	$('#play_large').click(function() {
		$('#' + current_audio).trigger('click');
	});

	$('#jp').jPlayer({
		supplied: 'mp3',
		swfPath: '../swf',
		wmode: "window",
		ended: function(e) {
			$('#next_track').trigger('click');
		},
		volume: 1,
		cssSelectorAncestor: '#audio_info_large',
		cssSelector: {
			currentTime: '.duration'
		},
		timeupdate: function(e) {
			//audio_info_large -> from 0px up to 316px
			audio_duration = e.jPlayer.status.duration;
			var slider_pos = 316 * (e.jPlayer.status.currentPercentAbsolute / 100);
			$('#pr_slider').attr('style', 'opacity:1;left:' + Math.round(slider_pos) + 'px;');
		}
	});

	/***********************/
	/*** Player Handlers ***/
	/***********************/

	/**
	 * Runs player
	 **/
	function play(track) {
		if (current_audio && current_audio != track.attr('id'))
			$('#' + current_audio).attr('style', 'background-position: 0 0px');

		var file = track.attr('data-file');
		var length = track.attr('data-length');

		if (!file || !length)
			return false;

		track.attr('style', 'background-position: 0 -16px');
		track.attr('data-playing', 'true');

		current_audio = track.attr('id');

		$('#jp').jPlayer('clearMedia').jPlayer('setMedia', {mp3: 'audio/' + file}).jPlayer('play', 0);

		var small_info = '';

		var artist = track.attr('data-artist');
		if (!artist)
			artist = 'Unknown';

		var composition = track.attr('data-composition');
		if (!composition)
			composition = 'Unknown';

		var large_info = '<strong>' + artist + '</strong> - ' + composition;
		if (artist.length > 17)
			small_info += '<strong>' + artist.substr(0, 17) + '...</strong><br />';
		else
			small_info += '<strong>' + artist + '</strong><br />';

		if (composition.length > 15)
			small_info += composition.substr(0, 15) + '...';
		else
			small_info += composition;

		$('#title_large').html(large_info);
		$('#title_small').html(small_info);
	}

	/**
	 * Play/pause button handler
	 **/
	$('.audio_play_btn').click(function() {
		if (current_audio && current_audio != $(this).attr('id'))
			$('#' + current_audio).attr('style', 'background-position: 0 0px');

		if ($(this).attr('data-playing') == 'true' && current_audio == $(this).attr('id'))
		{
			// need to pause
			$('#jp').jPlayer('pause');
			$(this).attr('style', 'background-position: 0 0px');
			$('#play_large').attr('style', 'background-position: 0px 0px;');
			$('#play_small').attr('style', 'background-position: 0px 0px;');
			$(this).attr('data-playing', 'false');

			return;
		}
		else if ($(this).attr('data-playing') == 'false' && current_audio == $(this).attr('id'))
		{
			$('#jp').jPlayer('play');
			$(this).attr('style', 'background-position: 0 -16px');
			$('#play_large').attr('style', 'background-position: 0px -11px;');
			$('#play_small').attr('style', 'background-position: 0px -11px;');
			$(this).attr('data-playing', 'true');

			return;
		}

		play($(this));

		$('#player').show();
	});

	/**
	 * Next track button handler
	 **/
	$('#next_track').click(function() {
		var next = parseInt(current_audio.toString().substr(5)) + 1;
		var track;
		if (!$('#audio' + next).length)
			track = $('#audio1');
		else
			track = $('#audio' + next);

		play(track);

	});

	/**
	 * Prev. track button handler
	 **/
	$('#prev_track').click(function() {
		var prev = parseInt(current_audio.toString().substr(5)) - 1;
		var track;
		if (!$('#audio' + prev).length)
			track = $('#audio' + ($('ul#audio-list > li').length));
		else
			track = $('#audio' + prev);

		play(track);

	});

	/**
	 * Repeat on/off toggler handler
	 **/
	$('#repeat_toggler').click(function() {
		if ($(this).hasClass('on')) {
			// on repeat, disable it
			$(this).removeClass('on');
			$('#jp').jPlayer('option', 'loop', false);
			$('#jp').unbind(".jPlayerRepeat");
		}
		else {
			$(this).addClass('on');
			$('#jp').jPlayer('repeat');
		}
	});
});