import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import boardApi from '../api/boards.api'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import {EmojiPIcker} from 'emoji-mart'
import { Box, IconButton, TextField } from '@mui/material'

const Board = () => {
  const {boardId} = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sections, setSections] = useState([])
  const [isFavourite, setIsFavourite] = useState(false)
  const [icon, setIcon] = useState('')

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardApi.getOne(boardId)
        setTitle(res.title)
        setDescription(res.description)
        setSections(res.sections)
        setIsFavourite(res.favourite)
        setIcon(res.icon)
        console.log(res)
        console.log(isFavourite)
      } catch (err) {
        alert(err)
      }
    }
    getBoard()
  }, [boardId])
  return (
    <>
      <Box sx={{
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
        width:'100%',
      }}>
        <IconButton variant ='outlined'>
          {
            isFavourite ?(
              <StarOutlinedIcon color='warning'/>
            ):(
              <StarBorderOutlinedIcon/>
            )
          }
        </IconButton>
          <IconButton variant='outlined' color='error'>
          <DeleteOutlinedIcon />

          </IconButton>
      </Box>
      <Box sx={{padding: '10px 50px',}}>
          {/* {emoji picker} */}
      </Box>
      <TextField
        value={title}
        placeholder='Untitled'
        variant='outlined'
        fullWidth
        sx={{
          '& .MuiOutlinedInput-input':{padding:0},
          '& .MuiOutlinedInput-notchedOutline':{border:'unset'},
          '& .MuiOutlinedInput-root':{fontSize:'2rem', fontWeight:'700'},
        }}>
      </TextField>
      <TextField
        value={description}
        placeholder='Add a description'
        variant='outlined'
        multiline
        fullWidth
        sx={{
          '& .MuiOutlinedInput-input':{padding:0},
          '& .MuiOutlinedInput-notchedOutline':{border:'unset'},
          '& .MuiOutlinedInput-root':{fontSize:'0.8 rem'},
        }}>
      </TextField>
    </>
  )
}

export default Board