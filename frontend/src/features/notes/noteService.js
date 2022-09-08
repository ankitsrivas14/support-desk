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

//Get All Notes of a ticket
const getAllNotes = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/${ticketId}/notes`, config);
    return response.data;
}


const TicketService = {
    createTicket,
    getAllNotes,
}
export default TicketService;