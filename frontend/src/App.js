import { useState } from 'react';
import { Grid } from '@mui/material';
import './App.css';
import WordGrid from './components/WordGrid';
import Title from './components/Title';
import InfoList from './components/InfoList';
const createReccWordItem = (word, expectedInfo) => {
	return { word, expectedInfo}
}
function App() {
	const [words, setWords] = useState(["", "", "", "", "", ""])
    const [currWordIndex, setCurrWordIndex] = useState(0)
	const [isEnteringResult, setIsEnteringResult] =  useState(false)
	const [currLetterIndex, setCurrLetterIndex] = useState(0)
	const [reccWords, setReccWords] = useState([
		createReccWordItem('slate', 9.73303625692),
		createReccWordItem('least', 9.72313228696),
		createReccWordItem('crate', 9.70347260351),
		createReccWordItem('trail', 9.69975777415),
		createReccWordItem('trace', 9.69912049258),
		createReccWordItem('leant', 9.69551156031),
		createReccWordItem('train', 9.69509413108),
		createReccWordItem('stale', 9.68085216726),
		createReccWordItem('irate', 9.67042004581),
		createReccWordItem('crane', 9.6647170667)
	])

	

	const reccWords2 = [
		createReccWordItem('court', 4.70621893765),
		createReccWordItem('truly', 4.62323099386),
		createReccWordItem('thorn', 4.61750196021),
		createReccWordItem('torch', 4.56908098868),
		createReccWordItem('front', 4.47626177614),
		createReccWordItem('throw', 4.46492864587),
		createReccWordItem('grunt', 4.41059357441),
		createReccWordItem('brunt', 4.40207085054),
		createReccWordItem('corny', 4.39658072233),
		createReccWordItem('troop', 4.38977147733)
	];

	const reccWords3 = [
		createReccWordItem('mourn', 1.0),
		createReccWordItem('gourd', 1.0)
	];

	const reccWords4 = [
		createReccWordItem('mourn', 1.0)
	];

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
				if(currWordIndex == 0) {
					setReccWords(reccWords2)
				} else if(currWordIndex == 1) {
					setReccWords(reccWords3)
				} else if(currWordIndex == 2) {
					setReccWords(reccWords4)
				}


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
				spacing={2}
				direction="column"
				justifyContent="center"
				alignItems="space-between"
			>
				<Grid item>
					<Title/>
				</Grid>

				<Grid item>
					<Grid 
						container 
						spacing={6}
						direction="row"
						justifyContent="center"
						alignItems="flex-start"
					>
						<Grid item >
							<WordGrid words={words} colors={colors}/>
						</Grid>

						<Grid item >
							<InfoList words={reccWords}/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</header>
		</div>
	);
}

export default App;
