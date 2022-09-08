//REACT
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";


//IMPORTS
import { FaSignInAlt } from "react-icons/fa";
import {toast} from 'react-toastify'

//COMPONENTS
import Spinner from "../components/Spinner";

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

    const { email, password } = formData;

    useEffect(() => {
        if(isError){
            toast.error(message);
        }
        //Redirect when logged in
        if(isSuccess || user){
            navigate('/');
        }
        dispatch(reset());

    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.id]: e.target.value
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if( !( email && password ) ){
            toast.error('All fields are compulsory');
            return;
        }
        const data = {
            email, 
            password
        }
        dispatch(login(data))
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please login to get support</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" value={email} onChange={onChange} placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" value={password} onChange={onChange} placeholder="Enter password" required />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Login</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login