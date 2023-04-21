import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <Link to='/'>Go Home!</Link>
        </div>
    )
}

export default Page404;