/* global cast, chrome */
import { useEffect, useState } from "react";
// packages
import ReactHlsPlayer from "react-hls-player";
import ReactPlayer from "react-player";
import Player from "./player/player";
//..utils
import parseM3U from "./utils/parseM3U";

export default function Main() {

    const [channels, setChannels] = useState([]);
    const [streamURL, setStreamURL] = useState('')

    const initializeCastApi = () => {
        cast.framework.CastContext.getInstance().setOptions({
            receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
            autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        });
    };
    
    useEffect(() => {
        window['__onGCastApiAvailable'] = function(isAvailable) {
            if (isAvailable) {
                initializeCastApi();
            }
        };
    }, []);

    useEffect(()=>{
        const fetchPlaylist = async () => {
            const response = await fetch('https://iptv-org.github.io/iptv/categories/animation.m3u');
            const data = await response.text();
            return data;
        };
                
        const displayChannels = async () => {
            const playlist = await fetchPlaylist();
            const channels = parseM3U(playlist);

            setChannels(channels);
        };
        
        displayChannels();
    }, [])

    return (
        <div>
            <ul>
                {channels?.slice(0,4).map((channel, index)=>{
                    return (
                        <>
                            <li key={`${index}-title`}> <strong>{channel.title}</strong></li>
                            <li key={`${index}-url`}> {channel.url}</li>
                        </>
                    )
                })}
            </ul>
            <input type="text" value={streamURL} placeholder="Stream url" onChange={(e)=>{setStreamURL(e.target.value)}} />
            <br></br>
            {streamURL && <Player streamURL={streamURL} />}
        </div>
    )
}