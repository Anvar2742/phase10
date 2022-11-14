const Table = ({playersElements}) => {
    return (
        <table className="w-full mt-4">
			<thead className="border-b-2 border-t-2 border-blue-50">
				<tr>
					<th className="text-left text-md p-2 w-[60%]">Name</th>
					<th className="text-md p-2 text-center">Points</th>
					<th className="text-md p-2 text-center">Phase</th>
				</tr>
			</thead>
			<tbody>
				{playersElements}
			</tbody>
		</table>
    )
}

export default Table;