import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import EndOfRoundModal from "./components/EndOfRoundModal";
import EditPlayerModal from "./components/EditPlayerModal";

const App = () => {
	const nameInputRef = useRef(null);
	const pointsInputRef = useRef(null);
	const [players, setPlayers] = useState(localStorage.getItem('players') ? JSON.parse(localStorage.getItem('players')) : []);
	const [playersElements, setPlayersElements] = useState();
	const [isNewPlayerModal, setIsNewPlayerModal] = useState(false);
	const [isEndOfRoundModal, setIsEndOfRoundModal] = useState(false);
	const [isEditPlayerModal, setIsEditPlayerModal] = useState(false);
	const [playerName, setPlayerName] = useState('');
	const [playerPointsInput, setPlayerPointsInput] = useState(0);
	const [playerId, setPlayerId] = useState(null);
	
	const [phases, setPhases] = useState(['phase 1', 'phase 2', 'phase 3', 'phase 4', 'phase 5']);
	const [completePhaseCheck, setCompletePhaseCheck] = useState(false);

	function handleNameChange(e) {
		setPlayerName(e.target.value);
	}

	function handlePointChange(event) {
		const [min, max] = [0, 1000];
		const value = Math.max(min, Math.min(max, Number(event.target.value)));
		setPlayerPointsInput(value);
	}

	function handleCompletePhase() {
		setCompletePhaseCheck(prevCompletePhaseCheck => !prevCompletePhaseCheck);
	}

	function openNewPlayerModal() {
		setIsNewPlayerModal(true);
		setTimeout(() => {
			nameInputRef.current.focus();
		}, 100);
	}

	function closeNewPlayerModal() {
		setIsNewPlayerModal(false);
	}

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
	}

	function resetPlayers() {
		setPlayers([]);
	}

	function openEndOfRoundModal(id) {
		setIsEndOfRoundModal(true);
		setTimeout(() => {
			pointsInputRef.current.focus();
			pointsInputRef.current.select();
		}, 100);
		setPlayerId(id);
	}

	function closeEndOfRoundModal() {
		setIsEndOfRoundModal(false);
	}

	function openEditPlayerModal(id) {
		setIsEditPlayerModal(true);
		// Focus and select input in edit player modal
		// setTimeout(() => {
		// 	pointsInputRef.current.focus();
		// 	pointsInputRef.current.select();
		// }, 100);
		setPlayerId(id);
	}

	function closeEditPlayerModal() {
		setIsEditPlayerModal(false);
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




	useEffect(() => {
		setPlayersElements(players.length ? 
			players.map(player => {
				return (
					<tr 
						className="border-bottom border-b-2 border-blue-50"
						key={player.id}
						onClick={() => openEndOfRoundModal(player.id)}
					>
						<td className="p-2">
							<span className="block w-full capitalize">{player.name}</span>
							<span className="block w-full">{phases[player.phase-1]}</span>
						</td>
						<td className="p-2 text-center">{player.points}</td>
						<td className="p-2 text-center">{player.phase}</td>
						{/* <td className="p-2 text-center">
							<button className="bg-[#ef233c] h-6 pl-2 pr-2 pb-1 rounded leading-[1] flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors">x</button>
						</td>
						<td className="p-2 text-center">
							<button className="bg-[#274c77] h-6 pl-2 pr-2 rounded leading-[1] flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors"
								onClick={openEditPlayerModal}
							>edit</button>
						</td> */}
					</tr>
				)
			}) : <tr className="text-center w-full"><td className="p-2 font-semibold text-[28px]" colSpan='100%'>No players</td></tr>)

			localStorage.setItem('players', JSON.stringify(players));
	}, [players])

  return (
	<>
		<div className="grid grid-cols-4 gap-1">
			<label htmlFor="sort" className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors">
				Sort
				<input type="checkbox" id="sort" className="ml-2"/>
			</label>
			<button
				className="bg-[#ef233c] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors"
				onClick={resetPlayers}
			>
				Reset
			</button>
			<button className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors">New</button>
			<button 
			className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors"
			onClick={openNewPlayerModal}
			>
				Add
			</button>
		</div>

		<table className="w-full mt-4">
			<thead className="border-b-2 border-t-2 border-blue-50">
				<tr>
					<th className="text-left text-lg p-2 w-[60%]">Name</th>
					<th className="text-lg p-2 text-center">Points</th>
					<th className="text-lg p-2 text-center">Phase</th>
				</tr>
			</thead>
			<tbody>
				{playersElements}
			</tbody>
		</table>

		{isNewPlayerModal ? 
			<div className="fixed inset-0 h-full flex items-center justify-center bg-slate-500/70">
				<div className="bg-red-50 p-5">
					<label htmlFor="playerName" className="block">
						Player name
						<input 
							type="text" 
							id="playerName"
							className="block mt-2"
							ref={nameInputRef}
							value={playerName}
							onChange={handleNameChange}
						/>
					</label>
					<div className="flex mt-5 justify-between">
						<button 
						className="bg-[#ef233c] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors p-4"
						onClick={closeNewPlayerModal}
						>Cancel</button>
						<button 
						className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors p-4"
						onClick={() => addNewPlayer(playerName)}
						>Add Player</button>
					</div>
				</div>
			</div> : ''}
		
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
			// pointsInputRef={pointsInputRef}
			handlePointChange={handlePointChange}
			playerPoints={playerPointsInput}
			updatePlayerInfo={updatePlayerInfo}
			// completePhaseCheck={completePhaseCheck}
			handleCompletePhase={handleCompletePhase}
		/> : ''}
	</>
  );
}

export default App;
