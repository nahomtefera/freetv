import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import './player.css'

function VideoPlayer({ currentChannel }) {
    const videoRef = useRef(null);
    const hls = useRef(null);  // Use useRef to persist the HLS instance

    useEffect(() => {
        if (Hls.isSupported()) {
            hls.current = new Hls();
            hls.current.loadSource(currentChannel.url);
            hls.current.attachMedia(videoRef.current);
            hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play();
            });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            // This will work in Safari
            videoRef.current.src = currentChannel.url;
            videoRef.current.addEventListener('loadedmetadata', () => {
                videoRef.current.play();
            });
        }

        return () => {
            if (hls.current) {
                hls.current.destroy();  // Properly call destroy on the HLS instance
            }
        };
    }, [currentChannel.url]);  // Dependency array, ensures effect runs when url changes

    return (
        <div>
            {currentChannel && (
                <video id='video-player'  ref={videoRef} controls playsInline width="1024" height="1080"></video>
            )}
        </div>
    );
}

export default VideoPlayer;