const ErrorMsg = ({isErrorMsg, errorMessage}) => {
    const displayClasses = isErrorMsg ? 'translate-x-0' : 'translate-x-[200px]';
    
    return (
        <div className={"fixed bottom-2 right-4 bg-red-600 p-2 px-4 text-white transition-transform " + displayClasses}>{errorMessage}</div>
    )
}

export default ErrorMsg;