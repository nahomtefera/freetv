/* global cast, chrome */
import "./player.css";
import ReactPlayer from "react-player";
import { Container } from "@material-ui/core";
import Control from "../control/control";
import { useState, useRef } from "react";
import { formatTime } from "../utils/format";

let count = 0;
export default function Player({streamURL}){
  const videoPlayerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlRef = useRef(null);

  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
    fullscreen: false
  });

  const config = {
    file: {
        hlsOptions: {
            maxBufferLength: 30,              // Maximum buffer length in seconds
            maxMaxBufferLength: 600,          // Maximum buffer length in seconds allowed to be stored
            maxBufferSize: 60 * 1000 * 1000,  // Maximum buffer size in bytes
            liveSyncDurationCount: 3,         // Number of segments to keep between playback head and live edge
            liveMaxLatencyDurationCount: 10,  // Maximum number of segments between playback head and live edge
            maxBufferHole: 0.1,               // Maximum allowed hole between two consecutive fragments
            lowLatencyMode: true,             // Enable low latency mode
            highBufferWatchdogPeriod: 2,      // Interval in seconds to check buffer health
            fragLoadingTimeOut: 20000,        // Timeout in ms for fragment loading
            fragLoadingMaxRetry: 6,           // Max number of retries while loading a fragment
            startLevel: -1,                   // Start level to -1 for automatic level selection
            testBandwidth: true               // Enable bandwidth test for adaptive bitrate
            // Add additional HLS.js options as needed
        },
    // Other file config options can go here
    }
}

  //Destructuring the properties from the videoState
  const { playing, muted, volume, playbackRate, played, seeking, buffer } =
    videoState;

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : "00:00";
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : "00:00";

  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);

  //casting
  const startCasting = () => {
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    if (castSession) {
        const mediaInfo = new chrome.cast.media.MediaInfo(streamURL, 'application/x-mpegURL');
        const request = new chrome.cast.media.LoadRequest(mediaInfo);

        castSession.loadMedia(request).then(
            () => {
                console.log('Cast: Media loaded successfully');
            },
            (error) => {
                console.error('Cast: Error loading media:', error);
            }
        );
    } else {
        console.error('Cast: No CastSession is available');
    }

  };

  //Airplay
  const handleAirPlay = () => {
    if (videoPlayerRef && window.WebKitPlaybackTargetAvailabilityEvent) {
        videoPlayerRef.webkitShowPlaybackTargetPicker();
    } else {
        alert('AirPlay is not available on this device/browser.');
    }
  };

  //sets fullscreen (toggling)
  const fullScreenHandler = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Listen to fullscreen change events
  document.addEventListener('fullscreenchange', () => {
    setVideoState({ ...videoState, fullscreen: !!document.fullscreenElement });
  });

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const rewindHandler = () => {
    //Rewinds the video player reducing 5
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
  };

  const handleFastFoward = () => {
    //FastFowards the video player by adding 10
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };

  //console.log("========", (controlRef.current.style.visibility = "false"));
  const progressHandler = (state) => {
    if (count > 3) {
      console.log("close");
      controlRef.current.style.visibility = "hidden"; // toggling player control container
    } else if (controlRef.current.style.visibility === "visible") {
      count += 1;
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) });
    videoPlayerRef.current.seekTo(parseFloat(value / 100));
  };

  const seekMouseUpHandler = (e, value) => {
    console.log(value);

    setVideoState({ ...videoState, seeking: false });
    videoPlayerRef.current.seekTo(value / 100);
  };

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    });
  };

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    });
  };

  const muteHandler = () => {
    //Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  const onSeekMouseDownHandler = (e) => {
    setVideoState({ ...videoState, seeking: true });
  };

  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = "visible";
    count = 0;
  };

  const mouseLeaveHandler = () => {
    controlRef.current.style.visibility = "hidden";
    count = 3;
  };

  const bufferStartHandler = () => {
    console.log("Bufering.......");
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    console.log("buffering stoped ,,,,,,play");
    setVideoState({ ...videoState, buffer: false });
  };

  return (
    <div className="video_container">
      <div>
        <h2>React player</h2>
      </div>
      <Container maxWidth="md" justify="center">
        <div ref={playerContainerRef} className="player__wrapper" onMouseMove={mouseMoveHandler} onMouseLeave={mouseLeaveHandler}>
          <ReactPlayer
            ref={videoPlayerRef}
            className="player"
            url={streamURL}
            config={config}
            width="100%"
            height="auto"
            playing={playing}
            volume={volume}
            muted={muted}
            autoPlay={true}
            onProgress={progressHandler}
            onBuffer={bufferStartHandler}
            onBufferEnd={bufferEndHandler}
          />

          {/* {buffer && <p>Loading</p>} */}

          <Control
            buffer={buffer}
            controlRef={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={handleFastFoward}
            played={played}
            onSeek={seekHandler}
            onSeekMouseUp={seekMouseUpHandler}
            volume={volume}
            onVolumeChangeHandler={volumeChangeHandler}
            onVolumeSeekUp={volumeSeekUpHandler}
            mute={muted}
            onMute={muteHandler}
            playRate={playbackRate}
            duration={formatDuration}
            currentTime={formatCurrentTime}
            onMouseSeekDown={onSeekMouseDownHandler}
            fullScreenHandler={fullScreenHandler}
            startCasting={startCasting}
            handleAirPlay={handleAirPlay}
          />
        </div>
      </Container>
    </div>
  );
}