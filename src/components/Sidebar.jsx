import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import HistoryIcon from '@mui/icons-material/History'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import SchoolIcon from '@mui/icons-material/School'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import CodeIcon from '@mui/icons-material/Code'

const categories = [
  { icon: <HomeIcon />, label: 'Home', value: 'New' },
  { icon: <WhatshotIcon />, label: 'Trending', value: 'Trending' },
  { icon: <SubscriptionsIcon />, label: 'Subscriptions', value: 'Subscriptions' },
]

const exploreCategories = [
  { icon: <MusicNoteIcon />, label: 'Music', value: 'Music' },
  { icon: <SportsEsportsIcon />, label: 'Gaming', value: 'Gaming' },
  { icon: <LiveTvIcon />, label: 'Live', value: 'Live' },
  { icon: <SchoolIcon />, label: 'Education', value: 'Education' },
  { icon: <FitnessCenterIcon />, label: 'Gym', value: 'Gym' },
  { icon: <CodeIcon />, label: 'Coding', value: 'Coding' },
]

const SidebarCategory = ({ icon, label, selectedCategory, onSelect, value }) => (
  <ListItem disablePadding>
    <ListItemButton
      onClick={() => onSelect(value)}
      sx={{
        borderRadius: '10px',
        mb: '2px',
        backgroundColor: selectedCategory === value ? '#272727' : 'transparent',
        '&:hover': { backgroundColor: '#272727' },
      }}
    >
      <ListItemIcon sx={{ color: selectedCategory === value ? '#ff0000' : '#aaaaaa', minWidth: '36px' }}>
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        sx={{ '& span': { fontSize: '14px', color: selectedCategory === value ? 'white' : '#aaaaaa' } }}
      />
    </ListItemButton>
  </ListItem>
)

const Sidebar = ({ selectedCategory, onSelectCategory }) => (
  <Box
    sx={{
      width: '220px',
      minHeight: '100vh',
      backgroundColor: '#0f0f0f',
      px: 1,
      pt: 2,
      display: { xs: 'none', md: 'block' },
    }}
  >
    <List dense>
      {categories.map((cat) => (
        <SidebarCategory
          key={cat.value}
          {...cat}
          selectedCategory={selectedCategory}
          onSelect={onSelectCategory}
        />
      ))}
    </List>

    <Divider sx={{ backgroundColor: '#272727', my: 1 }} />

    <Box sx={{ px: 2, py: 1 }}>
      <ListItemText
        primary="Explore"
        sx={{ '& span': { fontSize: '12px', color: '#aaaaaa', fontWeight: 600, letterSpacing: '0.5px' } }}
      />
    </Box>

    <List dense>
      {exploreCategories.map((cat) => (
        <SidebarCategory
          key={cat.value}
          {...cat}
          selectedCategory={selectedCategory}
          onSelect={onSelectCategory}
        />
      ))}
    </List>

    <Divider sx={{ backgroundColor: '#272727', my: 1 }} />

    <Box sx={{ px: 2, py: 1 }}>
      <ListItemText
        primary="© 2024 UTube"
        sx={{ '& span': { fontSize: '11px', color: '#717171' } }}
      />
    </Box>
  </Box>
)

export default Sidebar