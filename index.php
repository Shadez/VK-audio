<?php
if (isset($_GET['navRequest']))
{
	die('<h1>My audio</h1>
			<ul style="list-style:none;" class="audio_list" id="audio-list">
				<li>
					<div class="audio_play_btn" id="audio1" data-artist="Nasty" data-composition="My Jingle Balls" data-playing="false" data-file="nasty_jingle_balls.mp3" data-length="120"></div>
					Nasty - My Jingle Balls
				</li>
				<li>
					<div class="audio_play_btn" id="audio2" data-artist="Barney Stinson" data-composition="Suits" data-playing="false" data-file="ost_himym_suits.mp3" data-length="172"></div>
					Barney Stinson - Suits
				</li>
				<li>
					<div class="audio_play_btn" id="audio3" data-artist="" data-composition="Nokia Tune Dubstep Edition" data-playing="false" data-file="nokia_tune_dubstep.mp3" data-length="172"></div>
					Nokia Tune Dubstep Edition
				</li>
			</ul>
			<br />
			<a href="about.html" onclick="return nav(\'about.html\');">About</a><br /><a href="random.php" onclick="return nav(\'random.php\');">show random</a>');
}
?><!doctype html>
<html>
	<head>
		<title>Page controller</title>
		<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.8.16.custom.css" />
		<link rel="stylesheet" type="text/css" href="css/player.css" />
		<script type="text/javascript" language="javascript" src="js/jquery-1.7.1.min.js">
		</script>
		<script type="text/javascript" language="javascript" src="js/jquery-ui-1.8.16.custom.min.js">
		</script>
		<script type="text/javascript" language="javascript" src="js/jplayer/jquery.jplayer.min.js">
		</script>
		<script type="text/javascript" language="javascript" src="js/jplayer/jplayer.playlist.min.js">
		</script>
		<script type="text/javascript" language="javascript" src="js/jplayer/jquery.jplayer.inspector.js">
		</script>
		<script type="text/javascript" language="javascript" src="js/site.js">
		</script>
		<script type="text/javascript" language="javascript" src="js/nav.js">
		</script>
	</head>
	<body>
		<div id="content">
			<h1>My audio</h1>
			<ul style="list-style:none;" class="audio_list" id="audio-list">
				<li>
					<div class="audio_play_btn" id="audio1" data-artist="Nasty" data-composition="My Jingle Balls" data-playing="false" data-file="nasty_jingle_balls.mp3" data-length="120"></div>
					Nasty - My Jingle Balls
				</li>
				<li>
					<div class="audio_play_btn" id="audio2" data-artist="Barney Stinson" data-composition="Suits" data-playing="false" data-file="ost_himym_suits.mp3" data-length="172"></div>
					Barney Stinson - Suits
				</li>
				<li>
					<div class="audio_play_btn" id="audio3" data-artist="" data-composition="Nokia Tune Dubstep Edition" data-playing="false" data-file="nokia_tune_dubstep.mp3" data-length="172"></div>
					Nokia Tune Dubstep Edition
				</li>
			</ul>
			<br />
			<a href="about.html" onclick="return nav('about.html');">About</a>
			<br /><a href="random.php" onclick="return nav('random.php');">Show random</a>
		</div>


		<!-- Player part -->
		<div id="player_wrapper" style="position:fixed;">
			<div id="jp" class="jp-player"></div>
			<div id="player" style="display:none; left:10px;top:220px;">
				<div id="small" style="display:true;width:125px;">
					<div class="play_btn fl_l" id="play_btn_small">
						<div class="play_wrap">
							<div class="play" id="play_small" data-play="true" style="background-position: 0px -11px;"></div>
						</div>
					</div>
					<div id="audio_info fl_l" id="audio_info_small">
						<div class="title_wrap" id="title_small">
							
						</div>
					</div>
				</div>
				<div id="large" style="display:none;width:500px;">
					<div class="play_btn fl_l" id="play_btn_large">
						<div class="play_wrap">
							<div class="play" id="play_large" data-play="true" style="background-position: 0px -11px; "></div>
						</div>
					</div>
					<div class="controls fl_l">
						<div class="prev" id="prev_track"></div>
						<div class="repeat" id="repeat_toggler"></div>
						<div class="next" id="next_track"></div>
					</div>
					<div class="padd fl_l">
						<br />
					</div>
					<div class="lines_wrap fl_l">
						<div class="audio_info fl_l" id="audio_info_large">
							<div class="title_wrap" style="width: 330px;">
								<div class="fl_l" id="title_large"></div>
								<div class="duration fl_r" id="cur_time_pos">0:00</div>
							</div>
							<div class="player_wrap">
								<div id="gp_player" class="player">
									<table cellspacing="0" cellpadding="0" border="0" width="100%">
										<tbody>
											<tr>
												<td style="width: 100%; padding: 0px; position: relative;">
													<div id="back_line" class="audio_white_line"></div>
													<div id="load_line" class="audio_load_line"><!-- --></div>
													<div id="pr_line" class="audio_progress_line" style="width: 100%; ">
														<div id="pr_slider" class="audio_pr_slider" style="opacity: 1; left: 0px;"><!-- --></div>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="audio_vol fl_l" id="vol">
							<div id="vol_back" class="audio_white_volume_line"><!-- --></div>
							<div id="vol_line" class="audio_volume_line">
								<div id="vol_slider" class="audio_vol_slider" style="left: 33px; "><!-- --></div>
							</div>
						</div>
					</div>
					<div class="close fl_l" id="pl_close">
						<div id="close_wrap">
							<div id="close" style="background-position: 0px -68px;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>