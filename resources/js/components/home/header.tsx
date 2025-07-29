import { ArrowLeft } from "lucide-react";
import { JSX } from "react";
import { Button } from "../ui/button";

export default function Header_Golpeao(
    {logo, botones, titulo, descrip}:{logo?:JSX.Element, botones:JSX.Element[], titulo:string, descrip:string}
) {
    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4 justify-baseline">
                <div className="flex items-center gap-2">
                    <Button variant="ghost"><ArrowLeft /></Button>
                    {logo && logo}
                    {/* <Gamepad2 className="bg-blue-600 text-white p-2 rounded-md" size={45}/> */}
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{titulo}</h1>
                    <p className="text-muted-foreground mt-1">{descrip}</p>
                </div>
            </div>
            <div className="flex gap-2">
                {botones.map((boton, index) => (
                    <div key={index}>{boton}</div>
                ))}
            </div>      
        </header>
    )
}