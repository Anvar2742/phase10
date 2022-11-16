import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import EndOfRoundModal from "./components/EndOfRoundModal";
import EditPlayerModal from "./components/EditPlayerModal";
import Player from "./components/Player";
import WinnerModal from "./components/WinnerModal";
import NewPlayerModal from "./components/NewPlayerModal";
import NavBar from "./components/NavBar";
import Table from "./components/Table";
import {shuffle} from "./assets";
import { max, min, phasesArray } from "./assets/constants";
import AreYourSureModal from "./components/AreYourSureModal";
import ErrorMsg from "./components/ErrorMsg";
import {default as bg} from './assets/bg.jpg';


const App = () => {
	const nameInputRef = useRef(null);
	const pointsInputRef = useRef(null);
	const totalPointsInputRef = useRef(null);
	const [players, setPlayers] = useState(localStorage.getItem('players') ? JSON.parse(localStorage.getItem('players')) : []);
	const [playersElements, setPlayersElements] = useState();
	const [isNewPlayerModal, setIsNewPlayerModal] = useState(false);
	const [isEndOfRoundModal, setIsEndOfRoundModal] = useState(false);
	const [isAreYouSureModal, setIsAreYouSureModal] = useState(false);
	const [isErrorMsg, setIsErrorMsg] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [areYouSureAction, setAreYouSureAction] = useState('');
	const [isEditPlayerModal, setIsEditPlayerModal] = useState(false);
	const [playerName, setPlayerName] = useState('');
	const [playerPointsInput, setPlayerPointsInput] = useState(0);
	const [playerTotalPointsInput, setPlayerTotalPointsInput] = useState(0);
	const [currentPlayer, setСurrentPlayer] = useState(null);
	
	const [phases, setPhases] = useState(localStorage.getItem('phases') ? JSON.parse(localStorage.getItem('phases')) : []);
	const [completePhaseCheck, setCompletePhaseCheck] = useState(false);
	const [winner, setWinner] = useState(false);
	const [isGameEnd, setIsGameEnd] = useState(false);
	const [currentPlayerPhase, setCurrentPlayerPhase] = useState('');

	const phasesArrayCopy = [...phasesArray];
	

	/* Handlers */
	function handleNameChange(e) {
		setPlayerName(e.target.value);
	}

	function handlePointChange(event) {
		if (event.keyCode === 8 && (+(event.target.value) === 0 || event.target.value.length === 1)) {
			setPlayerPointsInput('');
		} else if (window.getSelection().toString() === event.target.value && event.keyCode === 8) {
			setPlayerPointsInput('');
		} else if (event.target.value.length) {
			let val = Math.max(min, Math.min(max, Number(event.target.value))).toString()
			const indexOf = val.indexOf('0')
			if (indexOf === 0 && val.length > 1) {
				val = val.slice(indexOf, indexOf);
			}

			setPlayerPointsInput(val);
		}
	}

	function handleTotalPointChange(event) {
		if (event.keyCode === 8 && (+(event.target.value) === 0 || event.target.value.length === 1)) {
			setPlayerTotalPointsInput('');
		} else if (window.getSelection().toString() === event.target.value && event.keyCode === 8) {
			setPlayerTotalPointsInput('');
		} else if (event.target.value.length) {
			let val = Math.max(min, Math.min(max, Number(event.target.value))).toString()
			const indexOf = val.indexOf('0')
			if (indexOf === 0 && val.length > 1) {
				val = val.slice(indexOf, indexOf);
			}

			setPlayerTotalPointsInput(val);
		}
	}

	function handleCompletePhase() {
		setCompletePhaseCheck(prevCompletePhaseCheck => !prevCompletePhaseCheck);
	}



	/* Modals */
	function openNewPlayerModal() {
		setIsNewPlayerModal(true);
		setTimeout(() => {
			nameInputRef.current.focus();
		}, 100);
	}

	function closeNewPlayerModal() {
		setIsNewPlayerModal(false);
	}
	
	function openEditPlayerModals(event, currentPlayer, playerRef, editBtnRef, removeBtnRef) {
		if (editBtnRef.current === event.target) {
			setIsEditPlayerModal(true);
			setTimeout(() => {
				totalPointsInputRef.current.focus();
				totalPointsInputRef.current.select();
			}, 100);
			setСurrentPlayer(currentPlayer);
			setPlayerTotalPointsInput(currentPlayer.points);
			setCurrentPlayerPhase(phases[currentPlayer.phase-1]);
		} else if(removeBtnRef.current === event.target) {
			setIsAreYouSureModal(true);
			setAreYouSureAction('removePlayer');
			setСurrentPlayer(currentPlayer);
		} else if (event.target === playerRef.current || playerRef.current.contains(event.target)) {
			setIsEndOfRoundModal(true);
			setTimeout(() => {
				pointsInputRef.current.focus();
				pointsInputRef.current.select();
			}, 100);
			setСurrentPlayer(currentPlayer);
		}
	}

	function closeEndOfRoundModal() {
		setIsEndOfRoundModal(false);
		setPlayerPointsInput(0);
	}
	
	function closeEditPlayerModal() {
		setIsEditPlayerModal(false);
	}

	function closeWinnerModal() {
		setIsGameEnd(false);
	}

	function openAreYouSureModal(event, resetBtnRef, newBtnRef) {
		if (players.length) {
			if (event.target === resetBtnRef.current || resetBtnRef.current.contains(event.target)) {
				setAreYouSureAction('reset');
			} else if (event.target === newBtnRef.current || newBtnRef.current.contains(event.target)) {
				setAreYouSureAction('new');
			}
			setIsAreYouSureModal(true);
		} else {
			setIsErrorMsg(true);
			setErrorMessage('No players');
		}
	}

	function closeAreYouSureModal() {
		setIsAreYouSureModal(false);
	}


	
	/* Player functions */
	function addNewPlayer(name) {
		const nameExists = players.findIndex((player) => player.name.toLowerCase() === name.toLowerCase())
		
		if (nameExists !== -1) {
			setIsErrorMsg(true);
			setErrorMessage('Name taken');
			return;
		}
		
		setPlayers(prevPlayers => {
			return [
				...prevPlayers,
				{
					id: nanoid(),
					name: name,
					points: 0,
					phase: 1
				}
			]
		})
		setPlayerName('');
		setIsNewPlayerModal(false);
		if (players.length === 0) {
			setPhases(() => shuffle(phasesArrayCopy));
		}
	}

	function resetPlayers() {
		setPlayers([]);
		setWinner(false);
		closeAreYouSureModal(false);
	}

	function updatePlayerInfo(id) {
		setPlayers(prevPlayers => {
			return prevPlayers.map(player => {
				if (player.id === id) {
					return {
						...player,
						points: +(player.points) + +(playerPointsInput),
						phase: completePhaseCheck ? player.phase + 1 : player.phase
					}
				} else {
					return player
				}
			})
		})

		setIsEndOfRoundModal(false);
		setPlayerPointsInput(0);
		setCompletePhaseCheck(false);
	}

	function editPlayerInfo(id) {
		setPlayers(prevPlayers => {
			return prevPlayers.map(player => {
				if (player.id === id) {
					return {
						...player,
						points: playerTotalPointsInput,
						phase: completePhaseCheck ? player.phase + 1 : phases.indexOf(currentPlayerPhase)+1
					}
				} else {
					return player
				}
			})
		})

		setPlayerTotalPointsInput(0);
		setCompletePhaseCheck(false);
		setIsEditPlayerModal(false);
	}

	function createPlayerElements() {
		setPlayersElements(players.length ? 
			players.map(player => {
				return (
					<Player
						key={player.id}
						player={player}
						phases={phases}
						openEditPlayerModals={openEditPlayerModals}
					/>
				)
			}) : <tr className="text-center w-full"><td className="p-2 font-semibold text-[28px]" colSpan='100%'>No players</td></tr>)
	}

	function newGame() {
		setPhases(() => shuffle(phasesArrayCopy));
		setPlayers([]);
		setIsAreYouSureModal(false);
		openNewPlayerModal();
	}

	function handleSelecPhase(event) {
		setCurrentPlayerPhase(event.target.value);
	}

	function deletePlayer() {
		setPlayers(prevPlayers => {
			return prevPlayers.filter(player => {
				return player.id !== currentPlayer.id
			})
		})

		setIsAreYouSureModal(false);
	}



	/* UseEffects */
	useEffect(() => {
		createPlayerElements()
		localStorage.setItem('players', JSON.stringify(players));
		setWinner(players.filter(player => player.phase === 10));
	}, [players]);

	useEffect(() => {
		localStorage.setItem('phases', JSON.stringify(phases));
		createPlayerElements();
	}, [phases])

	useEffect(() => {
		if (winner.length) {
			setIsGameEnd(true);
		}
	}, [winner])

	useEffect(() => {
		setTimeout(() => {
			setIsErrorMsg(false);
		}, 3000);
	}, [isErrorMsg])

	useEffect(() => {
		// document.documentElement.style.setProperty('--bodyColor', 'red');
	}, [])

  return (
	<main 
		style={{backgroundImage: `url('${bg}')`}}
		className="h-screen bg-no-repeat bg-cover bg-center">
		<div className="max-w-sm mx-auto bg-[#e2e2e2] overflow-y-hidden max-h-[100vh]">
			<NavBar 
				openAreYouSureModal={openAreYouSureModal}
				openNewPlayerModal={openNewPlayerModal}
			/>

			<Table 
				playersElements={playersElements}
			/>

			{isNewPlayerModal ?
				<NewPlayerModal 
					nameInputRef={nameInputRef}
					playerName={playerName}
					handleNameChange={handleNameChange}
					closeNewPlayerModal={closeNewPlayerModal}
					addNewPlayer={addNewPlayer}
				/> : ''}
			
			{isEndOfRoundModal ? <EndOfRoundModal 
				players={players}
				closeEndOfRoundModal={closeEndOfRoundModal}
				currentPlayer={currentPlayer}
				pointsInputRef={pointsInputRef}
				handlePointChange={handlePointChange}
				playerPoints={playerPointsInput}
				updatePlayerInfo={updatePlayerInfo}
				completePhaseCheck={completePhaseCheck}
				handleCompletePhase={handleCompletePhase}
			/> : ''}

			{isEditPlayerModal ? <EditPlayerModal 
				players={players}
				closeEditPlayerModal={closeEditPlayerModal}
				currentPlayer={currentPlayer}
				handleTotalPointChange={handleTotalPointChange}
				editPlayerInfo={editPlayerInfo}
				handleCompletePhase={handleCompletePhase}
				playerTotalPointsInput={playerTotalPointsInput}
				totalPointsInputRef={totalPointsInputRef}
				phases={phases}
				currentPlayerPhase={currentPlayerPhase}
				handleSelecPhase={handleSelecPhase}
			/> : ''}

			{isGameEnd ? <WinnerModal 
					winner={winner[0]}
					players={players}
					closeWinnerModal={closeWinnerModal}
				/> : ''}

			{isAreYouSureModal ? 
			<AreYourSureModal 
				closeAreYouSureModal={closeAreYouSureModal}
				areYouSureAction={areYouSureAction}
				resetPlayers={resetPlayers}
				newGame={newGame}
				currentPlayer={currentPlayer}
				deletePlayer={deletePlayer}
			/> : ''}

			<ErrorMsg 
				isErrorMsg={isErrorMsg}
				errorMessage={errorMessage}
			/>
		</div>
	</main>
  );
}

export default App;
