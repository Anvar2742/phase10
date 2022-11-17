import { CrossSvg, DiamondSvg, TickSvg } from "./SvgComponents";

const EndOfRoundModal = ({players, closeEndOfRoundModal, currentPlayer, pointsInputRef, handlePointChange, playerPoints, updatePlayerInfo, completePhaseCheck, handleCompletePhase}) => {
	return (
		<div className="fixed inset-0 z-10 h-full flex items-center justify-center bg-slate-500/70">
			<div className="p-5 max-w-[300px] rounded-[21px] bg-white modal-style relative">
				<h2 className="font-bold text-[22px] mb-2">End of round</h2>
				<h3 className="font-semibold text-[18px]">
					{currentPlayer.name}
				</h3>
				<label htmlFor="playerPoints" className="block">
					Player Points
					<input 
						type="number" 
						id="playerPoints"
						className="block mt-2 p-2 w-full bg-[#C2FDFF] rounded-[31px] text-lg text-[#333]"
						ref={pointsInputRef}
						value={playerPoints}
						onChange={handlePointChange}
						onKeyDown={handlePointChange}
					/>
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
					className="round-btn red-btn shadow-btn h-10 flex justify-center items-center text-white cursor-pointer transition-colors p-4"
					onClick={closeEndOfRoundModal}
					>
						<span>Cancel</span>
					</button>
					<button 
					className="round-btn open-btn shadow-btn h-10 flex justify-center items-center text-white cursor-pointer transition-colors p-4"
					onClick={() => updatePlayerInfo(currentPlayer.id)}
					><span>Okay</span></button>
				</div>
			</div>
		</div>
	)
}

export default EndOfRoundModal;