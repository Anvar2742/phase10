const AreYourSureModal = ({players, closeAreYouSureModal, areYouSureAction, resetPlayers, newGame, currentPlayer, deletePlayer}) => {
    let areYourSureFunction;
    let areYouSureMsg;
    let areYouSureSubMsg;
    let areYouSureBtn;
    if (areYouSureAction === 'reset') {
        areYourSureFunction = resetPlayers;
        areYouSureMsg = 'you want to reset the game';
        areYouSureBtn = 'Reset';
    } else if (areYouSureAction === 'new') {
        areYourSureFunction = newGame;
        areYouSureMsg = 'you want to start a new game';
        if (players.length) {
            areYouSureSubMsg = 'Heads up! This will shuffle the phases and remove the players.';
        } else {
            areYouSureSubMsg = 'Heads up! This will shuffle the phases. Just add a new player if you want to keep the phases.';
        }
        areYouSureBtn = 'New Game';
    } else if (areYouSureAction === 'removePlayer') {
        areYourSureFunction = deletePlayer;
        areYouSureMsg = `you want to delete ${currentPlayer.name}`;
        areYouSureBtn = `Remove ${currentPlayer.name}`;
    }

    return (
        <div className="fixed inset-0 z-10 h-full flex items-center justify-center bg-slate-500/70">
            <div className="p-5 max-w-[300px] rounded-[21px] bg-white modal-style relative">
                <h2 className="font-semibold text-[22px] mb-2">Are you sure {areYouSureMsg}?</h2>
                <p className="text-md font-sans">
                    {areYouSureSubMsg}
                </p>
                <div className="flex mt-5 justify-between">
                    <button 
                        className="round-btn text-[18px] red-btn shadow-btn h-10 flex justify-center items-center text-white cursor-pointer transition-colors p-4"
                        onClick={closeAreYouSureModal}
                    >
                        <span>Cancel</span>
                    </button>
                    <button 
                        className="round-btn text-[18px] open-btn shadow-btn flex justify-center items-center text-white cursor-pointer transition-colors px-4 capitalize"
                        onClick={areYourSureFunction}
                    >
                        <span>{areYouSureBtn}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AreYourSureModal;