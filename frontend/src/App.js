import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import './App.css';
import WordGrid from './components/WordGrid';
import Title from './components/Title';
import SplitFlapList from './components/SplitFlapList';
import InfoQuestionButton from './components/InfoQuestionButton';
import API from './utils/API';
import FileReader from './utils/FileReader';
import {
	BACKSPACE,
    ENTER,
    ALPAHBET_LOWERCASE,
    RESULT_GREEN_KEY,
    RESULT_YELLOW_KEY,
    RESULT_BLACK_KEY,
    RESULT_GREEN_VALUE,
    RESULT_YELLOW_VALUE,
    RESULT_BLACK_VALUE,
    EMPTY_STRING,
	NUM_GUESSES,
    WORD_LENGTH
} from './utils/Constants';

const createReccWordItem = (word, expectedInfo) => {
	return { word, expectedInfo }
}

const generateEmptyStringArray = length => {
	const arr = []
	for(let i = 0; i < length; i++) {
		arr.push(EMPTY_STRING)
	}
	return arr
}

const generateEmptyString2DArray = (row, col) => {
	const arr = []
	for(let r = 0; r < row; r++) {
		arr.push(generateEmptyStringArray(col))
	}
	return arr
}

function App() {
	const [words, setWords] = useState(generateEmptyStringArray(NUM_GUESSES))
    const [currWordIndex, setCurrWordIndex] = useState(0)
	const [isEnteringResult, setIsEnteringResult] =  useState(false)
	const [currLetterIndex, setCurrLetterIndex] = useState(0)
	const [isReccWordsLoading, setIsReccWordsLoading] = useState(false)
	const [reccWords, setReccWords] = useState([])
	const [wordList, setWordList] = useState([]);
	const [colors, setColors] = useState(generateEmptyString2DArray(NUM_GUESSES, WORD_LENGTH))

	const getResultFromColors = () => {
		let result = EMPTY_STRING
		colors[currWordIndex].forEach((value, index, array) => {
			result = result + value.substring(0, 1)
		})

		return result
	}

	const handleAPICall = async () => {
		const guess = words[currWordIndex]
		const result = getResultFromColors()
		setIsReccWordsLoading(true)

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

		if(currentInput === BACKSPACE) {
			handleBackspace()
		} 
		
		// Only increment word index after pressing enter
		if(currentInput === ENTER && currWordIndex < NUM_GUESSES && words[currWordIndex].length === WORD_LENGTH) {
			if(!isEnteringResult) {
				setIsEnteringResult(true)
			} else if(currLetterIndex === WORD_LENGTH) {
				setIsEnteringResult(false)
				setCurrWordIndex(currWordIndex + 1)
				setCurrLetterIndex(0)
				handleAPICall()
			}
			return
		} 
		
		if(ALPAHBET_LOWERCASE.includes(currentInput)){
			if(!isEnteringResult) {
				handleNewLetter(currentInput)
			} else if(currLetterIndex < WORD_LENGTH) {
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
		if(!(RESULT_GREEN_KEY + RESULT_YELLOW_KEY + RESULT_BLACK_KEY).includes(result)) {
			return
		}

		if(result === RESULT_GREEN_KEY) {
			changeColorCell(RESULT_GREEN_VALUE, currLetterIndex)
		} else if(result === RESULT_YELLOW_KEY) {
			changeColorCell(RESULT_YELLOW_VALUE, currLetterIndex)
		} else if(result === RESULT_BLACK_KEY) {
			changeColorCell(RESULT_BLACK_VALUE, currLetterIndex)
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
				changeColorCell(EMPTY_STRING, currLetterIndex - 1)
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
		setWordList(FileReader.read(process.env.REACT_APP_WORD_LIST_FILE))
		setReccWords(FileReader.read(process.env.REACT_APP_INITIAL_BEST_GUESSES_FILE).map(item => {
			return createReccWordItem(item[1], item[0])
		}).slice(0, 10))
	}, []);


	return (
		<div className="App" 
			onKeyDown={handleKeyDown}
			tabIndex="0">
		<header className="App-header">
			<Grid 
				container 
				direction="row"
			>
				<Grid item xs></Grid>

				<Grid item xs="auto">
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
				</Grid>

				<Grid item xs>
						<Grid 
							container 
							spacing={16}
							direction="column"
							justifyContent="flex-start"
							alignItems="flex-start"
						>
							<Grid item></Grid>
							<Grid item><InfoQuestionButton/></Grid>
							
						</Grid>
				</Grid>
			</Grid>
		</header>
		</div>
	);
}

export default App;
