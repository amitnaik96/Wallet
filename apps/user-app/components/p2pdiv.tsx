export const P2PDiv = ({ amount, timestamp, textToDisplay, deductOrAdd } : {
    amount : number,
    timestamp : string,
    textToDisplay : string,
    deductOrAdd : string
}) => {
    return <div className="flex justify-between w-96 m-5">
                <div>
                    <div className="text-lg font-semibold">{textToDisplay} INR</div>
                    <div className="text-sm font-semibold text-slate-600">{timestamp.toString().slice(0, 15)}</div>
                </div>
                <div className="flex flex-col justify-center text-xl font-semibold">{deductOrAdd} Rs {amount / 100}</div>
            </div>
}