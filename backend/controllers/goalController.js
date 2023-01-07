import asyncHandler from 'express-async-handler'

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get g' })
})

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('please send a text field')
    }
    res.status(201).json({ message: `${req.body.text}`})
})

// @desc    update goals
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `update goal ${req.params.id}` })
})

// @desc    delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `delete goal ${req.params.id}` })
})


export { getGoals, setGoals, deleteGoal, updateGoal }
