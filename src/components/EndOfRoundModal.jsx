const EndOfRoundModal = ({players, closeEndOfRoundModal, currentPlayer, pointsInputRef, handlePointChange, playerPoints, updatePlayerInfo, completePhaseCheck, handleCompletePhase}) => {
	return (
		<div className="fixed inset-0 z-10 h-full flex items-center justify-center bg-slate-500/70">
			<div className="bg-red-50 p-5">
				<h2 className="font-bold text-[28px]">End of round</h2>
				<h3 className="font-semibold text-[18px]">
					{currentPlayer.name}
				</h3>
				<label htmlFor="playerPoints" className="block">
					Player Points
					<input 
						type="number" 
						id="playerPoints"
						className="block mt-2 p-2"
						ref={pointsInputRef}
						value={playerPoints}
						onChange={handlePointChange}
						onKeyDown={handlePointChange}
					/>
				</label>
				<label htmlFor="completePhase" className="border-[#274c77] border-2 h-10 flex justify-center items-center text-[#333] cursor-pointer hover:border-[#14213d] transition-colors mt-4">
					Complete Phase
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
					onClick={closeEndOfRoundModal}
					>Cancel</button>
					<button 
					className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors p-4"
					onClick={() => updatePlayerInfo(currentPlayer.id)}
					>Okay</button>
				</div>
			</div>
		</div>
	)
}

export default EndOfRoundModal;