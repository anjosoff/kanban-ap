import Board  from '../models/board.model.js'
import Section  from '../models/section.model.js'
import Task  from '../models/task.model.js'


export const boardCreate = async (req, res) =>{
    
    try {
        const boardsCount = await Board.find().count()
        const board = await Board.create({
          user: req.user._id,
          position: boardsCount > 0 ? boardsCount : 0
        })
        res.status(201).json(board)
      } catch (err) {
        res.status(500).json(err)
      }
    }

export const boardGetAll = async (req, res) => {
    try {
        const boards = await Board.find({ user: req.user._id }).sort('-position')
        res.status(200).json(boards)
      } catch (err) {
        res.status(500).json(err)
      }
} 

export const updatePosition = async (req, res) =>{
  const {boards} = req. body
  try{
    for (const key in boards.reverse())  {
      const board= boards[key]
      await Board.findByIdAndUpdate(
        board._id, 
        {$set: {position: board.position + 1 }}
        
        )
    }
    res.status(200).json('Updated!')
  }catch (err){
    res.status(500).json(err)

  }
}

export const getOne = async (req, res) => {
  const { boardId } = req.params
  try {
    const board = await Board.findOne({ user: req.user._id, _id: boardId })
    if (!board) return res.status(404).json('Board not found')
    const sections = await Section.find({ board: boardId })
    for (const section of sections) {
      const tasks = await Task.find({ section: section.id }).populate('section').sort('-position')
      section._doc.tasks = tasks
    }
    board._doc.sections = sections
    res.status(200).json(board)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const update = async(req, res) =>{

  const {boardId} = req.params
  const {title, description, favourite} = req.body

  try{

    if(title==='') req.body.title = 'Untitled'
    if(description==='') req.body.description ='Add description here'
    const currentBoard= await Board.findById(boardId)
    if (!currentBoard) return res.status(404).json('Board not found')


    if(favourite!== undefined && currentBoard.favourite !== favourite){
      const favourites = await Board.find({
      user: currentBoard.user,
      favourite: true,
      _id:{$ne:boardId}
    })
      if(favourite){
        req.body.favouritePosition=favourites.length > 0 ? favourites.length : 0
      }else{
        for (const key in favourites) {
          const element = favourites[key]
          await Board.findByIdAndUpdate(
            element.id,
            {$set:{favouritePositon:key}}
          )
        }
      }
  }

    const board= await  Board.findByIdAndUpdate(
      boardId,
      {$set:req.body}
    )
    res.status(200).json(board)
  }catch (err){

    res.status(500).json(err)

  }


}