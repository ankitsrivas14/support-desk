const asyncHandler = require('express-async-handler');

//MODELS
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');


// @desc - Get user ticket
// @route - GET /api/tickets
//@access - Private
const getTickets = asyncHandler(async (req, res) => {
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }
    const tickets = await Ticket.find({user: req.user.id})
    res.status(200).json(tickets);
})


// @desc - Get user ticket
// @route - GET /api/tickets/:id
//@access - Private
const getOneTicket = asyncHandler(async (req, res) => {
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found');
    }
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized');
    }


    res.status(200).json(ticket);
})


// @desc - Delete  ticket
// @route - DELETE /api/tickets/:id
//@access - Private
const deleteOneTicket = asyncHandler(async (req, res) => {
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found');
    }
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized');
    }
    await ticket.remove();
    res.status(200).json({success: true});
})

// @desc - Update user ticket
// @route - PUT /api/tickets/:id
//@access - Private
const updateOneTicket = asyncHandler(async (req, res) => {
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found');
    }
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true});


    res.status(200).json(updatedTicket);
})


// @desc - Get user ticket
// @route - POST /api/tickets
//@access - Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;
    if( !(product && description) ){
        res.status(400);
        throw new Error('Both Product and Description are required');
    }

    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket);
})


module.exports = {
    getTickets,
    createTicket,
    getOneTicket,
    deleteOneTicket,
    updateOneTicket
}