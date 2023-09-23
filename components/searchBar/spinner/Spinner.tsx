import { FC } from 'react'
import "./style.css"
interface SpinnerProps {
    
}

const Spinner: FC<SpinnerProps> = ({}) => {
    return (
        <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>  
    )
}

export default Spinner