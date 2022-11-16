const AreYourSureModal = ({closeAreYouSureModal, areYouSureAction, resetPlayers, newGame, currentPlayer, deletePlayer}) => {
    let areYourSureFunction;
    let areYouSureMsg;
    let areYouSureBtn;
    if (areYouSureAction === 'reset') {
        areYourSureFunction = resetPlayers;
        areYouSureMsg = 'you want to reset the game';
        areYouSureBtn = 'Reset';
    } else if (areYouSureAction === 'new') {
        areYourSureFunction = newGame;
        areYouSureMsg = 'you want to start a new game';
        areYouSureBtn = 'New Game';
    } else if (areYouSureAction === 'removePlayer') {
        areYourSureFunction = deletePlayer;
        areYouSureMsg = `you want to delete ${currentPlayer.name}`;
        areYouSureBtn = `Remove ${currentPlayer.name}`;
    }

    return (
        <div className="fixed inset-0 z-10 h-full flex items-center justify-center bg-slate-500/70">
            <div className="bg-red-50 p-5">
                <h2 className="font-semibold text-[22px]">Are you sure {areYouSureMsg}?</h2>
                <div className="flex mt-5 justify-between">
                    <button 
                        className="bg-[#ef233c] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors p-4"
                        onClick={closeAreYouSureModal}
                    >Cancel</button>
                    <button 
                        className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors p-4 capitalize"
                        onClick={areYourSureFunction}
                    >{areYouSureBtn}</button>
                </div>
            </div>
        </div>
    )
}

export default AreYourSureModal;