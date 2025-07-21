import { JSX } from "react";

export default function Header_Golpeao(
    {botones, titulo, descrip}:{botones:JSX.Element[], titulo:string, descrip:string}
) {
    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <h1 className="text-4xl font-bold tracking-tight">{titulo}</h1>
                <p className="text-muted-foreground mt-1">{descrip}</p>
            </div>
            <div className="flex gap-2">
                {botones.map((boton, index) => (
                    <div key={index}>{boton}</div>
                ))}
            </div>      
        </header>
    )
}