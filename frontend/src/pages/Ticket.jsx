//REACT
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

//REDUX
import { useSelector, useDispatch } from "react-redux"
import { getOneTicket, closeTicket, reset } from "../features/tickets/ticketSlice"

//COMPONENTS
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

//IMPORTS
import { FaSignInAlt } from "react-icons/fa";
import {toast} from 'react-toastify'

function Ticket() {

    const { ticket, isLoading, isSuccess, isError, message } = useSelector(state => state.tickets)
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ticketId } = params;

    useEffect(() => {
        if(isError){
            toast.error(message);
        }
        dispatch(getOneTicket(params.ticketId));
    }, [isError, message, ticketId ])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket Closed');
        navigate('/tickets')
    }

    if(isLoading){
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
            </header>
            {ticket.status !== 'closed' && (
                <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close</button>
            )}
        </div>
    )
}

export default Ticket