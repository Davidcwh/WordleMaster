import { FlapDisplay } from 'react-split-flap-effect'
const Title = () => {
    const title = "wordle master"

    return <>
            <FlapDisplay
                className={`XL darkBordered`}
                chars={'ABCDEFGHIJKLMNOPQRSTUVWXYZ '}
                length={10}
                value={" wordle   "}
            />
            <FlapDisplay
                className={`XL darkBordered`}
                chars={'ABCDEFGHIJKLMNOPQRSTUVWXYZ '}
                length={10}
                value={"   master "}
            />
        </>
}

export default Title;