//IMPORTS
import axios from 'axios'

const API_URL = '/api/tickets'

//Create Ticket
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, ticketData, config);
    return response.data;
}

//Get All Tickets
const getAllTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config);
    return response.data;
}

const TicketService = {
    createTicket,
    getAllTickets
}
export default TicketService;