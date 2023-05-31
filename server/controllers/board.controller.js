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