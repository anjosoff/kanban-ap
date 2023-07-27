import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import boardApi from '../api/boards.api'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material'
import EmojiPicker from '../components/common/EmojiPicker'
import { setBoards} from '../redux/features/boardSlice'

let timer
let timeout=500

const Board = () => {
  const dispatch = useDispatch()
  const {boardId} = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sections, setSections] = useState([])
  const [isFavourite, setIsFavourite] = useState(false)
  const [icon, setIcon] = useState('')

  const boards = useSelector((state) => state.board.value)
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

  const onIconChange =  async (newIcon) =>{
    let temp = [...boards]
    const index = temp.indexOf( e => e._id === boardId)
    temp[index] = {...temp[index], icon: newIcon}
    setIcon(newIcon)
    dispatch(setBoards(temp))
    try{
     await boardApi.update(boardId, {icon:newIcon})
    }catch (e){
      alert(e)
    }

  }

  const updateTitle = async (e)=>{
    clearTimeout(timer)
    const newTitle = e.target.value
    let temp = [...boards]
    const index = temp.indexOf( e => e._id === boardId)
    temp[index] = {...temp[index], title: newTitle}
    setTitle(newTitle)
    dispatch(setBoards(temp))
    timer = setTimeout( async ()=>{
      try{
        await boardApi.update(boardId, {title: newTitle})
       }catch (e){
         alert(e)
       }
    },timeout);
  }
  const updateDescription = async (e) => {
    clearTimeout(timer)
    const newDescription = e.target.value
    let temp = [...boards]
    const index = temp.indexOf( e => e._id === boardId)
    temp[index] = {...temp[index], description: newDescription}
    setDescription(newDescription)
    dispatch(setBoards(temp))
    timer = setTimeout( async ()=>{
      try{
        await boardApi.update(boardId, {description: newDescription})
       }catch (e){
         alert(e)
       }
    },timeout);
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
              onChange={updateTitle}
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
              onChange={updateDescription}
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