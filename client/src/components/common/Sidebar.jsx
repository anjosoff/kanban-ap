import { useSelector, useDispatch } from "react-redux"
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, Typography } from "@mui/material"
import assets from '../../assets/index'
import LogoutOutlined from '@mui/icons-material/LogoutOutlined'
import AddBoxOutlined from '@mui/icons-material/AddBoxOutlined'
import { useEffect, useState } from "react"
import boardApi from '../../api/boards.api'
import { setBoards } from "../../redux/features/boardSlice"
import {Link, useNavigate, useParams} from 'react-router-dom'
import {DragDropContext,Draggable, Droppable }  from 'react-beautiful-dnd'

const Sidebar = () => {
  
  const user = useSelector((state) => state.user.value)
  const navigate = useNavigate()
  const boards = useSelector((state) => state.board.value)
  const dispatch = useDispatch()
  const {boardId} = useParams()
  const [activeIndex, setActiveIndex] = useState(0)
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
    }
    getBoards()
  }, [])

  useEffect(() =>{
    console.log(boards)
  }, [boards])

  const updateActive = (listBoard) =>{
    const activeItem = listBoard.findIndex(e => e._id === boardId)
    setActiveIndex(activeItem)
  }

  const logout = ()=>{
    localStorage.removeItem('tkn')
    window.location.reload()
  }

  const onDragEnd = ( e )=>{

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

      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable key={'list-board-droppable'} droppableId={'list-board-droppable'}>
           {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>

            {
              boards.map((item,index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>

                  {(provided, snapshot) =>(

                    <ListItemButton
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    selected={index === activeIndex}
                    component={Link}
                    to={`/boards/${item._id}`}
                    sx={{
                      pl:'20px',
                      cursor:snapshot.isDragging ? 'grab' : 'pointer!important'

                    }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight="700"
                        sx={{
                          whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'
                        }}
                      >

                        {item.icon} {item.title}

                      </Typography>

                    </ListItemButton>

                  )}
                </Draggable>
              ))
            }

            </div>
           )}
          </Droppable>
      </DragDropContext>


    </List>

   </Drawer>
  )
}

export default Sidebar