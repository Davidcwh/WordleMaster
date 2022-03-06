import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import Slide from '@mui/material/Slide';
import '../App.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialogContent = styled(DialogContent)`
    background-color: #1d1d1f;
    color: white;
`
const StyledDialogActions = styled(DialogActions)`
    background-color: #1d1d1f;
`

const StyledGitHubIcon = styled(GitHubIcon)`
    color: white;
`

const StyledDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{color: "white", backgroundColor: "#1d1d1f" }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
};
  

const InfoDialog = ({
    isOpen,
    setIsOpen
}) => {
    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <Dialog
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
        >
            <StyledDialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography variant='h4' sx={{fontWeight: "bold"}}>                
                    What Is Wordle Master ?
                </Typography>
            </StyledDialogTitle>
            <StyledDialogContent dividers>
            <Typography gutterBottom variant='body1' paragraph>
                Given your guess word and its result, <i>Wordle Master</i> provides you with a list of the next best guesses! 
            </Typography>
            <Typography gutterBottom variant='h5' sx={{fontWeight: "bold"}}>                
                How To Use
            </Typography>
            <Typography gutterBottom variant='body1' paragraph>                
                Type in your guess and lock it in by pressing <code>ENTER</code>. <br/>
                Next, enter the result of the guess - key '<code>g</code>' for 🟩  ,
                '<code>y</code>' for 🟨 , and  '<code>b</code>' for ⬛. <br/>
                Hit <code>ENTER</code> again to get your next best guesses!
            </Typography>

            <hr/><br/>
            <Typography gutterBottom variant='h5' sx={{fontWeight: "bold"}}>                
                Calculating Best Guesses
            </Typography>
            <Typography gutterBottom variant='body1' paragraph>
                The next best guesses are determined by their calculated <b><i>expected</i> number of information bits</b>. 
                The number of information bits of a given guess is the number of times the size of remaining possible words left is <b>halved</b>, based on a given result.
            </Typography>
            <Typography gutterBottom variant='body1' paragraph>
                Therefore, the <b><i>expected</i> number of information bits</b> of a word is the average number of information bits over all possible results.
            </Typography>
            <Typography gutterBottom variant='body1' paragraph>
                For example, if a word 'FUZZY' has an expected information bit of 2, it means that choosing 'FUZZY' as your next guess would reduce the possible
                remaining number of words by a quarter.
            </Typography>

            <hr/><br/>
            <Typography gutterBottom variant='h5' sx={{fontWeight: "bold"}}>                
                Thinking Two Steps Ahead
            </Typography>
            <Typography gutterBottom variant='body1' paragraph>
                The initial list of best guesses is determined by the sum of the expected number of information bits of the best first
                guess and their subsequent best second guess.
            </Typography>
            <Typography gutterBottom variant='body1' paragraph>
                This ensures that the initial list of best guesses allows you to cut down the size of 
                the remaining possible words as much as possible after your first two guesses.
            </Typography>
            </StyledDialogContent>
            <StyledDialogActions>
                <IconButton href={process.env.REACT_APP_GITHUB_LINK} target="_blank">
                    <StyledGitHubIcon/>
                </IconButton>
            </StyledDialogActions>
      </Dialog>
    )
}

export default InfoDialog