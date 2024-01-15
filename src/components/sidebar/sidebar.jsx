import * as React from 'react';
import { useState } from 'react';
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
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Mail, Menu, Inbox, Star, Theaters, DirectionsCar, BusinessCenter, Movie, SentimentSatisfiedAlt, Restaurant, Museum, Description, School, People, Category, ChildFriendly, AccountBalance, EmojiEmotions, MusicNote, Landscape, BeachAccess, Filter, Tv, Store, SportsSoccer, Flight, WbSunny, Warning, HelpOutline} from '@material-ui/icons';


const drawerWidth = 240;
const categories = [
    {
      "name": "Animation",
      "count": 68,
      "url": "https://iptv-org.github.io/iptv/categories/animation.m3u",
      "icon": <Theaters style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Auto",
      "count": 16,
      "url": "https://iptv-org.github.io/iptv/categories/auto.m3u",
      "icon": <DirectionsCar style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Business",
      "count": 66,
      "url": "https://iptv-org.github.io/iptv/categories/business.m3u",
      "icon": <BusinessCenter style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Classic",
      "count": 55,
      "url": "https://iptv-org.github.io/iptv/categories/classic.m3u",
      "icon": <Movie style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Comedy",
      "count": 53,
      "url": "https://iptv-org.github.io/iptv/categories/comedy.m3u",
      "icon": <SentimentSatisfiedAlt style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Cooking",
      "count": 23,
      "url": "https://iptv-org.github.io/iptv/categories/cooking.m3u",
      "icon": <Restaurant style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Culture",
      "count": 91,
      "url": "https://iptv-org.github.io/iptv/categories/culture.m3u",
      "icon": <Museum style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Documentary",
      "count": 64,
      "url": "https://iptv-org.github.io/iptv/categories/documentary.m3u",
      "icon": <Description style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Education",
      "count": 106,
      "url": "https://iptv-org.github.io/iptv/categories/education.m3u",
      "icon": <School style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Entertainment",
      "count": 390,
      "url": "https://iptv-org.github.io/iptv/categories/entertainment.m3u",
      "icon": <Theaters style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Family",
      "count": 43,
      "url": "https://iptv-org.github.io/iptv/categories/family.m3u",
      "icon": <People style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "General",
      "count": 1361,
      "url": "https://iptv-org.github.io/iptv/categories/general.m3u",
      "icon": <Category style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Kids",
      "count": 201,
      "url": "https://iptv-org.github.io/iptv/categories/kids.m3u",
      "icon": <ChildFriendly style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Legislative",
      "count": 174,
      "url": "https://iptv-org.github.io/iptv/categories/legislative.m3u",
      "icon": <AccountBalance style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Lifestyle",
      "count": 81,
      "url": "https://iptv-org.github.io/iptv/categories/lifestyle.m3u",
      "icon": <EmojiEmotions style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Movies",
      "count": 295,
      "url": "https://iptv-org.github.io/iptv/categories/movies.m3u",
      "icon": <Movie style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Music",
      "count": 556,
      "url": "https://iptv-org.github.io/iptv/categories/music.m3u",
      "icon": <MusicNote style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "News",
      "count": 762,
      "url": "https://iptv-org.github.io/iptv/categories/news.m3u",
      "icon": <Mail style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Outdoor",
      "count": 43,
      "url": "https://iptv-org.github.io/iptv/categories/outdoor.m3u",
      "icon": <Landscape style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Relax",
      "count": 8,
      "url": "https://iptv-org.github.io/iptv/categories/relax.m3u",
      "icon": <BeachAccess style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Religious",
      "count": 524,
      "url": "https://iptv-org.github.io/iptv/categories/religious.m3u",
      "icon": <EmojiEmotions style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Science",
      "count": 24,
      "url": "https://iptv-org.github.io/iptv/categories/science.m3u",
      "icon": <Filter style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Series",
      "count": 160,
      "url": "https://iptv-org.github.io/iptv/categories/series.m3u",
      "icon": <Tv style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Shop",
      "count": 78,
      "url": "https://iptv-org.github.io/iptv/categories/shop.m3u",
      "icon": <Store style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Sports",
      "count": 204,
      "url": "https://iptv-org.github.io/iptv/categories/sports.m3u",
      "icon": <SportsSoccer style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Travel",
      "count": 28,
      "url": "https://iptv-org.github.io/iptv/categories/travel.m3u",
      "icon": <Flight style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Weather",
      "count": 13,
      "url": "https://iptv-org.github.io/iptv/categories/weather.m3u",
      "icon": <WbSunny style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "XXX",
      "count": 61,
      "url": "https://iptv-org.github.io/iptv/categories/xxx.m3u",
      "icon": <Warning style={{fontSize: "18px", width:"65px"}}/>
    },
    {
      "name": "Undefined",
      "count": 5122,
      "url": "https://iptv-org.github.io/iptv/categories/undefined.m3u",
      "icon": <HelpOutline style={{fontSize: "18px", width:"65px"}}/>
    }
  ]

export default function PermanentDrawerLeft({children}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isDesktop);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  const handleOnCategoryClick = (category) => {
    setCurrentCategory(category)
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" 
        sx={{ 
            zIndex: isDesktop ? theme.zIndex.drawer + 1 : theme.zIndex.appBar,
            minHeight: '30px',        // Set the height to 30px
            background: 'white', // Set the background color to white
            boxShadow: 'none',
            borderBottom: "1px solid #ccc"     // Remove the shadow
            }}
      >
        <Toolbar>
            {!isDesktop && (
                <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                    mr: 2,
                  }}
                >
                <Menu />
                </IconButton>
          )}
          <Typography variant="h6" noWrap color="#141414" component="div">
            freetv
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Hidden smDown implementation="css">
        <Drawer
            className='drawer-scrollbar'
            sx={{
            width: drawerWidth,
            flexShrink: 0,
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
                        sx={{ paddingLeft: '10px' }} // Adds padding of 40px to all sides
                    />
                </ListItem>
                {categories.map((category, index) => (
                <ListItem 
                    key={`CategoryItem-${index}`} disablePadding
                    sx={{
                        background: currentCategory.name === category.name ? '#0000000a' : 'inherit'
                    }}
                >
                    <ListItemButton 
                        onClick={() => { handleOnCategoryClick(category)}}
                        sx={{
                            padding: "3px 0",
                            margin:"3px 0"
                        }}
                    >
                        <ListItemIcon sx={{maxWidth: "40px", minWidth:"40px"}}>
                            {category.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={category.name} 
                            primaryTypographyProps={{ fontSize: 'small', fontWeight: '600', color:'#141414' }}
                            sx={{ marginLeft: 1 }} // Add some left margin for spacing
                        />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </Drawer>
      </Hidden>
      <Container
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3}}
      >
        <Toolbar />
        <Main currentCategory={currentCategory} />
      </Container>
    </Box>
  );
}