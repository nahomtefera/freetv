import React from "react";
import {
  makeStyles,
  Slider,
  withStyles,
  // Button,
  // Tooltip,
  // Popover,
  // Grid,
} from "@material-ui/core";
import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  // SkipNext,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  Refresh,
  // Cast,
  Airplay
} from "@material-ui/icons";
import "./control.css";

const useStyles = makeStyles({
  volumeSlider: {
    width: "100px",
    color: "#9556CC",
  },

  bottomIcons: {
    color: "#999",
    padding: "12px 8px",

    "&:hover": {
      color: "#fff",
    },
  },
});

const PrettoSlider = withStyles({
  root: {
    height: "20px",
    color: "#9556CC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#9556CC",
    border: "2px solid currentColor",
    marginTop: -3,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
    width: "100%",
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

const Control = ({
  buffer,
  onPlayPause,
  playing,
  onRewind,
  onForward,
  played,
  onSeek,
  onSeekMouseUp,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  volume,
  mute,
  onMute,
  duration,
  currentTime,
  onMouseSeekDown,
  controlRef,
  fullScreenHandler,
  startCasting,
  handleAirPlay,
  channel
}) => {
  const classes = useStyles();

  return (
    <div className="control_Container" ref ={controlRef}>
      <div className="top_container">
        <h2>{channel.title}</h2>
      </div>

      <div className="mid__container">
        {
          !buffer && <div className="icon__btn" onClick={onRewind}>
            <FastRewind fontSize="medium" />
          </div>
        }

        {
          buffer 
            ? <div className="icon__btn">
                <Refresh fontSize="medium" />
              </div>
            : <div className="icon__btn" onClick={onPlayPause}>
                {playing ? (
                  <Pause fontSize="medium" />
                ) : (
                  <PlayArrow fontSize="medium" />
                )}{" "}
              </div>
        }

        {
          !buffer && <div className="icon__btn">
            <FastForward fontSize="medium" onClick={onForward} />
          </div>
        }

      </div>

      <div className="bottom__container">
        <div className="slider__container">
          <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            onMouseDown={onMouseSeekDown}
          />
        </div>
        <div className="control__box">
          <div className="inner__controls">
            <div className="icon__btn" onClick={onPlayPause}>
              {playing ? (
                <Pause fontSize="medium" />
              ) : (
                <PlayArrow fontSize="medium" />
              )}{" "}
            </div>

            {/* <div className="icon__btn">
              <SkipNext fontSize="medium" />
            </div> */}

            <div className="icon__btn" onClick={onMute}>
            {mute ? (
                  <VolumeOff fontSize="medium" />
                ) : (
                  <VolumeUp fontSize="medium" />
                )}
            </div>

            <Slider
              className={`${classes.volumeSlider}`}
              onChange={onVolumeChangeHandler}
              value={volume * 100}
              onChangeCommitted={onVolumeSeekUp}
            />

            <span className="icon__btn">{ currentTime} : {duration}</span>
          </div>

          <div className="inner__controls">
            {/* <div className="icon__btn">
              <Cast fontSize="medium" onClick={startCasting} />
            </div> */}
            <div className="icon__btn">
              <Airplay fontSize="medium" onClick={handleAirPlay}/>
            </div>
            <div className="icon__btn">
              <Fullscreen fontSize="medium" onClick={fullScreenHandler}/>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Control;
