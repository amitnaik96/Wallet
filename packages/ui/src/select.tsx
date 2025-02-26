
interface Props {
    options : {key:string, value: string}[],
    onSelect : (value: string) => void;
}

export const Select = ({options, onSelect} : Props) => {
    return   <select onChange={e => onSelect(e.target.value)} id="countries_multiple" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
        {options.map((option)=> <option key={option.value} value={option.value}>{option.value}</option>)}
  </select>
}

