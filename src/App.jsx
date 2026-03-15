import { Box, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: '#0f0f0f',
      borderBottom: '1px solid #272727',
      padding: '10px 20px',
    }}
  >
    <Link to="/">
      <Box
        sx={{
          color: 'white',
          fontSize: '22px',
          fontWeight: 'bold',
          letterSpacing: '-0.5px',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <Box
          component="span"
          sx={{
            backgroundColor: '#ff0000',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '18px',
            fontWeight: 900,
          }}
        >
          ▶
        </Box>
        <Box component="span" sx={{ color: 'white' }}>
          UTube
        </Box>
      </Box>
    </Link>
    <SearchBar />
  </Stack>
)

export default Navbar