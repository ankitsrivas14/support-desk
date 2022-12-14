//REACT
import { useEffect } from "react"

//REDUX
import { useSelector, useDispatch } from "react-redux"
import { getAllTickets, reset } from "../features/tickets/ticketSlice"

//COMPONENTS
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import TicketItem from "../components/TicketItem"

function Tickets() {

    const { tickets, isLoading, isSuccess } = useSelector(state => state.tickets)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTickets());
    }, [dispatch])


    //Unmount
    useEffect(() => {
        return () => {
            if(isSuccess){
                dispatch(reset());
            }
        }
    }, [dispatch, isSuccess])

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <BackButton url={'/'} />
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map((ticket) => (
                    <TicketItem key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </>
    )
}

export default Tickets