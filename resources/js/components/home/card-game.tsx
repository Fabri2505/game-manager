import { ArrowRight, WalletCards } from "lucide-react";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";

export function CardGame(
    {titulo, descrip, estado, endpoint}: 
    {titulo:string, descrip:string, estado:string, endpoint:string}
) {
  return (
    <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight transition-colors duration-300">
                <WalletCards className="p-3 mb-3 rounded-lg transition-transform duration-300 group-hover:scale-110 bg-blue-100 text-blue-700" size={72}/>
                {titulo}
            </CardTitle>
            <CardDescription>
                {descrip || "No description available."}
            </CardDescription>
            <CardAction className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 font-medium bg-blue-100 text-blue-800 border-blue-200">
                {estado}
            </CardAction>
        </CardHeader>
        <CardFooter>
            <Link href={route(endpoint)} className="w-full">
                <Button variant="ghost" className="w-full flex justify-between">
                    Iniciar Juego
                    <ArrowRight />
                </Button>
            </Link>
            
        </CardFooter>
    </Card>
  );
}