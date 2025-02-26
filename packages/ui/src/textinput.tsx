interface Props {
    placeholder: string;
    onChange: (val : string) => void;
    label : string
}

export const TextInput = ({placeholder, onChange, label} : Props) => {
    return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input onChange={e => onChange(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder={placeholder}"/>
    </div> 
}