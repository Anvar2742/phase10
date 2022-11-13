const EditPlayerModal = ({players, closeEditPlayerModal, id, handlePointChange, playerPoints, updatePlayerInfo}) => {
	return (
		<div className="fixed inset-0 h-full flex items-center justify-center bg-slate-500/70">
			<div className="bg-red-50 p-5">
				<h2 className="font-bold text-[28px]">Update player info</h2>
				{players.map(player => {
					return player.id === id ? player.name : ''
				})}
				<label htmlFor="playerPoints" className="block">
					Player Points
					<input 
						type="number" 
						id="playerPoints"
						className="block mt-2"
						ref={pointsInputRef}
						value={playerPoints}
						onChange={handlePointChange}
					/>
				</label>
				<div className="flex mt-5 justify-between">
					<button 
					className="bg-[#ef233c] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors p-4"
					onClick={closeEditPlayerModal}
					>Cancel</button>
					<button 
					className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors p-4"
					onClick={() => updatePlayerInfo(id)}
					>Oke</button>
				</div>
			</div>
		</div>
	)
}

export default EditPlayerModal;