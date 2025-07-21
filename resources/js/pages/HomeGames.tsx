import { CardGame } from "@/components/home/card-game";

export default function HomeGames() {
  return (
    <div className=" m-5">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Home Games</h1>
          <p className="text-muted-foreground mt-1">Juega uno de nuestros juegos</p>
        </div>      
      </header>
      

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