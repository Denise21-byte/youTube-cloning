import { Box, Skeleton, Stack } from '@mui/material'

const VideoCardSkeleton = () => (
  <Box>
    <Skeleton
      variant="rectangular"
      width="100%"
      height={180}
      sx={{ borderRadius: '12px', backgroundColor: '#272727' }}
    />
    <Box sx={{ pt: 1 }}>
      <Skeleton
        variant="text"
        width="90%"
        height={20}
        sx={{ backgroundColor: '#272727' }}
      />
      <Skeleton
        variant="text"
        width="60%"
        height={16}
        sx={{ backgroundColor: '#272727' }}
      />
      <Skeleton
        variant="text"
        width="40%"
        height={14}
        sx={{ backgroundColor: '#272727' }}
      />
    </Box>
  </Box>
)

const Loader = () => (
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
    {Array(12).fill(0).map((_, index) => (
      <VideoCardSkeleton key={index} />
    ))}
  </Box>
)

export default Loader