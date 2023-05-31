import { useSelector, useDispatch } from "react-redux"
import { Box, Drawer, IconButton, List, ListItem, Typography } from "@mui/material"
import assets from '../../assets/index'
import LogoutOutlined from '@mui/icons-material/LogoutOutlined'
import AddBoxOutlined from '@mui/icons-material/AddBoxOutlined'
import { useEffect } from "react"
import boardApi from '../../api/boards.api'
import { setBoards } from "../../redux/features/boardSlice"
import {useNavigate, useParams} from 'react-router-dom'


const Sidebar = () => {
  
  const user = useSelector((state) => state.user.value)
  const navigate = useNavigate()
  const boards = useSelector((state) => state.board.value)
  const dispatch = useDispatch()
  const {boardId} = useParams()
  const sidebarWidth=250
  useEffect(() =>{
    const getBoards = async () =>{
      try{
        const res = await boardApi.getAll()
        dispatch(setBoards(res))
        if(res.length >0 && boardId === undefined){
          navigate(`/boards/${res[0]._id}`)
        }

      }catch (err){
        alert(err)
      }
      getBoards()
    }
  }, [])

  useEffect(() =>{
    console.log(boards)
  }, [boards])
  const logout = ()=>{
    localStorage.removeItem('tkn')
    window.location.reload()
  }

  return (
   <Drawer
    container={window.document.body}
    variant= 'permanent'
    anchor="right"
    open={true}
    sx={{
      width:sidebarWidth,
      height: "100vh",
      '& > div': {borderRight:'none'}
    }}
   >
    <List
      disablePadding
      sx={{
        width:sidebarWidth,
        height: "100vh",
        backgroundColor:assets.colors.secondary

      }}
    >
      <ListItem>
        <Box
        sx={{
          width:'100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        >
          <Typography variant="body2" fontWeight='700'>
            Seja bem-vindo, {user}!
          </Typography>
          <IconButton onClick={logout}>
            <LogoutOutlined fontSize="small"/>
          </IconButton>
        </Box>
      </ListItem>
      <Box  sx={{paddingTop:'10px'}}/>
      <ListItem>
        <Box
        sx={{
          width:'100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        >
          <Typography variant="body2" fontWeight='700'>
           Favorito
          </Typography>
        </Box>
      </ListItem>
        <Box  sx={{paddingTop:'10px'}}/>
        <ListItem>
        <Box
        sx={{
          width:'100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        >
          <Typography variant="body2" fontWeight='700'>
            Privado
          </Typography>
          <IconButton >
            <AddBoxOutlined fontSize="small"/>
          </IconButton>
        </Box>
      </ListItem>
    </List>

   </Drawer>
  )
}

export default Sidebar