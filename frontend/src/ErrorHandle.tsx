import {Link} from 'react-router-dom'

export default function ErrorHandle(){
    return(
        <div>
            <p>You reached the wrong place try going back to <Link className = 'red-500' to = '/'> login </Link> </p>
        </div>
    )
}