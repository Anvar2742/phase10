import { useRef } from "react";

const Player = ({player, phases, openEditPlayerModals}) => {
    const playerWrapRef = useRef(null);
    const editPlayerBtnRef = useRef(null);
    const removeBtnRef = useRef(null);

    return (
        <tr 
            className="border-bottom border-b-2 border-blue-50"
            key={player.id}
            onClick={() => openEditPlayerModals(event, player.id, playerWrapRef, editPlayerBtnRef, removeBtnRef)}
            ref={playerWrapRef}
        >
            <td className="p-2">
                <span className="block w-full capitalize font-semibold text-lg">{player.name}</span>
                <span className="block w-full">{phases[player.phase-1]}</span>
            </td>
            <td className="p-2 text-center">{player.points}</td>
            <td className="p-2 text-center">{player.phase}</td>
            <td className="text-center w-[8%] pr-2">
                <button className="w-full bg-[#ef233c] pl-2 pr-2 pb-1 rounded leading-[1] flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors"
                    ref={removeBtnRef}
                >x</button>
            </td>
            <td className="text-center w-[10%] pl-2 pr-2">
                <button className="w-full bg-[#274c77] p-2 rounded leading-[1] flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors"
                    // onClick={() => openEditPlayerModal(event, id, editPlayerBtnRef)}
                    ref={editPlayerBtnRef}
                >edit</button>
            </td>
        </tr>
    )
}

export default Player;