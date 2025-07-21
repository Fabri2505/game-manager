import { CardGame } from "@/components/home/card-game";
import Header_Golpeao from "@/components/home/header";

export default function HomeGames() {
  return (
    <div className=" m-5">
      <Header_Golpeao titulo="Home Games" descrip="Juega uno de nuestros juegos" botones={[]}/>
      
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