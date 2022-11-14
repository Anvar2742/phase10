const NavBar = ({resetPlayers, handleNewClick, openNewPlayerModal}) => {
    return (
        <div className="grid grid-cols-4 gap-1">
			<label htmlFor="sort" className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors">
				Sort
				<input type="checkbox" id="sort" className="ml-2"/>
			</label>
			<button
				className="bg-[#ef233c] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors"
				onClick={resetPlayers}
			>
				Reset
			</button>
			<button 
                className="bg-[#274c77] h-10 flex justify-center items-center text-white cursor-pointer hover:bg-[#14213d] transition-colors"
				onClick={handleNewClick}
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