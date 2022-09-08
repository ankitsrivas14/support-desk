//REACT
import { Link } from "react-router-dom"

//IMPORTS
import { FaArrowCircleLeft } from "react-icons/fa"

function BackButton({ url }) {
    return (
       <Link to={url} className="btn btn-reverse btn-back"> <FaArrowCircleLeft/>Back </Link>
    )
}

export default BackButton