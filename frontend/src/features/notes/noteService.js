//IMPORTS
import axios from 'axios'

const API_URL = '/api/tickets'

//Create note on ticket 
const createNote = async (noteText, ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}/${ticketId}/notes`, {text: noteText}, config);
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
    createNote,
    getAllNotes,
}
export default TicketService;