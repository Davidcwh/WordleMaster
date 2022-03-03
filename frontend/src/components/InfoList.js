import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const sx = { 
    maxWidth: 300, 
    maxHeight: "100%", 
    backgroundColor: "#333333"
}

const InfoList = ({
    words
}) => {
    return (<>
        <TableContainer component={Paper} sx={sx}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell sx={{color: "white"}}>Word</TableCell>
                    <TableCell align="right" sx={{color: "white"}}>Expected Info</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {words.map((row) => (
                    <TableRow
                        key={row.word}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" sx={{color: "white"}}>
                            {row.word}
                        </TableCell>
                        <TableCell align="right" sx={{color: "white"}}>
                            {row.expectedInfo}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}

export default InfoList;