/* global cast, chrome */
import { useEffect, useState, useRef } from "react";
import Hls from 'hls.js';
// packages
// import ReactHlsPlayer from "react-hls-player";
// import ReactPlayer from "react-player";
import { 
    Avatar,
    Stack,
    Container,
    Paper,
    Typography,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Player from "./player/player";
//..utils
import parseM3U from "./utils/parseM3U";
import { Category } from "@material-ui/icons";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
}));


function VideoPlayer({ currentChannel }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(currentChannel.url);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, function() {
                    videoRef.current.play();
                });
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                // This will work in Safari browser
                videoRef.current.src = currentChannel.url;
                videoRef.current.addEventListener('loadedmetadata', function() {
                    videoRef.current.play();
                });
            }
        }

        return () => {
            if (videoRef.current && Hls.isSupported()) {
                // Destroy Hls instance when the component is to be unmounted
                Hls.destroy();
            }
        };
    }, [currentChannel.url]);

    return (
        <div>
            {currentChannel && (
                <video ref={videoRef} controls data-playsInline data-uk-video width="1920" height="1080"></video>
            )}
        </div>
    );
}


export default function Main({selectedChannelFromAutoComplete, currentCategory}) {

    const [channels, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState('')

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

    // change channel based on autocomplete search term
    useEffect(() => {
        selectedChannelFromAutoComplete && handleChannelClick(selectedChannelFromAutoComplete)
    }, [selectedChannelFromAutoComplete])

    const handleChannelClick = async (channel) => {
        setCurrentChannel(channel)
        window.scrollTo(0, 0);
        try {
            const response = await fetch('/.netlify/functions/increment-channel-views', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tvgId: channel.tvgId }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to increment channel views');
            }
    
        } catch (error) {
            console.error('Error incrementing channel views:', error);
            // Handle error if needed
        }
    }
 
    useEffect(()=>{
        const fetchPlaylist = async () => {
            const response = await fetch(currentCategory.url);
            const data = await response.text();
            return data;
        };
                
        const displayChannels = async () => {
            const playlist = await fetchPlaylist();
            const channels = parseM3U(playlist);

            setChannels(channels);
        };
        console.log(channels)
        displayChannels();
    }, [currentCategory])

    return (
        <div>

            {/* {currentChannel && <Player channel={currentChannel} />} */}
            {currentChannel && <VideoPlayer currentChannel={currentChannel} />}

            <Container>

                <h1 style={{textAlign:"left", fontWeight:"500", color: "#18181B"}}>{currentCategory.name}</h1>
                <Divider />
                <Stack direction="row" flexWrap="wrap" spacing={5}>

                    {channels?.map((channel, index)=>{
                        return (
                            <div className="avatar__wrapper"         style={{
                                flex: '1 1 20%', // Equal width for 3 cards per row with some spacing
                                margin: '10px', // Adjust spacing between cards
                                borderRadius: '20px',
                                overflow: 'hidden', // Ensure consistent heights
                              }}>
                                <Item 
                                    onClick={()=>{handleChannelClick(channel)}}
                                    sx={{ 
                                        my: 1, 
                                        mx: 'auto', 
                                        p: 2, 
                                        cursor:'pointer',
                                        boxShadow:"none",
                                        background: currentChannel.title === channel.title 
                                            ? '#f5f5f5' 
                                            : 'inherit',
                                        '&:hover': {
                                            backgroundColor: '#00000009',
                                        }
                                    }} 
                                >
                                    <Stack
                                        spacing={2} 
                                        direction="row" 
                                        alignItems="center" 
                                        justifyContent="left"
                                        sx={{
                                            boxShadow:"none"
                                        }}
                                    >
                                        <Avatar 
                                            key={channel.title} 
                                            src={channel.tvgLogo} 
                                            sx={{ width: 50, height: 50}}
                                            imgProps={{ style: { objectFit: 'cover' } }}
                                            style={{background:"#00000066"}}
                                            variant="rounded"
                                        />                                    
                                        <Typography wrap
                                            primaryTypographyProps={{ fontSize: 'small', fontWeight: '600', color:'#141414' }}
                                            sx={{
                                                whiteSpace: 'nowrap', // Prevent text from wrapping
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis', // Show ellipsis for long titles
                                                fontSize: 'small',
                                                fontWeight: '600',
                                                color: '#141414'
                                            }}
                                        >{channel.title}</Typography>
                                    </Stack>
                                </Item>
                            </div>
                        )
                    })}
                </Stack>
            </Container>

        </div>
    )
}