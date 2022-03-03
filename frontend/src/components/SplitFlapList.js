import { FlapDisplay, Presets } from 'react-split-flap-effect'
import { Grid } from '@mui/material'

const SplitFlapList = ({
    words,
    isLoading
}) => {
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
                {words.map(row => {
                    const rowData = !isLoading ? row.word + " " + row.expectedInfo.toFixed(3) : "loading..."
                    return (
                        <FlapDisplay
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