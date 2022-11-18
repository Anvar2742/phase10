import { useRef } from "react";

const NavBar = ({openAreYouSureModal, openNewPlayerModal}) => {
	const resetBtnRef = useRef(null);
	const newBtnRef = useRef(null);
	
    return (
        <div className="grid grid-cols-3 gap-1 px-2">
			<button
				className="red-btn round-btn text-[18px] h-10 flex justify-center items-center text-white cursor-pointer transition-colors shadow-btn"
				onClick={() => openAreYouSureModal(event, resetBtnRef, newBtnRef)}
				ref={resetBtnRef}
			>
				<span>Reset</span>
			</button>
			<button 
                className="round-btn text-[18px] green-btn btn h-10 flex justify-center items-center text-white cursor-pointer transition-colors shadow-btn"
				onClick={() => openAreYouSureModal(event, resetBtnRef, newBtnRef)}
				ref={newBtnRef}
			>
				<span>New</span>
			</button>
			<button 
                className="h-10 flex justify-center items-center 
								text-white cursor-pointer transition-colors
								tracking-[0.04em] round-btn text-[18px] green-btn shadow-btn
								"
                onClick={openNewPlayerModal}
			>
				<span>Add</span>
			</button>
		</div>
    )
}

export default NavBar;