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


const App = () => {
	const nameInputRef = useRef(null);
	const pointsInputRef = useRef(null);
	const [players, setPlayers] = useState(localStorage.getItem('players') ? JSON.parse(localStorage.getItem('players')) : []);
	const [playersElements, setPlayersElements] = useState();
	const [isNewPlayerModal, setIsNewPlayerModal] = useState(false);
	const [isEndOfRoundModal, setIsEndOfRoundModal] = useState(false);
	const [isWinnerModal, setIsWinnerModal] = useState(false);
	const [isEditPlayerModal, setIsEditPlayerModal] = useState(false);
	const [playerName, setPlayerName] = useState('');
	const [playerPointsInput, setPlayerPointsInput] = useState(0);
	const [playerId, setPlayerId] = useState(null);
	
	const [phases, setPhases] = useState(localStorage.getItem('phases') ? JSON.parse(localStorage.getItem('phases')) : []);
	const [completePhaseCheck, setCompletePhaseCheck] = useState(false);
	const [winner, setWinner] = useState(false);
	const [isGameEnd, setIsGameEnd] = useState(false);
	

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
	

	function handleCompletePhase() {
		setCompletePhaseCheck(prevCompletePhaseCheck => !prevCompletePhaseCheck);
	}

	function handleNewClick() {
		setPhases(() => shuffle(phasesArray));
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
	
	function openEditPlayerModals(event, id, playerRef, editBtnRef, removeBtnRef) {
		if (editBtnRef.current === event.target) {
			setIsEditPlayerModal(true);
			// Focus and select input in edit player modal
			// setTimeout(() => {
			// 	pointsInputRef.current.focus();
			// 	pointsInputRef.current.select();
			// }, 100);
			setPlayerId(id);
			// return;
		} else if(removeBtnRef.current === event.target) {
			setPlayers(prevPlayers => {
				return prevPlayers.filter(player => {
					return player.id !== id
				})
			})
		} else if (event.target === playerRef.current || playerRef.current.contains(event.target)) {
			setIsEndOfRoundModal(true);
			setTimeout(() => {
				pointsInputRef.current.focus();
				pointsInputRef.current.select();
			}, 100);
			setPlayerId(id);
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


	
	/* Player functions */
	function addNewPlayer(name) {
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
			setPhases(() => shuffle(phasesArray));
		}
	}

	function resetPlayers() {
		setPlayers([]);
		setWinner(false);
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



	/* UseEffects */
	useEffect(() => {
		createPlayerElements()
		localStorage.setItem('players', JSON.stringify(players));
		setWinner(players.filter(player => player.phase === 10));
	}, [players]);

	useEffect(() => {
		localStorage.setItem('phases', JSON.stringify(phases));
		createPlayerElements()
	}, [phases])

	useEffect(() => {
		if (winner.length) {
			setIsGameEnd(true);
		}
	}, [winner])

  return (
	<>
		<NavBar 
			resetPlayers={resetPlayers}
			handleNewClick={handleNewClick}
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
			id={playerId}
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
			id={playerId}
			handlePointChange={handlePointChange}
			playerPoints={playerPointsInput}
			updatePlayerInfo={updatePlayerInfo}
			handleCompletePhase={handleCompletePhase}
		/> : ''}

		{isGameEnd ? <WinnerModal 
				winner={winner[0]}
				players={players}
				closeWinnerModal={closeWinnerModal}
			/> : ''}
	</>
  );
}

export default App;
