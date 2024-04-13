/* global cast, chrome */
import { useEffect, useState, useRef } from "react";
import VideoPlayer from "./player/player";
import {ColorThief} from 'color-thief-react';
import { getColor } from 'color-thief-react';
import { Clapperboard, CarFront, Briefcase, Film, Laugh, ChefHat, Landmark, BookOpenText, GraduationCap, Drama, UsersRound, Shapes, Baby, ScrollText, Coffee, Popcorn, Music2, Newspaper, FlameKindling, Palmtree, Church, Atom, Tv, Store, Bike, Plane, CloudSun, AlertTriangle, Blocks, Menu} from 'lucide-react';

// packages
import { 
    Avatar,
    Stack,
    Container,
    Paper,
    Typography,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';

//..utils
import parseM3U from "./utils/parseM3U";
import { Category, Web } from "@material-ui/icons";
import channelsFromLocal from '../components/utils/channels';

const categories = [
    {
      "name": "Animation",
      "count": 68,
      "url": "https://iptv-org.github.io/iptv/categories/animation.m3u",
      "icon": <Clapperboard size={20} color='#18181B'/>
    },
    {
      "name": "Auto",
      "count": 16,
      "url": "https://iptv-org.github.io/iptv/categories/auto.m3u",
      "icon": <CarFront size={20} color='#18181B'/>
    },
    {
      "name": "Business",
      "count": 66,
      "url": "https://iptv-org.github.io/iptv/categories/business.m3u",
      "icon": <Briefcase size={20} color='#18181B'/>
    },
    {
      "name": "Classic",
      "count": 55,
      "url": "https://iptv-org.github.io/iptv/categories/classic.m3u",
      "icon": <Film size={20} color='#18181B'/>
    },
    {
      "name": "Comedy",
      "count": 53,
      "url": "https://iptv-org.github.io/iptv/categories/comedy.m3u",
      "icon": <Laugh size={20} color='#18181B'/>
    },
    {
      "name": "Cooking",
      "count": 23,
      "url": "https://iptv-org.github.io/iptv/categories/cooking.m3u",
      "icon": <ChefHat size={20} color='#18181B'/>
    },
    {
      "name": "Culture",
      "count": 91,
      "url": "https://iptv-org.github.io/iptv/categories/culture.m3u",
      "icon": <Landmark size={20} color='#18181B'/>
    },
    {
      "name": "Documentary",
      "count": 64,
      "url": "https://iptv-org.github.io/iptv/categories/documentary.m3u",
      "icon": <BookOpenText size={20} color='#18181B'/>
    },
    {
      "name": "Education",
      "count": 106,
      "url": "https://iptv-org.github.io/iptv/categories/education.m3u",
      "icon": <GraduationCap size={20} color="#18181B"/>
    },
    {
      "name": "Entertainment",
      "count": 390,
      "url": "https://iptv-org.github.io/iptv/categories/entertainment.m3u",
      "icon": <Drama size={20} color="#18181B"/>
    },
    {
      "name": "Family",
      "count": 43,
      "url": "https://iptv-org.github.io/iptv/categories/family.m3u",
      "icon": <UsersRound size={20} color="#18181B"/>
    },
    {
      "name": "General",
      "count": 1361,
      "url": "https://iptv-org.github.io/iptv/categories/general.m3u",
      "icon": <Shapes size={20} color="#18181B"/>
    },
    {
      "name": "Kids",
      "count": 201,
      "url": "https://iptv-org.github.io/iptv/categories/kids.m3u",
      "icon": <Baby size={20} color="#18181B"/>
    },
    {
      "name": "Legislative",
      "count": 174,
      "url": "https://iptv-org.github.io/iptv/categories/legislative.m3u",
      "icon": <ScrollText size={20} color="#18181B"/>
    },
    {
      "name": "Lifestyle",
      "count": 81,
      "url": "https://iptv-org.github.io/iptv/categories/lifestyle.m3u",
      "icon": <Coffee size={20} color="#18181B"/>
    },
    {
      "name": "Movies",
      "count": 295,
      "url": "https://iptv-org.github.io/iptv/categories/movies.m3u",
      "icon": <Popcorn size={20} color="#18181B"/>
    },
    {
      "name": "Music",
      "count": 556,
      "url": "https://iptv-org.github.io/iptv/categories/music.m3u",
      "icon": <Music2 size={20} color="#18181B"/>
    },
    {
      "name": "News",
      "count": 762,
      "url": "https://iptv-org.github.io/iptv/categories/news.m3u",
      "icon": <Newspaper size={20} color="#18181B"/>
    },
    {
      "name": "Outdoor",
      "count": 43,
      "url": "https://iptv-org.github.io/iptv/categories/outdoor.m3u",
      "icon": <FlameKindling size={20} color="#18181B"/>
    },
    {
      "name": "Relax",
      "count": 8,
      "url": "https://iptv-org.github.io/iptv/categories/relax.m3u",
      "icon": <Palmtree size={20} color="#18181B"/>
    },
    {
      "name": "Religious",
      "count": 524,
      "url": "https://iptv-org.github.io/iptv/categories/religious.m3u",
      "icon": <Church size={20} color="#18181B"/>
    },
    {
      "name": "Science",
      "count": 24,
      "url": "https://iptv-org.github.io/iptv/categories/science.m3u",
      "icon": <Atom size={20} color="#18181B"/>
    },
    {
      "name": "Series",
      "count": 160,
      "url": "https://iptv-org.github.io/iptv/categories/series.m3u",
      "icon": <Tv size={20} color="#18181B"/>
    },
    {
      "name": "Shop",
      "count": 78,
      "url": "https://iptv-org.github.io/iptv/categories/shop.m3u",
      "icon": <Store size={20} color="#18181B"/>
    },
    {
      "name": "Sports",
      "count": 204,
      "url": "https://iptv-org.github.io/iptv/categories/sports.m3u",
      "icon": <Bike size={20} color="#18181B"/>
    },
    {
      "name": "Travel",
      "count": 28,
      "url": "https://iptv-org.github.io/iptv/categories/travel.m3u",
      "icon": <Plane size={20} color="#18181B"/>
    },
    {
      "name": "Weather",
      "count": 13,
      "url": "https://iptv-org.github.io/iptv/categories/weather.m3u",
      "icon": <CloudSun size={20} color="#18181B"/>
    },
    // {
    //   "name": "XXX",
    //   "count": 61,
    //   "url": "https://iptv-org.github.io/iptv/categories/xxx.m3u",
    //   "icon": <AlertTriangle size={20} color="#18181B"/>
    // },
    {
      "name": "Undefined",
      "count": 5122,
      "url": "https://iptv-org.github.io/iptv/categories/undefined.m3u",
      "icon": <Blocks size={20} color="#18181B"/>
    }
]

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
}));


