import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, IconButton, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`)
      setSearchTerm('')
    }
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', sm: '400px', md: '500px' },
        backgroundColor: '#121212',
        border: '1px solid #303030',
        borderRadius: '40px',
        px: 2,
        py: '2px',
      }}
    >
      <InputBase
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          flex: 1,
          color: 'white',
          fontSize: '15px',
          '& input::placeholder': { color: '#aaaaaa' },
        }}
      />
      <IconButton type="submit" sx={{ color: '#aaaaaa', p: '6px' }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar