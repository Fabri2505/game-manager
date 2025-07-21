import { CardGame } from "@/components/home/card-game";
import Header_Golpeao from "@/components/home/header";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export default function HomeGames() {

  const botones = [
    <Button variant="outline" className="w-full">
      <Clock /> Historial
    </Button>
  ];

  return (
    <div className=" m-5">
      <Header_Golpeao titulo="Home Games" descrip="Juega uno de nuestros juegos" botones={botones}/>
      
      <div className="flex flex-wrap gap-4" >
        <CardGame 
          titulo="Golpeado" 
          descrip="Juega con una mano de 7 cartas. Veremos quien sera el donador" 
          estado="popular"
          endpoint="golpeado"/>
        <CardGame 
          titulo="Bingo" 
          descrip="Juego de bingo para mas de 7 personas" 
          estado="nuevo" 
          endpoint="golpeado"/>
      </div>
    </div>
  );
}