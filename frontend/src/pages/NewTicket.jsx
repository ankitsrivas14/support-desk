//REACT
import { useState, useEffect  } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { reset, createTicket } from "../features/tickets/ticketSlice";


//IMPORTS
import { FaSignInAlt } from "react-icons/fa";
import {toast} from 'react-toastify'

//COMPONENTS
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";



function NewTicket() {

    const { user } = useSelector(state => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector(state => state.tickets)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [product, setProduct] = useState('iPhone');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if(isError){
            toast.error(message);
        }
        if(isSuccess){
            dispatch(reset())
            navigate('/tickets')
        }
        dispatch(reset());
    },[dispatch, isError, isSuccess, navigate, message])

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createTicket({
            product,
            description
        }))
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <BackButton url={'/'} />
            <section className="heading">
                <h1>Create new ticket</h1>
                <p>Please fill out the form below</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input type="text" value={name} className="form-control" disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input type="email" value={email} className="form-control" disabled />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select name="product" id="product" value={product} onChange={(e) => setProduct(e.target.value)}>
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                            <option value="iMac">iMac</option>
                            <option value="iPad">iPad</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description of the issue</label>
                        <textarea name="description" id="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NewTicket