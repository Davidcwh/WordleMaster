import SplitFlapCell from './SplitFlapCell';
import { Grid } from '@mui/material'

const GridRow = ({
    word,
    colors
}) => {
    return (
        <Grid 
            container 
            spacing={0.5}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <SplitFlapCell letter={word.charAt(0)} color={colors[0]}/>
            </Grid>

            <Grid item>
                <SplitFlapCell letter={word.charAt(1)} color={colors[1]}/>
            </Grid>

            <Grid item>
                <SplitFlapCell letter={word.charAt(2)} color={colors[2]}/>
            </Grid>

            <Grid item>
                <SplitFlapCell letter={word.charAt(3)} color={colors[3]}/>
            </Grid>

            <Grid item>
                <SplitFlapCell letter={word.charAt(4)} color={colors[4]}/>
            </Grid>
        </Grid>
    )
}

const WordGrid = ({
    words,
    colors
}) => {
    return <>
        <Grid 
            container 
            spacing={0.5}
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <GridRow word={words[0]} colors={colors[0]}/>
            <GridRow word={words[1]} colors={colors[1]}/>
            <GridRow word={words[2]} colors={colors[2]}/>
            <GridRow word={words[3]} colors={colors[3]}/>
            <GridRow word={words[4]} colors={colors[4]}/>
            <GridRow word={words[5]} colors={colors[5]}/>
        </Grid>
    </>
}

export default WordGrid