import { Box, CircularProgress } from '@mui/material'

const Loader = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <CircularProgress sx={{ color: '#ff0000' }} />
  </Box>
)

export default Loader