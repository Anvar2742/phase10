const NewPlayerModal = ({nameInputRef, playerName, handleNameChange, closeNewPlayerModal, addNewPlayer}) => {
	return (
		<div className="fixed inset-0 z-10 h-full flex items-center justify-center bg-slate-500/70">
            <div className="p-5 max-w-[300px] rounded-[21px] bg-white modal-style relative">
                <label htmlFor="playerName" className="block">
                    Player name
                    <input 
                        type="text" 
                        id="playerName"
                        className="block mt-2 p-2 w-full bg-[#C2FDFF] rounded-[31px] text-lg text-[#333]"
                        ref={nameInputRef}
                        value={playerName}
                        onChange={handleNameChange}
                    />
                </label>
                <div className="flex mt-5 justify-between">
                    <button 
                        className="round-btn text-[18px] red-btn shadow-btn h-10 flex justify-center items-center text-white cursor-pointer transition-colors p-4"
                        onClick={closeNewPlayerModal}
                    >
						<span>Cancel</span>
					</button>
                    <button 
                        className="round-btn text-[18px] open-btn shadow-btn h-10 flex justify-center items-center text-white cursor-pointer transition-colors p-4"
                        onClick={() => addNewPlayer(playerName)}
                    >
                        <span>Add Player</span>
                    </button>
                </div>
            </div>
        </div>
	)
}

export default NewPlayerModal;