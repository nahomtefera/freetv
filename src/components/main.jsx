/* global cast, chrome */
import { useEffect, useState } from "react";
// packages
// import ReactHlsPlayer from "react-hls-player";
// import ReactPlayer from "react-player";
import { 
    Avatar,
    Stack,
    Container,
    Paper,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Player from "./player/player";
//..utils
import parseM3U from "./utils/parseM3U";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
}));

export default function Main({categoryURL}) {

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

    const handleChannelClick = (channel) => {
        setCurrentChannel(channel)
        window.scrollTo(0, 0);
    }
 
    useEffect(()=>{
        const fetchPlaylist = async () => {
            const response = await fetch(categoryURL);
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
    }, [categoryURL])

    return (
        <div>

            <br></br>
            {currentChannel && <Player channel={currentChannel} />}
            <br /><br /><br />
            
            <Container>
                <Stack direction="row" flexWrap="wrap" spacing={5}>

                    {channels?.map((channel, index)=>{
                        return (
                            <div className="avatar__wrapper"         style={{
                                flex: '1 1 20%', // Equal width for 3 cards per row with some spacing
                                margin: '10px', // Adjust spacing between cards
                                borderRadius: '4px',
                                overflow: 'hidden', // Ensure consistent heights
                              }}>
                                <Item 
                                    onClick={()=>{handleChannelClick(channel)}}
                                    sx={{ my: 1, mx: 'auto', p: 2, cursor:'pointer'}} 
                                >
                                    <Stack spacing={2} direction="row" alignItems="center" justifyContent="left">
                                        <Avatar 
                                            key={channel.title} 
                                            src={channel.tvgLogo} 
                                            sx={{ width: 80, height: 80 }}
                                            style={{background:"#f0f0f0"}}
                                        />                                    
                                        <Typography wrap
                                            sx={{
                                                whiteSpace: 'nowrap', // Prevent text from wrapping
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis', // Show ellipsis for long titles
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