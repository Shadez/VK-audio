var is_hiding = false;
var cancel_hiding = false;
var hiding = false;
var current_audio = '';
var showTimeLeft = false;
var audio_duration = 0;
var playlist = [];
var is_paused = false;

$(document).ready(function() {
	$('#player').draggable();
	$('#pr_slider').draggable({
		axis:'x',
		containment: 'parent',
		start: function() {
			$('#jp').jPlayer('pause');
			is_paused = true;
		},
		drag: function(e, ui) {
			var slider_pos = ((ui.position.left / 316) * 100);
			if (slider_pos > 100)
				slider_pos = 100;
			$('#jp').jPlayer('playHead', slider_pos);
		},
		stop: function() {
			$('#jp').jPlayer('play');
			is_paused = false;
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
		playpause();
	});

	// Generate playlist
	playlist = [];
	var idx = 0;

	$('div.audio_play_btn').each(function(idx, val) {
		if ($(val).attr('id').indexOf('audio') >= 0)
		{
			playlist[idx] = {
				'id': $(val).attr('id'),
				'file': $(val).attr('data-file'),
				'artist': $(val).attr('data-artist'),
				'composition': $(val).attr('data-composition')
			};
			++idx;
		}
	});

	$('#back_line').click(function(e) {
		var position = $(this).position();
		var offset = $(this).offset();
		var x = e.pageX - (offset.left);
		var width = parseInt($(this).css('width').replace('px', ''), 10);
		var percent = (x / width) * 100;

		$('#jp').jPlayer('playHead', percent);
	});

	$('#vol_back').click(function(e) {
		var position = $(this).position();
		var offset = $(this).offset();
		var x = e.pageX - (offset.left);
		var width = parseInt($(this).css('width').replace('px', ''), 10);
		var percent = (x / width);

		$('#jp').jPlayer('volume', percent);
		$('#vol_slider').css('left', x + 'px');
	});

	$('#jp').jPlayer({
		supplied: 'mp3',
		swfPath: '../swf',
		wmode: "window",
		ended: function(e) {
			if ($('#jp').jPlayer('option', 'loop') == false)
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
	function play(track, nextTrack) {
		is_paused = true;
		if (!track)
		{
			// user changed page, no items available
			// play music from playlist
			var id = 0;
			if (current_audio)
			{
				
				id = parseInt(current_audio.toString().substr(5));

				if (nextTrack)
				{
					if (id >= playlist.length)
						id = 1;
					else
						id++;
				}
				else
				{
					if (id < 2)
						id = playlist.length;
					else
						id--;
				}

				$('#' + current_audio).css('background-position', '0 0px');
				current_audio = 'audio' + id;
				$('#' + current_audio).css('background-position', '0 -16px');
				//console.log('current: %s, id: %d, length: %d', current_audio, id, playlist.length);
				$('#jp').jPlayer('clearMedia').jPlayer('setMedia', {mp3: 'audio/' + playlist[id-1].file}).jPlayer('play', 0);

				var small_info = '';

				var artist = playlist[id-1].artist;
				if (!artist)
					artist = 'Unknown';

				var composition = playlist[id-1].composition;
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

				is_paused = false;

				return false;
			}
			return false;
		}
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

		is_paused = false;
	}

	function playpause() {
		if (!is_paused)
		{
			$('#jp').jPlayer('pause');
			$('#play_large').attr('style', 'background-position: 0px 0px;');
			$('#play_small').attr('style', 'background-position: 0px 0px;');
			is_paused = true;
		}
		else
		{
			$('#jp').jPlayer('play');
			$('#play_large').attr('style', 'background-position: 0px -11px;');
			$('#play_small').attr('style', 'background-position: 0px -11px;');
			is_paused = false;
		}
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
		play(false, true);
	});

	/**
	 * Prev. track button handler
	 **/
	$('#prev_track').click(function() {
		play(false, false);

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
			console.log('repeat off');
		}
		else {
			$(this).addClass('on');
			console.log('repeat on');
			$('#jp').jPlayer('option', 'loop', true);
			$('#jp').jPlayer('repeat');
		}
	});
});