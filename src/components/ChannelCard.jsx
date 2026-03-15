import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const ChannelCard = ({ channel }) => {
  const channelId = channel?.id?.channelId || channel?.id
  const thumbnail = channel?.snippet?.thumbnails?.high?.url
  const channelTitle = channel?.snippet?.title
  const subscriberCount = channel?.statistics?.subscriberCount
    ? `${Number(channel.statistics.subscriberCount).toLocaleString()} subscribers`
    : ''

  return (
    <Card
      sx={{
        backgroundColor: '#1a1a1a',
        borderRadius: '16px',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#272727' },
        transition: 'background 0.2s',
      }}
    >
      <Link
        to={channelId ? `/channel/${channelId}` : '/'}
        style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <CardMedia
          component="img"
          image={thumbnail}
          alt={channelTitle}
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: '3px solid #ff0000',
            objectFit: 'cover',
            mb: 1.5,
          }}
        />
        <CardContent sx={{ textAlign: 'center', p: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '15px' }}>
              {channelTitle}
            </Typography>
            <CheckCircle sx={{ fontSize: 14, color: '#aaaaaa' }} />
          </Box>
          {subscriberCount && (
            <Typography sx={{ color: '#aaaaaa', fontSize: '13px', mt: 0.5 }}>
              {subscriberCount}
            </Typography>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}

export default ChannelCard


