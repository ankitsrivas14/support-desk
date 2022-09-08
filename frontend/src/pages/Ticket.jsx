//REACT
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

//REDUX
import { useSelector, useDispatch } from "react-redux"
import { getOneTicket, closeTicket, reset } from "../features/tickets/ticketSlice"
import { getAllNotes, reset as notesReset } from "../features/notes/noteSlice"

//COMPONENTS
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import NoteItem from "../components/NoteItem"

//IMPORTS
import { FaSignInAlt } from "react-icons/fa";
import {toast} from 'react-toastify'

function Ticket() {

    const { ticket, isLoading, isSuccess, isError, message } = useSelector(state => state.tickets)
    const { notes, isLoading: notesIsLoading } = useSelector(state => state.notes)
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ticketId } = params;

    useEffect(() => {
        if(isError){
            toast.error(message);
        }
        dispatch(getOneTicket(params.ticketId));
        dispatch(getAllNotes(params.ticketId));
    }, [isError, message, ticketId ])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket Closed');
        navigate('/tickets')
    }

    if(isLoading || notesIsLoading){
        return <Spinner />
    }
    if(isError){
        return <h3>Something went wrong</h3>
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url={'/tickets'} />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>
            {notes.map(note => (
                <NoteItem id={note._id} note={note} />
            ))}
            {ticket.status !== 'closed' && (
                <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close</button>
            )}
        </div>
    )
}

export default Ticket