import IconButton from '@mui/material/IconButton';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import styled from '@emotion/styled';
import InfoDialog from './InfoDialog';
import { useState } from 'react';

const StyledQuestionIcon = styled(HelpOutlineOutlinedIcon)`
    color: gray;
    &:hover {
        color: white;
    }
`

const InfoQuestionButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    }

    return (<>
        <IconButton onClick={handleOpen}>
            <StyledQuestionIcon fontSize="large"/>
        </IconButton>
        <InfoDialog isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>)
}

export default InfoQuestionButton