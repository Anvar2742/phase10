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
                className={player.isRoundEnd ? "bg-green-500 text-white" : "text-[#333]"}
            >
                <td className="p-2 w-[25%]">
                    <span className="block w-full capitalize text-sm text-ellipsis max-w-[90px] overflow-hidden whitespace-nowrap">{player.name}</span>
                </td>
                <td className="p-4 text-center w-[15%]">{player.points}</td>
                <td className="p-4 text-center w-[15%]">{player.phase}</td>
                <td className="text-center w-[10%]">
                    <button className="red-btn round-btn text-[18px] w-full p-2 rounded leading-[1] flex justify-center items-center text-white cursor-pointer transition-colors shadow-btn"
                        ref={removeBtnRef}
                    >
                        <span>x</span>
                    </button>
                </td>
                <td className="text-center w-[10%]">
                    <button className="round-btn text-[18px] purple-btn w-full rounded leading-[1] flex justify-center items-center cursor-pointer transition-colors shadow-btn"
                        ref={editPlayerBtnRef}
                    >
                        <img src={editIcon} className="w-[35px] h-[35px] z-10 p-2"/>
                    </button>
                </td>
            </tr>
            <tr className="border-bottom border-b-4 border-blue-50 bg-slate-300">
                <td className="p-2 w-full" colSpan={5}>
                    <span className="w-full text-lg">
                        {phases[player.phase-1]}
                    </span>
                </td>
            </tr>
        </>
    )
}

export default Player;