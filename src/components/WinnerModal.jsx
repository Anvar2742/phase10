import ReactConfetti from "react-confetti";
import {sortArrayAsc} from '../assets/index'

const WinnerModal = ({players, closeWinnerModal, winner}) => {
    const playersWithoutWinner = sortArrayAsc(players.filter(player => !(player.id === winner.id)));
    
	return (
		<>
            <div className="fixed inset-0 z-10 h-full flex items-center justify-center bg-slate-500/70">
                <div className="p-5 max-w-[300px] rounded-[21px] bg-white modal-style relative">
                    <h2 className="font-bold text-[28px]">
                        <span className="capitalize">{winner?.name}</span> wins!
                    </h2>
                    {playersWithoutWinner.map((player, i) => {
                        return (
                            <div className="flex justify-between border-b-2 border-black" key={player.id}>
                                <h3>{player.name}</h3>
                                <span>{i+2} Place</span>
                            </div>
                        )
                    })}
                    <div className="flex mt-5 justify-between">
                        <button 
                            className="bg-[#ef233c] h-10 w-full flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors p-4"
                            onClick={closeWinnerModal}
                        >
						<span>Cancel</span>
					</button>
                    </div>
                </div>
            </div>
            <ReactConfetti />
        </>
	)
}

export default WinnerModal;