function ChannelCard({ channel, currentChannel, handleChannelClick }) {
    const isDragging = useRef(false);
  
    const handleDragStart = () => {
      isDragging.current = true;
    };
  
    const handleDragEnd = () => {
      setTimeout(() => { isDragging.current = false; }, 0);
      // The timeout ensures that the click event that might fire immediately after
      // dragend will still see isDragging.current as true.
    };
  
    const handleClick = () => {
      if (!isDragging.current) {
        handleChannelClick(channel)
      }
    };
  
    return (
        <div  
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={()=>{handleClick(channel)}}
            style={{
                border: channel?.title == currentChannel?.title ? '3px solid #ffeb3b' : 'none',
                borderRadius: channel?.title == currentChannel?.title ? '5px' : 'none',
                overflow: channel?.title == currentChannel?.title ? 'hidden' : 'visible',
                padding: 0
            }}
        >
            <div className="uk-card uk-card-default">
                <div className="uk-card-media-top" 
                    style={{ 
                        height: '200px', 
                        cursor:'pointer', 
                        width: '100%', 
                        overflow: 'hidden', 
                        background: "#0a0a0a", 
                        boxShadow:"none",
                        display:"flex",
                        alignItems: 'center',
                    }}>
                    <img src={channel.tvgLogo} style={{
                        width: '100%',    // Makes the image fill the container
                        height: '170px',  // Fixed height for all images
                        objectFit: 'contain',  // Ensures the image covers the area without distorting aspect ratio
                        padding:"25px",
                        objectPosition: 'center'  // Centers the image within the element bounds
                    }} alt=""/>
                </div>
                
            </div>
        </div>
    );
  }


