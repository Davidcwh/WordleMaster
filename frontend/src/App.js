import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import './App.css';
import WordGrid from './components/WordGrid';
import Title from './components/Title';
import SplitFlapList from './components/SplitFlapList';
import API from './API';

const createReccWordItem = (word, expectedInfo) => {
	return { word, expectedInfo }
}
function App() {
	const [words, setWords] = useState(["", "", "", "", "", ""])
    const [currWordIndex, setCurrWordIndex] = useState(0)
	const [isEnteringResult, setIsEnteringResult] =  useState(false)
	const [currLetterIndex, setCurrLetterIndex] = useState(0)
	const [isReccWordsLoading, setIsReccWordsLoading] = useState(false)
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

	const [wordList, setWordList] = useState([]);

	const [colors, setColors] = useState([
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""]
	])

	const getResultFromColors = () => {
		let result = ""
		colors[currWordIndex].forEach((value, index, array) => {
			result = result + value.substring(0, 1)
		})

		return result
	}

	const handleAPICall = async () => {
		const guess = words[currWordIndex]
		const result = getResultFromColors()
		setIsReccWordsLoading(true)
		console.log(wordList)
		const rawResponse = await API.get_best_guesses(wordList, guess, result).catch(error => console.log(error))
		const response = await rawResponse.json()
		console.log(response)
		const { remainingWords, bestGuesses} = response
		console.log(bestGuesses)
		setIsReccWordsLoading(false)
		setReccWords(bestGuesses)
		setWordList(remainingWords)
	}

	const handleKeyDown = event => {
		const currentInput = event.key
		console.log(currWordIndex)
		console.log(words)

		if(currentInput === 'Backspace') {
			handleBackspace()
		} 
		
		// Only increment word index after pressing enter
		if(currentInput === 'Enter' && currWordIndex < 6 && words[currWordIndex].length === 5) {
			if(!isEnteringResult) {
				setIsEnteringResult(true)
			} else if(currLetterIndex === 5) {
				setIsEnteringResult(false)
				setCurrWordIndex(currWordIndex + 1)
				setCurrLetterIndex(0)
				handleAPICall()
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

	useEffect(() => {
		setWordList(require('.//data/wordle-answers-alphabetical.json'))
		console.log(wordList)
	}, []);

	return (
		<div className="App" 
			onKeyDown={handleKeyDown}
			tabIndex="0">
		<header className="App-header">
			<Grid 
				container 
				spacing={10}
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
							<SplitFlapList 
								words={reccWords} 
								setWords={words => setReccWords(words)} 
								isLoading={isReccWordsLoading}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</header>
		</div>
	);
}

export default App;
