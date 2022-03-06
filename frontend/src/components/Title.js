import { FlapDisplay } from 'react-split-flap-effect'
import { ALPAHBET_UPPERCASE } from '../utils/Constants';

const Title = () => {
    return <>
            <FlapDisplay
                className={`XL darkBordered`}
                chars={ALPAHBET_UPPERCASE + ' '}
                length={10}
                value={" wordle   "}
            />
            <FlapDisplay
                className={`XL darkBordered`}
                chars={ALPAHBET_UPPERCASE + ' '}
                length={10}
                value={"   master "}
            />
        </>
}

export default Title;