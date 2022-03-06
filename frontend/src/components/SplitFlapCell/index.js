
import { FlapDisplay } from 'react-split-flap-effect'
import './styles.css'
import { ALPAHBET_UPPERCASE } from '../../utils/Constants'

const SplitFlapCell = ({
    letter,
    color
}) => {
    return (
        <FlapDisplay
            className={`XL darkBordered ${color}`}
            chars={ALPAHBET_UPPERCASE + ' '}
            length={1}
            value={letter}
        />
    )
}

export default SplitFlapCell;