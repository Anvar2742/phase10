const ErrorMsg = ({isNoPlayersMsg}) => {
    const displayClasses = isNoPlayersMsg ? 'translate-x-0' : 'translate-x-[200px]';
    return (
        <div className={"fixed bottom-2 right-4 bg-green-600 p-2 px-4 text-white transition-transform " + displayClasses}>No players</div>
    )
}

export default ErrorMsg;