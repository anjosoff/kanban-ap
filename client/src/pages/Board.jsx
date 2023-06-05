import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import boardApi from '../api/boards.api'


const Board = () => {
  const {boardId} = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sections, setSections] = useState([])
  const [isFavourite, setIsFavourite] = useState(false)
  const [icon, setIcon] = useState('')

  console.log(boardId)

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
      } catch (err) {
        alert(err)
      }
    }
    getBoard()
  }, [boardId])
  return (
    <div>Board</div>
  )
}

export default Board