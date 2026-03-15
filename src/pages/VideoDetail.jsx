import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Box, Stack, Typography, Avatar } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import VideoCard from '../components/VideoCard'
import VideoPlayer from '../components/VideoPlayer'
import Loader from '../components/Loader'

const VideoDetail = () => {
  const { id } = useParams()

  const { data: videoData, isLoading: loadingVideo } = useQuery({
    queryKey: ['video', id],
    queryFn: () => fetchFromAPI(`videos?part=snippet,statistics&id=${id}`),
  })

  const { data: relatedData, isLoading: loadingRelated } = useQuery({
    queryKey: ['related', id],
    queryFn: () => fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`),
  })

  if (loadingVideo) return <Loader />

  const video = videoData?.items?.[0]
  const snippet = video?.snippet
  const statistics = video?.statistics
  const relatedVideos = relatedData?.items || []

  return (
    <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} p={{ xs: 1, md: 3 }}>

        {/* Left — Video Player + Details */}
        <Box flex={1}>

          {/* Video Player Component */}
          <VideoPlayer videoId={id} />

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: 700,
              mt: 2,
              fontSize: { xs: '16px', md: '20px' },
            }}
          >
            {snippet?.title}
          </Typography>

          {/* Channel + Stats */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            sx={{ mt: 1.5, pb: 2, borderBottom: '1px solid #272727' }}
            gap={1}
          >
            <Link to={`/channel/${snippet?.channelId}`} style={{ textDecoration: 'none' }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Avatar sx={{ width: 36, height: 36, backgroundColor: '#ff0000', fontSize: '14px' }}>
                  {snippet?.channelTitle?.[0]}
                </Avatar>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>
                    {snippet?.channelTitle}
                  </Typography>
                  <CheckCircle sx={{ fontSize: 14, color: '#aaaaaa' }} />
                </Stack>
              </Stack>
            </Link>

            <Stack direction="row" gap={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>
                  {Number(statistics?.viewCount || 0).toLocaleString()}
                </Typography>
                <Typography sx={{ color: '#aaaaaa', fontSize: '12px' }}>Views</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>
                  {Number(statistics?.likeCount || 0).toLocaleString()}
                </Typography>
                <Typography sx={{ color: '#aaaaaa', fontSize: '12px' }}>Likes</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>
                  {Number(statistics?.commentCount || 0).toLocaleString()}
                </Typography>
                <Typography sx={{ color: '#aaaaaa', fontSize: '12px' }}>Comments</Typography>
              </Box>
            </Stack>
          </Stack>

          {/* Description */}
          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
            }}
          >
            <Typography
              sx={{
                color: '#aaaaaa',
                fontSize: '14px',
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {snippet?.description}
            </Typography>
          </Box>
        </Box>

        {/* Right — Related Videos */}
        <Box sx={{ width: { xs: '100%', md: '380px' } }}>
          <Typography
            sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: '16px',
              mb: 2,
              borderLeft: '4px solid #ff0000',
              pl: 1.5,
            }}
          >
            Related Videos
          </Typography>

          {loadingRelated ? (
            <Loader />
          ) : (
            <Stack gap={2}>
              {relatedVideos.map((video, index) => (
                <VideoCard key={index} video={video} />
              ))}
            </Stack>
          )}
        </Box>

      </Stack>
    </Box>
  )
}

export default VideoDetail