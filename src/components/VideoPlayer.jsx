import { Box } from '@mui/material'

const VideoPlayer = ({ videoId }) => (
  <Box
    sx={{
      width: '100%',
      position: 'relative',
      paddingTop: '56.25%',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#000',
    }}
  >
    <iframe
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
      title="Video Player"
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  </Box>
)

export default VideoPlayer