import { useRef } from "react";
import {default as editIcon} from "./../assets/edit-icon.svg";

const Player = ({player, phases, openEditPlayerModals}) => {
    const playerWrapRef = useRef(null);
    const editPlayerBtnRef = useRef(null);
    const removeBtnRef = useRef(null);

    return (
        <>
            <tr 
                
                key={player.id}
                onClick={() => openEditPlayerModals(event, player, playerWrapRef, editPlayerBtnRef, removeBtnRef)}
                ref={playerWrapRef}
            >
                <td className="p-2">
                    <span className="block w-full capitalize font-semibold text-md">{player.name}</span>
                    {/* <span className="block w-full text-sm">{phases[player.phase-1]}</span> */}
                </td>
                <td className="p-4 text-center">{player.points}</td>
                <td className="p-4 text-center">{player.phase}</td>
                <td className="text-center w-[8%] pr-2">
                    <button className="w-full bg-[#ef233c] p-3 py-1 pb-2 rounded leading-[1] flex justify-center items-center text-white cursor-pointer transition-colors"
                        ref={removeBtnRef}
                    >x</button>
                </td>
                <td className="text-center w-[15%] pl-2 pr-2">
                    <button className="w-full rounded leading-[1] flex justify-center items-center text-white cursor-pointer transition-colors"
                        ref={editPlayerBtnRef}
                    >
                        <img src={editIcon} className="w-10 h-10"/>
                    </button>
                </td>
            </tr>
            <tr className="border-bottom border-b-4 border-blue-50 bg-slate-300">
                <td className="p-2 w-full" colSpan={5}>
                    <span className="w-full text-lg font-semibold">
                        Phase:
                    </span>
                    &nbsp;
                    <span className="w-full text-lg">
                        {phases[player.phase-1]}
                    </span>
                </td>
            </tr>
        </>
    )
}

export default Player;