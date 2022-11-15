import { useRef } from "react";

const NavBar = ({openAreYouSureModal, openNewPlayerModal}) => {
	const resetBtnRef = useRef(null);
	const newBtnRef = useRef(null);
	
    return (
        <div className="grid grid-cols-4 gap-1">
			<label htmlFor="sort" className="bg-[#274c77] opacity-80 h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors">
				Sort
				<input type="checkbox" id="sort" className="ml-2"/>
			</label>
			<button
				className="bg-[rgb(239,35,60)] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors"
				onClick={() => openAreYouSureModal(event, resetBtnRef, resetBtnRef)}
				ref={resetBtnRef}
			>
				Reset
			</button>
			<button 
                className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors"
				onClick={() => openAreYouSureModal(event, resetBtnRef, newBtnRef)}
				ref={newBtnRef}
			>New</button>
			<button 
                className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors"
                onClick={openNewPlayerModal}
			>
				Add
			</button>
		</div>
    )
}

export default NavBar;