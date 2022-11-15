const AreYourSureModal = ({closeAreYouSureModal, areYouSureAction, resetPlayers, newGame}) => {
    let areYourSureFunction;
    if (areYouSureAction === 'reset') {
        areYourSureFunction = resetPlayers
    } else if (areYouSureAction === 'new') {
        areYourSureFunction = newGame
    }

    return (
        <div className="fixed inset-0 h-full flex items-center justify-center bg-slate-500/70">
            <div className="bg-red-50 p-5">
                <h2 className="font-bold text-[28px]">Are you sure {areYouSureAction}?</h2>
                <div className="flex mt-5 justify-between">
                    <button 
                        className="bg-[#ef233c] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors p-4"
                        onClick={closeAreYouSureModal}
                    >Cancel</button>
                    <button 
                        className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors p-4 capitalize"
                        onClick={areYourSureFunction}
                    >{areYouSureAction}</button>
                </div>
            </div>
        </div>
    )
}

export default AreYourSureModal;