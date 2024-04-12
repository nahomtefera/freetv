import * as React from 'react';
import { useState, useEffect } from 'react';
import Main from '../main';
import './sidebar.css'
import { 
    Hidden,
    Box, 
    Drawer, 
    CssBaseline, 
    AppBar,
    IconButton,
    Toolbar,
    List,
    Typography,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon, 
    ListItemText,
    Container,
    useMediaQuery,
    Autocomplete,
    TextField,
    Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Clapperboard, CarFront, Briefcase, Film, Laugh, ChefHat, Landmark, BookOpenText, GraduationCap, Drama, UsersRound, Shapes, Baby, ScrollText, Coffee, Popcorn, Music2, Newspaper, FlameKindling, Palmtree, Church, Atom, Tv, Store, Bike, Plane, CloudSun, AlertTriangle, Blocks, Menu} from 'lucide-react';
import parseM3U from '../utils/parseM3U';


const drawerWidth = 240;
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

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

export default function PermanentDrawerLeft({children}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isDesktop);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [allChannels, setAllChannels] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [selectedChannelFromAutoComplete, setSelectedChannelFromAutoComplete] = useState(null)

  const handleOnCategoryClick = (category) => {
    setCurrentCategory(category)
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const allChannels = [];

    Promise.all(categories.map(category => 
      fetch(category.url)
        .then(response => response.text())
        .then(data => {
          const parsedChannels = parseM3U(data, category);
          allChannels.push(...parsedChannels);
        })
    )).then(() => {
      setAllChannels(allChannels);
    });
  }, []);


  const debouncedHandleSearchTermChange = debounce((newSearchTerm) => {
    console.log("newSearchTerm: ", newSearchTerm);
    setSearchTerm(newSearchTerm);
    if (newSearchTerm && newSearchTerm !== "" && typeof newSearchTerm === 'string') {
      const filteredOptions = allChannels.filter((channel) =>
        channel.title.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
      setFilteredChannels(filteredOptions.slice(0, 50));
    } else {
      setFilteredChannels([]);
    }
  }, 300); // Adjust debounce delay as needed (300ms in this example)

  const handleSelectChannel = (event, selectedChannelTitle) => {
    // Find the selected channel object based on its title
    const selectedChannel = allChannels.find(
      (channel) => channel.title === selectedChannelTitle
    );
    setSelectedChannelFromAutoComplete(selectedChannel)
    console.log("Selected channel:", selectedChannel);
    // Do something with the selected channel
  };

  return (
    <Box sx={{ display: 'block' }}>
      <CssBaseline />
      <AppBar position="relative"
        sx={{ 
            zIndex: isDesktop ? theme.zIndex.drawer + 1 : theme.zIndex.appBar,
            minHeight: '30px',        // Set the height to 30px
            background: '#ffeb3b', // Set the background color to white
            boxShadow: 'none',
            borderBottom: "1px solid #ccc",    // Remove the shadow
            
          }}
      >
        <Toolbar sx={{
          justifyContent: isDesktop ? 'center' : 'center', 
          padding: ".5em 15px .5em 5px  ",
          gap: "10px"
        }}>
          <Typography variant="h6" flexShrink={0} noWrap color="#18181B" component="div">
            freetv
          </Typography>
          <Stack spacing={2} sx={{ width: isDesktop ? 600: 350, paddingLeft: isDesktop ? "3em" :"auto" }}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              style={{fontWeight: "bold"}}
              value={searchTerm}
              options={filteredChannels.map((option) => option.title)}
              getOptionLabel={(option) => String(option)}
              onChange={(event, selectedChannelTitle)=>{handleSelectChannel(event, selectedChannelTitle)}}
              onInputChange={(event, newSearchTerm) => debouncedHandleSearchTermChange(newSearchTerm)  }
              renderInput={(params) => <TextField {...params} label="Search Channel" />}
            />
          </Stack>
        </Toolbar>
      </AppBar>
      
      <Hidden smDown implementation="css" >
        <Drawer
            className='drawer-scrollbar'
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            display:"none",
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                overflow: 'auto',
                // Add the class for the custom scrollbar styles
                '&::-webkit-scrollbar': {
                    display: 'none', // for Chrome, Safari, and Opera
                  },
                scrollbarWidth: 'none', // for Firefox
                '-ms-overflow-style': 'none', // for Internet Explorer 10+            
              },
            }}
            variant={isDesktop ? 'permanent' : 'temporary'}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            anchor="left"
        >
            <Toolbar />

            <List>
                <ListItem key="Categories">
                {/* Invisible ListItemIcon for alignment */}
                    <ListItemText 
                        primary='Categories' 
                        primaryTypographyProps={{ fontSize: 'medium', fontWeight: 'bold' }}
                        sx={{ paddingLeft: '16px' }} // Adds padding of 40px to all sides
                    />
                </ListItem>
                {categories.map((category, index) => (
                <ListItem 
                    key={`CategoryItem-${index}`} disablePadding
                    sx={{
                        width: "90%",
                        margin: "0 auto",
                    }}
                >
                    <ListItemButton 
                        onClick={() => { handleOnCategoryClick(category)}}
                        sx={{
                            padding: "5px 0",
                            margin:"2px 0",
                            borderRadius: "10px",
                            background: currentCategory.name === category.name ? '#f5f5f5' : 'inherit',
                        }}
                    >
                        <ListItemIcon sx={{maxWidth: "40px", minWidth:"40px", justifyContent:"end"}}>
                            {category.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={category.name} 
                            primaryTypographyProps={{ 
                                fontSize: '14px', 
                                fontWeight: '600', 
                                color:'#18181B',
                                fontFamily: `'Open Sans', sans-serif`
                            }}
                            sx={{ marginLeft: 1 }} // Add some left margin for spacing
                        />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </Drawer>
      </Hidden>

      <Main selectedChannelFromAutoComplete={selectedChannelFromAutoComplete} currentCategory={currentCategory} filteredChannels/>
    </Box>
  );
}