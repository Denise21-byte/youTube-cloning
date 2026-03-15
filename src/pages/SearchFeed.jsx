import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Box, Typography, Stack } from '@mui/material'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import VideoCard from '../components/VideoCard'
import ChannelCard from '../components/ChannelCard'
import Loader from '../components/Loader'

const SearchFeed = () => {
  const { searchTerm } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: () => fetchFromAPI(`search?part=snippet&q=${searchTerm}`),
  })

  const videos = data?.items || []

  return (
    <Stack direction="row" sx={{ minHeight: '100vh' }}>
      <Box sx={{ flex: 1, p: { xs: 2, md: 3 }, backgroundColor: '#0f0f0f' }}>
        <Typography
          variant="h6"
          sx={{ color: 'white', mb: 3, fontWeight: 700, borderLeft: '4px solid #ff0000', pl: 2 }}
        >
          Results for: <span style={{ color: '#ff0000' }}>{searchTerm}</span>
        </Typography>

        {isLoading && <Loader />}

        {isError && (
          <Typography sx={{ color: '#aaaaaa', textAlign: 'center', mt: 10 }}>
            Something went wrong. Try again later.
          </Typography>
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
                {item.id?.kind === 'youtube#video' ? (
                  <VideoCard video={item} />
                ) : item.id?.kind === 'youtube#channel' ? (
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

export default SearchFeed