const express = require('express');
const router = express.Router();

const noteRouter = require('./noteRoutes')

//Re-route into Note router
router.use('/:ticketId/notes', noteRouter)

const { 
    getTickets, 
    createTicket, 
    getOneTicket,
    deleteOneTicket,
    updateOneTicket
} = require('../controllers/ticketController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getTickets);
router.post('/', protect, createTicket);
router.get('/:id', protect, getOneTicket);
router.delete('/:id', protect, deleteOneTicket);
router.put('/:id', protect, updateOneTicket);

module.exports = router;