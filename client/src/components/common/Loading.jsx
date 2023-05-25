import {Box, CircularProgress} from '@mui/material'
const Loading =  props => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: props.fullHeight ?  '100vh' : '100%',
        width: '100%'
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading