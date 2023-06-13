import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import boardApi from '../api/boards.api'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material'
import EmojiPicker from '../components/common/EmojiPicker'

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
      } catch (err) {
        alert(err)
      }
    }
    getBoard()
  }, [boardId])

  const onIconChange = (newIcon) =>{
    //let temp = [...boards]
    setIcon(newIcon)

  }

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
         <Box>
            <EmojiPicker icon={icon} onChange={onIconChange}/>
            <TextField
              value={title}
              placeholder='Untitled'
              variant='outlined'
              fullWidth
              sx={{
                '& .MuiOutlinedInput-input':{padding:0},
                '& .MuiOutlinedInput-notchedOutline':{border:'unset'},
                '& .MuiOutlinedInput-root':{fontSize:'2rem', fontWeight:'700'},
              }}
            />
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
              }}
            />
          </Box> 
      <Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          
        }}>
          <Button>
            Add section
          </Button>
          <Typography variant='body2' fontWeight='700' >
            {sections.length} Sections
          </Typography>
        </Box>
        <Divider sx={{margin:'10px 0'}}/>
        {/* KANBAN BOARD */}
      </Box>
      </Box>
      
    </>
  )
}

export default Board