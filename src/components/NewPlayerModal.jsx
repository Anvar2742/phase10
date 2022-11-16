const NewPlayerModal = ({nameInputRef, playerName, handleNameChange, closeNewPlayerModal, addNewPlayer}) => {
	return (
		<div className="fixed inset-0 z-10 h-full flex items-center justify-center bg-slate-500/70">
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
        </div>
	)
}

export default NewPlayerModal;