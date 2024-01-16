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
import { Clapperboard, CarFront, Briefcase, Film, Laugh, ChefHat, Landmark, BookOpenText, GraduationCap, Drama, UsersRound, Shapes, Baby, ScrollText, Coffee, Popcorn, Music2, Newspaper, FlameKindling, Palmtree, Church, Atom, Tv, Store, Bike, Plane, CloudSun, AlertTriangle, Blocks, Menu} from 'lucide-react';


const drawerWidth = 240;
const categories = [
    {
      "name": "Animation",
      "count": 68,
      "url": "https://iptv-org.github.io/iptv/categories/animation.m3u",
      "icon": <Clapperboard size={20}/>
    },
    {
      "name": "Auto",
      "count": 16,
      "url": "https://iptv-org.github.io/iptv/categories/auto.m3u",
      "icon": <CarFront size={20}/>
    },
    {
      "name": "Business",
      "count": 66,
      "url": "https://iptv-org.github.io/iptv/categories/business.m3u",
      "icon": <Briefcase size={20}/>
    },
    {
      "name": "Classic",
      "count": 55,
      "url": "https://iptv-org.github.io/iptv/categories/classic.m3u",
      "icon": <Film size={20}/>
    },
    {
      "name": "Comedy",
      "count": 53,
      "url": "https://iptv-org.github.io/iptv/categories/comedy.m3u",
      "icon": <Laugh size={20}/>
    },
    {
      "name": "Cooking",
      "count": 23,
      "url": "https://iptv-org.github.io/iptv/categories/cooking.m3u",
      "icon": <ChefHat size={20}/>
    },
    {
      "name": "Culture",
      "count": 91,
      "url": "https://iptv-org.github.io/iptv/categories/culture.m3u",
      "icon": <Landmark size={20}/>
    },
    {
      "name": "Documentary",
      "count": 64,
      "url": "https://iptv-org.github.io/iptv/categories/documentary.m3u",
      "icon": <BookOpenText size={20}/>
    },
    {
      "name": "Education",
      "count": 106,
      "url": "https://iptv-org.github.io/iptv/categories/education.m3u",
      "icon": <GraduationCap size={20} />
    },
    {
      "name": "Entertainment",
      "count": 390,
      "url": "https://iptv-org.github.io/iptv/categories/entertainment.m3u",
      "icon": <Drama size={20} />
    },
    {
      "name": "Family",
      "count": 43,
      "url": "https://iptv-org.github.io/iptv/categories/family.m3u",
      "icon": <UsersRound size={20} />
    },
    {
      "name": "General",
      "count": 1361,
      "url": "https://iptv-org.github.io/iptv/categories/general.m3u",
      "icon": <Shapes size={20} />
    },
    {
      "name": "Kids",
      "count": 201,
      "url": "https://iptv-org.github.io/iptv/categories/kids.m3u",
      "icon": <Baby size={20} />
    },
    {
      "name": "Legislative",
      "count": 174,
      "url": "https://iptv-org.github.io/iptv/categories/legislative.m3u",
      "icon": <ScrollText size={20} />
    },
    {
      "name": "Lifestyle",
      "count": 81,
      "url": "https://iptv-org.github.io/iptv/categories/lifestyle.m3u",
      "icon": <Coffee size={20} />
    },
    {
      "name": "Movies",
      "count": 295,
      "url": "https://iptv-org.github.io/iptv/categories/movies.m3u",
      "icon": <Popcorn size={20} />
    },
    {
      "name": "Music",
      "count": 556,
      "url": "https://iptv-org.github.io/iptv/categories/music.m3u",
      "icon": <Music2 size={20} />
    },
    {
      "name": "News",
      "count": 762,
      "url": "https://iptv-org.github.io/iptv/categories/news.m3u",
      "icon": <Newspaper size={20} />
    },
    {
      "name": "Outdoor",
      "count": 43,
      "url": "https://iptv-org.github.io/iptv/categories/outdoor.m3u",
      "icon": <FlameKindling size={20} />
    },
    {
      "name": "Relax",
      "count": 8,
      "url": "https://iptv-org.github.io/iptv/categories/relax.m3u",
      "icon": <Palmtree size={20} />
    },
    {
      "name": "Religious",
      "count": 524,
      "url": "https://iptv-org.github.io/iptv/categories/religious.m3u",
      "icon": <Church size={20} />
    },
    {
      "name": "Science",
      "count": 24,
      "url": "https://iptv-org.github.io/iptv/categories/science.m3u",
      "icon": <Atom size={20} />
    },
    {
      "name": "Series",
      "count": 160,
      "url": "https://iptv-org.github.io/iptv/categories/series.m3u",
      "icon": <Tv size={20} />
    },
    {
      "name": "Shop",
      "count": 78,
      "url": "https://iptv-org.github.io/iptv/categories/shop.m3u",
      "icon": <Store size={20} />
    },
    {
      "name": "Sports",
      "count": 204,
      "url": "https://iptv-org.github.io/iptv/categories/sports.m3u",
      "icon": <Bike size={20} />
    },
    {
      "name": "Travel",
      "count": 28,
      "url": "https://iptv-org.github.io/iptv/categories/travel.m3u",
      "icon": <Plane size={20} />
    },
    {
      "name": "Weather",
      "count": 13,
      "url": "https://iptv-org.github.io/iptv/categories/weather.m3u",
      "icon": <CloudSun size={20} />
    },
    {
      "name": "XXX",
      "count": 61,
      "url": "https://iptv-org.github.io/iptv/categories/xxx.m3u",
      "icon": <AlertTriangle size={20} />
    },
    {
      "name": "Undefined",
      "count": 5122,
      "url": "https://iptv-org.github.io/iptv/categories/undefined.m3u",
      "icon": <Blocks size={20} />
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
                <Menu color="#141414"/>
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
                        sx={{ paddingLeft: '3px' }} // Adds padding of 40px to all sides
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
                        <ListItemIcon sx={{maxWidth: "40px", minWidth:"40px", justifyContent:"end"}}>
                            {category.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={category.name} 
                            primaryTypographyProps={{ fontSize: 'small', fontWeight: '600', color:'#333' }}
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