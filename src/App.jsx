import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from './components/Navbar'
import Feed from './pages/Feed'
import VideoDetail from './pages/VideoDetail'
import ChannelDetail from './pages/ChannelDetail'
import SearchFeed from './pages/SearchFeed'

const App = () => (
  <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
    <Navbar />
    <Routes>
      <Route path='/' element={<Feed />} />
      <Route path='/video/:id' element={<VideoDetail />} />
      <Route path='/channel/:id' element={<ChannelDetail />} />
      <Route path='/search/:searchTerm' element={<SearchFeed />} />
    </Routes>
  </Box>
)

export default App