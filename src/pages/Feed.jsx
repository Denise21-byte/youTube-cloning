import { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Sidebar from '../components/Sidebar'
import VideoCard from '../components/VideoCard'
import ChannelCard from '../components/ChannelCard'
import Loader from '../components/Loader'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['feed', selectedCategory],
    queryFn: () => fetchFromAPI(`search?part=snippet&q=${selectedCategory}&type=video,channel`),
  })

  const videos = data?.items || []

  return (
    <Stack direction="row" sx={{ minHeight: '100vh' }}>
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Box sx={{ flex: 1, p: { xs: 2, md: 3 }, backgroundColor: '#0f0f0f', overflowY: 'auto' }}>
        <Typography
          variant="h6"
          sx={{ color: 'white', mb: 3, fontWeight: 700, borderLeft: '4px solid #ff0000', pl: 2 }}
        >
          {selectedCategory} Videos
        </Typography>

        {isLoading && <Loader />}

        {isError && (
          <Box sx={{ color: '#aaaaaa', textAlign: 'center', mt: 10 }}>
            <Typography variant="h6">Something went wrong.</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              API limit may have been reached. Try again later.
            </Typography>
          </Box>
        )}

        {!isLoading && !isError && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 3,
            }}
          >
            {videos.map((item, index) => (
              <Box key={index}>
                {item.id.kind === 'youtube#video' ? (
                  <VideoCard video={item} />
                ) : item.id.kind === 'youtube#channel' ? (
                  <ChannelCard channel={item} />
                ) : null}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Stack>
  )
}

export default Feed