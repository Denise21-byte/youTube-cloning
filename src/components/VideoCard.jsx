import { Box, Card, CardContent, CardMedia, Typography, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { CheckCircle } from '@mui/icons-material'

const VideoCard = ({ video }) => {
  if (!video?.id) return null

  const videoId = video.id?.videoId || video.id
  const channelId = video.snippet?.channelId
  const thumbnail = video.snippet?.thumbnails?.high?.url || video.snippet?.thumbnails?.medium?.url
  const title = video.snippet?.title
  const channelTitle = video.snippet?.channelTitle
  const viewCount = video.statistics?.viewCount
    ? `${Number(video.statistics.viewCount).toLocaleString()} views`
    : ''

  return (
    <Card
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        '&:hover .thumbnail': {
          transform: 'scale(1.03)',
        },
        overflow: 'hidden',
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : '/'} style={{ textDecoration: 'none' }}>
        <Box sx={{ overflow: 'hidden', borderRadius: '12px' }}>
          <CardMedia
            className="thumbnail"
            component="img"
            image={thumbnail}
            alt={title}
            sx={{
              width: '100%',
              height: 180,
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
          />
        </Box>
        <CardContent sx={{ px: 0, py: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 0.5,
            }}
          >
            {title}
          </Typography>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Link
              to={channelId ? `/channel/${channelId}` : '/'}
              style={{ textDecoration: 'none' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#aaaaaa',
                  fontSize: '13px',
                  '&:hover': { color: 'white' },
                }}
              >
                {channelTitle}
              </Typography>
            </Link>
            <CheckCircle sx={{ fontSize: 13, color: '#aaaaaa', mt: '1px' }} />
          </Stack>
          {viewCount && (
            <Typography variant="body2" sx={{ color: '#aaaaaa', fontSize: '12px' }}>
              {viewCount}
            </Typography>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}

export default VideoCard