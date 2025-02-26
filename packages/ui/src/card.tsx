export const Card = ({title, children} : {title: string, children: React.ReactNode}) => {
    return <div className="border border-slate-300 p-4">
        <h1 className="text-2xl border-slate-300 border-b pb-2">{title}</h1>
        <div>{children}</div>
    </div>
}