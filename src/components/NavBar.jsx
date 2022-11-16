import { useRef } from "react";

const NavBar = ({openAreYouSureModal, openNewPlayerModal}) => {
	const resetBtnRef = useRef(null);
	const newBtnRef = useRef(null);
	
    return (
        <div className="grid grid-cols-3 gap-1 px-2">
			{/* <label htmlFor="sort" className="bg-[#274c77] opacity-80 h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors">
				Sort
				<input type="checkbox" id="sort" className="hidden"/>
			</label> */}
			<button
				className="red-btn round-btn h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors"
				onClick={() => openAreYouSureModal(event, resetBtnRef, newBtnRef)}
				ref={resetBtnRef}
			>
				<span>Reset</span>
			</button>
			<button 
                className="round-btn green-btn btn h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors"
				onClick={() => openAreYouSureModal(event, resetBtnRef, newBtnRef)}
				ref={newBtnRef}
			>
				<span>New</span>
			</button>
			<button 
                className="h-10 flex justify-center items-center 
								text-white cursor-pointer transition-colors
								tracking-[0.04em] round-btn green-btn
								"
                onClick={openNewPlayerModal}
			>
				<span>Add</span>
			</button>
		</div>
    )
}

export default NavBar;