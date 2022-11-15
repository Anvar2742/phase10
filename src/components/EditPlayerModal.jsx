import { useRef } from "react";

const EditPlayerModal = ({players, closeEditPlayerModal, id, editPlayerInfo, completePhaseCheck, handleCompletePhase, playerTotalPointsInput, handleTotalPointChange, totalPointsInputRef}) => {
	
	return (
		<div className="fixed inset-0 h-full flex items-center justify-center bg-slate-500/70">
			<div className="bg-red-50 p-5">
				<h2 className="font-bold text-[28px]">Update player info</h2>
				{players.map(player => {
					return player.id === id ? player.name : ''
				})}
				<label htmlFor="playerTotalPoints" className="block">
					Player Points
					<input 
						type="number" 
						id="playerTotalPoints"
						className="block mt-2 w-full p-2"
						ref={totalPointsInputRef}
						value={playerTotalPointsInput}
						onChange={handleTotalPointChange}
						onKeyDown={handleTotalPointChange}
					/>
				</label>
				<label htmlFor="completePhase" className="border-[#274c77] border-2 h-10 flex justify-center items-center text-[#333] cursor-pointer hover:border-[#14213d] transition-colors mt-4">
					Complete Phase?
					<input 
						type="checkbox" 
						id="completePhase" 
						className="ml-2"
						checked={completePhaseCheck}
						onChange={handleCompletePhase}
					/>
				</label>
                
				<div className="flex mt-5 justify-between">
					<button 
					className="bg-[#ef233c] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors p-4"
					onClick={closeEditPlayerModal}
					>Cancel</button>
					<button 
					className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors p-4"
					onClick={() => editPlayerInfo(id)}
					>Okay</button>
				</div>
			</div>
		</div>
	)
}

export default EditPlayerModal;