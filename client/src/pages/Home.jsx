import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { setBoards } from "../redux/features/boardSlice";
import { useNavigate } from "react-router-dom";
import boardApi from "../api/boards.api";
import { useState } from "react";


const Home = ()=>{

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  console.log('gerando a home')

  const createBoard = async ()=>{
    setLoading(true)
    try{

      const res = await boardApi.create()
      console.log(res)
      dispatch(setBoards([res]))
      navigate(`/boards/${res._id}`)

    }catch (err){
      alert(err)
    }finally{
      setLoading(false)
    }
  }


  return(
    <Box sx={{
      height:'100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <LoadingButton
      variant='outlined'
      color='success'
      onClick={createBoard}
      loading={loading}
      >
        Clique aqui para criar um novo quadro
      </LoadingButton>
    </Box>
  )
}


export default Home 