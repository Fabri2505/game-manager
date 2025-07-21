import { CardGame } from "@/components/home/card-game";

export default function HomeGames() {
  return (
    <div className="p-2">
      <h1 className="text-4xl font-bold">Home Games</h1>

      <div className="flex gap-4" >
        <CardGame 
          titulo="Golpeado" 
          descrip="Juega con una mano de 7 cartas. Veremos quien sera el donador" 
          estado="popular"
          endpoint="golpeado"/>
        <CardGame titulo="Bingo" descrip="Juego de bingo para mas de 7 personas" estado="nuevo" endpoint="golpeado"/>
      </div>
    </div>
  );
}