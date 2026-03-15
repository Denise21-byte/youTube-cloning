import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Box, Stack, Typography, Avatar } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import VideoCard from '../components/VideoCard'
import Loader from '../components/Loader'

const ChannelDetail = () => {
  const { id } = useParams()

  const { data: channelData, isLoading: loadingChannel } = useQuery({
    queryKey: ['channel', id],
    queryFn: () => fetchFromAPI(`channels?part=snippet,statistics&id=${id}`),
  })

  const { data: videosData, isLoading: loadingVideos } = useQuery({
    queryKey: ['channelVideos', id],
    queryFn: () => fetchFromAPI(`search?channelId=${id}&part=snippet&order=date&type=video`),
  })

  if (loadingChannel) return <Loader />

  const channel = channelData?.items?.[0]
  const snippet = channel?.snippet
  const statistics = channel?.statistics
  const videos = videosData?.items || []

  return (
    <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>

      {/* Banner */}
      <Box
        sx={{
          width: '100%',
          height: { xs: '150px', md: '220px' },
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {snippet?.brandingSettings?.image?.bannerExternalUrl && (
          <Box
            component="img"
            src={snippet.brandingSettings.image.bannerExternalUrl}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </Box>

      {/* Channel Info */}
      <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          gap={3}
          sx={{ mb: 4 }}
        >
          {/* Avatar */}
          <Avatar
            src={snippet?.thumbnails?.high?.url}
            alt={snippet?.title}
            sx={{
              width: { xs: 80, md: 110 },
              height: { xs: 80, md: 110 },
              border: '4px solid #ff0000',
              mt: { md: '-40px' },
              backgroundColor: '#ff0000',
              fontSize: '36px',
            }}
          >
            {snippet?.title?.[0]}
          </Avatar>

          {/* Channel Name + Stats */}
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Stack direction="row" alignItems="center" gap={1} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
              <Typography
                variant="h5"
                sx={{ color: 'white', fontWeight: 700, fontSize: { xs: '20px', md: '26px' } }}
              >
                {snippet?.title}
              </Typography>
              <CheckCircle sx={{ color: '#aaaaaa', fontSize: 20 }} />
            </Stack>

            <Stack
              direction="row"
              gap={4}
              sx={{ mt: 1.5 }}
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>
                  {Number(statistics?.subscriberCount || 0).toLocaleString()}
                </Typography>
                <Typography sx={{ color: '#aaaaaa', fontSize: '13px' }}>Subscribers</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>
                  {Number(statistics?.videoCount || 0).toLocaleString()}
                </Typography>
                <Typography sx={{ color: '#aaaaaa', fontSize: '13px' }}>Videos</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>
                  {Number(statistics?.viewCount || 0).toLocaleString()}
                </Typography>
                <Typography sx={{ color: '#aaaaaa', fontSize: '13px' }}>Total Views</Typography>
              </Box>
            </Stack>

            {/* Description */}
            <Typography
              sx={{
                color: '#aaaaaa',
                fontSize: '14px',
                mt: 1.5,
                maxWidth: '600px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {snippet?.description}
            </Typography>
          </Box>
        </Stack>

        {/* Divider */}
        <Box sx={{ borderBottom: '1px solid #272727', mb: 3 }} />

        {/* Videos Grid */}
        <Typography
          sx={{
            color: 'white',
            fontWeight: 700,
            fontSize: '18px',
            mb: 3,
            borderLeft: '4px solid #ff0000',
            pl: 2,
          }}
        >
          Latest Videos
        </Typography>

        {loadingVideos ? (
          <Loader />
        ) : (
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
            {videos.map((video, index) => (
              <VideoCard key={index} video={video} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ChannelDetail