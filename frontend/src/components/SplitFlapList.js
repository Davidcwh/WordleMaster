import { FlapDisplay, Presets } from 'react-split-flap-effect'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'

const SplitFlapList = ({
    words,
    setWords,
    isLoading
}) => {
    const [loadingIndex, setLoadingIndex] = useState(0)
    const [maxLoadingIndex, setMaxLoadingIndex] = useState(words.length * 10)

    useEffect(() => {
        if(!isLoading) {
            setMaxLoadingIndex(words.length * 10)
        }
    }, [words, isLoading])

    useEffect(() => {
        if(!isLoading) {
            return
        }

        if(loadingIndex === maxLoadingIndex) {
            setLoadingIndex(0)
        }

        const interval = setInterval(() => {
            const newWords = words.map((item, index) => {
                const offset = loadingIndex - index
                const limit = (index + 1) * 10
                const tenEmptySpaces = "          "
                let value = ""
                if(offset < 0) {
                    value = tenEmptySpaces
                } else if(loadingIndex < limit) {
                    value = "loading...".substring(0, (loadingIndex - index * 10)) + tenEmptySpaces.substring((loadingIndex - index * 10)) 
                } else {
                    value = "loading..."
                }
    
                return { word: value}
            })
    
            setWords(newWords)
            if(loadingIndex < maxLoadingIndex) {
                setLoadingIndex(loadingIndex + 1)
            }
        }, 50)

        return () => clearInterval(interval)
        
    }, [isLoading, loadingIndex, maxLoadingIndex, setWords, words])

    return <>
        <Grid 
            container 
            spacing={0.5}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid item>
                <FlapDisplay
                    className={`M dark`}
                    chars={Presets.ALPHANUM}
                    length={12}
                    value={"best guesses"}
                />
            </Grid>

            <Grid item>
                {words.map((row, index) => {
                    const rowData = !isLoading ? row.word + " " + row.expectedInfo.toFixed(3) : row.word
                    return (
                        <FlapDisplay
                            key={index}
                            className={`M dark`}
                            chars={Presets.ALPHANUM + ". "}
                            length={rowData.length}
                            value={rowData}
                            padChar={" "}
                        />
                    )
                })}
            </Grid>
        </Grid>
        
    </>
}

export default SplitFlapList;