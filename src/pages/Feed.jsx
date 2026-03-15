import { useState } from 'react'
import { Box, Stack } from '@mui/material'
import Sidebar from '../components/Sidebar'

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New')

  return (
    <Stack direction="row" sx={{ minHeight: '100vh' }}>
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Box sx={{ flex: 1, p: 3, backgroundColor: '#0f0f0f' }}>
        <Box sx={{ color: 'white', fontSize: '20px' }}>
          Selected: {selectedCategory}
        </Box>
      </Box>
    </Stack>
  )
}

export default Feed