export default function Main({selectedChannelFromAutoComplete, currentCategory}) {

    const [channels, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState('')

    // const initializeCastApi = () => {
    //     cast.framework.CastContext.getInstance().setOptions({
    //         receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    //         autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    //     });
    // };
    
    // useEffect(() => {
    //     window['__onGCastApiAvailable'] = function(isAvailable) {
    //         if (isAvailable) {
    //             initializeCastApi();
    //         }
    //     };
    // }, []);

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
 
    // useEffect(()=>{
    //     const fetchPlaylist = async () => {
    //         const response = await fetch(currentCategory.url);
    //         const data = await response.text();
    //         return data;
    //     };
                
    //     const displayChannels = async () => {
    //         const playlist = await fetchPlaylist();
    //         const channels = parseM3U(playlist);

    //         setChannels(channels);
    //     };
    //     console.log(channels)
    //     displayChannels();
    // }, [currentCategory])

    useEffect(() => {
        // console.log("channelsFromLocal: ", channelsFromLocal)
        // setChannels(channelsFromLocal.filter(channel => channel.groupTitle == currentCategory.name))
        // console.log("categories: ", categories)
    }, [])

    function formatChannelTitle(title) {
            // Remove unwanted patterns first: resolution info and bracketed content
        title = title.replace(/\(\d+p\)/g, '')   // Removes resolution info like "(1080p)"
            .replace(/\[.*?\]/g, '')   // Removes any content in brackets like "[Geo-blocked]"
            .trim();                    // Trims leading and trailing whitespace

        // Normalize spaces: replace multiple spaces with a single space if they occur
        title = title.replace(/\s+/g, ' ');

        return title;
    }
    // preprocessChannels(channels).then(channelsWithBackground => {
    //     console.log("channelsWithBackground: ", channelsWithBackground)
    //     setChannels(channelsWithBackground)
    // })


    // Format channels title
    // preprocessChannels(channels).then(channelsWithBackground => {
    //     setChannels(channelsWithBackground)
    // });
    function handleDrag(e) {
        console.log('dragStart')
        e.preventDefault();
    }

    const formattedChannels = channels.map(channel => ({
        ...channel,
        title: formatChannelTitle(channel.title)
    }));

    return (

        <div style={{background: 'black'}}>

            {currentChannel && (
                <div className="uk-section" style={{position:"sticky", top:"20px", background: "black", zIndex:"1"}}>
                    <div className="uk-container" >
                        <h2 style={{color:'white'}}>{formatChannelTitle(currentChannel.title)}</h2>
                        <VideoPlayer currentChannel={currentChannel} />
                    </div>
                </div>
            )}

            <div className="uk-section" style={{paddingTop:'0px'}}>
                <div className="uk-container" style={{maxWidth:"95vw", boxSizing:"border-box", margin:"1em auto"}}>
                    {
                        categories.slice(0, 4).map(
                            category => {
                                return (
                                    <>
                                        <h4 key={category.name} style={{textAlign: 'left', fontWeight:'500', color:'#fff'}}>{category.name}</h4>
                                        <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" data-uk-slider>
                                            <div 
                                                className="uk-slider-items uk-child-width-1-2 uk-child-width-1-5@m uk-grid"
                                                style={{ display: 'flex', gap:"15px", padding:"15px", marginLeft:"0"}}
                                            >
                                                {/* <div>
                                                    <div className="uk-panel">
                                                        <img src="images/slider5.jpg" width="400" height="600" alt="">
                                                        <div className="uk-position-center uk-panel"><h1>10</h1></div>
                                                    </div>
                                                </div> */}
                                                {
                                                    channelsFromLocal.filter(channel => channel.groupTitle == category.name).map(channel => {
                                                        
                                                        return (
                                                            <ChannelCard key={channel.title} channel={channel} currentChannel={currentChannel} handleChannelClick={handleChannelClick}/>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <a className="uk-position-center-left uk-position-small uk-hidden-hover" data-href data-uk-slidenav-previous data-uk-slider-item="previous"></a>
                                            <a className="uk-position-center-right uk-position-small uk-hidden-hover" data-href data-uk-slidenav-next data-uk-slider-item="next"></a>

                                        </div>
                                    </>
                                    
                                )
                            }
                        )
                    }
                </div>
            </div>

            <Container style={{display: "none"}}>

                <h1 style={{textAlign:"left", color: "#18181B"}}>{currentCategory.name}</h1>
                <Divider />
                <div className="uk-section">
                    <div className="uk-container">             
                        <div className="uk-child-width-1-6@m uk-flex uk-flex-wrap" style={{gap: "15px"}}>
                            {formattedChannels?.map((channel, index)=>{
                                return (
                                    <div >
                                        <div className="uk-card uk-card-default">
                                            <div className="uk-card-media-top" style={{ height: '150px', width: '100%', overflow: 'hidden', background: "#000" }}>
                                                <img src={channel.tvgLogo} style={{
                                                    width: '100%',    // Makes the image fill the container
                                                    height: '150px',  // Fixed height for all images
                                                    objectFit: 'contain',  // Ensures the image covers the area without distorting aspect ratio
                                                    padding:"25px",
                                                    objectPosition: 'center'  // Centers the image within the element bounds
                                                }} alt=""/>
                                            </div>
                                            <div className="uk-card-body" style={{ padding: '15px', minHeight: '110px', background: "#000" }}>
                                                {/* <h3 className="uk-card-title">{channel.title}</h3> */}
                                                <p style={{
                                                    fontSize: '16px',      // Uniform font size
                                                    fontWeight: 'bold',    // Bold font for titles
                                                    overflow: 'hidden',
                                                    color:"white",    // Prevents text from spilling outside the container
                                                    textOverflow: 'ellipsis',  // Adds an ellipsis if the text overflows
                                                    whiteSpace: 'wrap',  // Keeps the title in a single line
                                                    margin: '0 0 10px 0'   // Adds space below the title (top, right, bottom, left)
                                                }}>{channel.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                                // return (
                                //     <div className="avatar__wrapper"         style={{
                                //         flex: '1 1 20%', // Equal width for 3 cards per row with some spacing
                                //         margin: '10px', // Adjust spacing between cards
                                //         borderRadius: '20px',
                                //         overflow: 'hidden', // Ensure consistent heights
                                //       }}>
                                //         <Item 
                                //             onClick={()=>{handleChannelClick(channel)}}
                                //             sx={{ 
                                //                 my: 1, 
                                //                 mx: 'auto', 
                                //                 p: 2, 
                                //                 cursor:'pointer',
                                //                 boxShadow:"none",
                                //                 background: currentChannel.title === channel.title 
                                //                     ? '#f5f5f5' 
                                //                     : 'inherit',
                                //                 '&:hover': {
                                //                     backgroundColor: '#00000009',
                                //                 }
                                //             }} 
                                //         >
                                //             <Stack
                                //                 spacing={2} 
                                //                 direction="row" 
                                //                 alignItems="center" 
                                //                 justifyContent="left"
                                //                 sx={{
                                //                     boxShadow:"none"
                                //                 }}
                                //             >
                                //                 <Avatar 
                                //                     key={channel.title} 
                                //                     src={channel.tvgLogo} 
                                //                     sx={{ width: 50, height: 50}}
                                //                     imgProps={{ style: { objectFit: 'cover' } }}
                                //                     style={{background:"#00000066"}}
                                //                     variant="rounded"
                                //                 />                                    
                                //                 <Typography wrap
                                //                     primaryTypographyProps={{ fontSize: 'small', fontWeight: '600', color:'#141414' }}
                                //                     sx={{
                                //                         whiteSpace: 'nowrap', // Prevent text from wrapping
                                //                         overflow: 'hidden',
                                //                         textOverflow: 'ellipsis', // Show ellipsis for long titles
                                //                         fontSize: 'small',
                                //                         fontWeight: '600',
                                //                         color: '#141414'
                                //                     }}
                                //                 >{channel.title}</Typography>
                                //             </Stack>
                                //         </Item>
                                //     </div>
                                // )
                            })}
                        </div>           
                        
                    </div>
                </div>
            </Container>

        </div>
    )
}