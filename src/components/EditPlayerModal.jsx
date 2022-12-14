import { CrossSvg, TickSvg } from "./SvgComponents";

const EditPlayerModal = ({handleSelecPhase, closeEditPlayerModal, currentPlayer, editPlayerInfo, completePhaseCheck, handleCompletePhase, playerTotalPointsInput, handleTotalPointChange, totalPointsInputRef, phases, currentPlayerPhase}) => {
	return (
		<div className="fixed inset-0 z-10 h-full flex items-center justify-center bg-slate-500/70">
			<div className="p-5 max-w-[300px] rounded-[21px] bg-white modal-style relative">
				<h2 className="font-bold text-[22px] mb-2">Update player info</h2>
				{currentPlayer.name}
				<label htmlFor="playerTotalPoints" className="block">
					Player Points
					<input 
						type="number" 
						id="playerTotalPoints"
						className="block mt-2 p-2 w-full bg-[#C2FDFF] rounded-[31px] text-lg text-[#333]"
						ref={totalPointsInputRef}
						value={playerTotalPointsInput}
						onChange={handleTotalPointChange}
						onKeyDown={handleTotalPointChange}
					/>
				</label>
				<label htmlFor="allPhasesSelect" className="block mt-4">
					Player Points
					<select 
						name="allPhasesSelect" 
						id="allPhasesSelect"
						className="block p-2 mt-2 text-sm w-full text-white round-btn text-[18px] shadow-btn overflow-hidden text-ellipsis max-w-100% whitespace-nowrap"
						defaultValue={currentPlayerPhase}
						onChange={() => handleSelecPhase(event, currentPlayer)}
					>
						{phases.map((phase, i) => {
							return (
								<option 
									value={phase}
									key={phase}
								>
									phase {i+1} | {phase}
								</option>
							)
						})}
					</select>
				</label>
				<label htmlFor="completePhase" className="border-[#274c77] border-2 h-10 flex justify-center items-center text-[#333] cursor-pointer transition-colors mt-4 rounded-[31px]">
					Complete Phase?
					{completePhaseCheck ? 
						<div className="ml-2">
							<TickSvg />
						</div> : 
						<div className="ml-2">
							<CrossSvg />
						</div>
					}
					<input 
						type="checkbox" 
						id="completePhase" 
						className="hidden"
						checked={completePhaseCheck}
						onChange={handleCompletePhase}
					/>
				</label>
                
				<div className="flex mt-5 justify-between">
					<button 
					className="round-btn text-[18px] red-btn shadow-btn h-10 flex justify-center items-center text-white cursor-pointer transition-colors p-4"
					onClick={closeEditPlayerModal}
					>
						<span>Cancel</span>
					</button>
					<button 
					className="round-btn text-[18px] open-btn shadow-btn h-10 flex justify-center items-center text-white cursor-pointer transition-colors p-4"
					onClick={() => editPlayerInfo(currentPlayer.id)}
					><span>Okay</span></button>
				</div>
			</div>
		</div>
	)
}

export default EditPlayerModal;