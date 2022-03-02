import { useState } from 'react';
import './App.css';
import WordGrid from './components/WordGrid';
import Title from './components/Title';
import { Grid } from '@mui/material'

function App() {
	const [words, setWords] = useState(["", "", "", "", "", ""])
    const [currWordIndex, setCurrWordIndex] = useState(0)
	const [isEnteringResult, setIsEnteringResult] =  useState(false)
	const [currLetterIndex, setCurrLetterIndex] = useState(0)

	const [colors, setColors] = useState([
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""]
	])

	const handleKeyDown = event => {
		const currentInput = event.key
		console.log(currWordIndex)
		console.log(words)

		if(currentInput === 'Backspace') {
			handleBackspace()
		} 
		
		// Only increment word index after pressing enter
		if(currentInput === 'Enter' && currWordIndex <  5 && words[currWordIndex].length === 5) {
			if(!isEnteringResult) {
				setIsEnteringResult(true)
			} else if(currLetterIndex === 5) {
				setIsEnteringResult(false)
				setCurrWordIndex(currWordIndex + 1)
				setCurrLetterIndex(0)
				// Make call to API here
			}
			return
		} 
		
		if("abcdefghijklmonpqrstuvwxyz".includes(currentInput)){
			if(!isEnteringResult) {
				handleNewLetter(currentInput)
			} else if(currLetterIndex < 5) {
				handleNewResult(currentInput)
			}
		}
	}

	const handleNewLetter = letter => {
		const currentWord = words[currWordIndex]
		if(currentWord.length < 5) {
			let newWords = [...words]
			newWords = [...words]
			newWords[currWordIndex] = currentWord + letter
			setWords(newWords)
		}
	}

	const handleNewResult = result => {
		if(!"gyb".includes(result)) {
			return
		}

		if(result === 'g') {
			changeColorCell("green", currLetterIndex)
		} else if(result === 'y') {
			changeColorCell("yellow", currLetterIndex)
		} else if(result === 'b') {
			changeColorCell("black", currLetterIndex)
		}

		setCurrLetterIndex(currLetterIndex + 1)
	}

	const changeColorCell = (newColor, index) => {
		let newColors = [...colors]
		let newWordColors = [...colors[currWordIndex]]
		newWordColors[index] = newColor
		newColors[currWordIndex] = newWordColors
		setColors(newColors)
	}

	const handleBackspace = () => {

		if(isEnteringResult) {
			if(currLetterIndex > 0) {
				changeColorCell("", currLetterIndex - 1)
				setCurrLetterIndex(currLetterIndex - 1)
			} else {
				setIsEnteringResult(false)
			}
		} else if(words[currWordIndex].length > 0){
			let newWords = [...words]
			newWords[currWordIndex] = newWords[currWordIndex].substring(0, newWords[currWordIndex].length - 1)
			setWords(newWords)
		}

	}

	return (
		<div className="App" 
			onKeyDown={handleKeyDown}
			tabindex="0">
		<header className="App-header">
			

			<Grid 
				container 
				spacing={5}
				direction="column"
				justifyContent="center"
				alignItems="center"
			>
				<Grid item>
					<Title/>
				</Grid>

				<Grid item>
					<WordGrid words={words} colors={colors}/>
				</Grid>
			</Grid>
		</header>
		</div>
	);
}

export default App;
