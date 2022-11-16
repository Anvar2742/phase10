const Table = ({playersElements}) => {
    return (
		<table className="w-full mt-2">
			<thead className="border-b-2 border-t-2 border-blue-50">
				<tr>
					<th className="text-md p-2 text-left w-[25%]">Name</th>
					<th className="text-md p-2 text-center w-[15%]">Points</th>
					<th className="text-md p-2 text-center w-[15%]">Phase</th>
					<th className="text-md p-2 text-center w-[10%]"></th>
					<th className="text-md p-2 text-center w-[10%]"></th>
				</tr>
			</thead>
			<tbody>
				{playersElements}
			</tbody>
		</table>
    )
}

export default Table;