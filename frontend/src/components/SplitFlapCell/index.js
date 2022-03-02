
import { FlapDisplay } from 'react-split-flap-effect'
import './styles.css'


const SplitFlapCell = ({
    letter,
    color
}) => {
    return (
        <FlapDisplay
            className={`XL darkBordered ${color}`}
            chars={'ABCDEFGHIJKLMNOPQRSTUVWXYZ '}
            length={1}
            value={letter}
        />
    )
}

export default SplitFlapCell;