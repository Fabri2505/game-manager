import Header_Golpeao from "@/components/home/header";
import { Button } from "@/components/ui/button";
import { Player } from "@/lib/utils-golpea";
import { Music } from "lucide-react";
import  MultiPlayerSelector  from "@/components/golpeado/player-selector";
import { useCallback, useState } from "react";

export default function Golpeado({players}: { players: Player[] }) {
  console.log("Rendering Golpeado");
  console.log("Jugadores recibidos:", players);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const botones = [
    <Button variant="outline" className="w-full">
      <Music />
    </Button>,
    <Button variant="outline" className="w-full">
      Rock
    </Button>
  ];

  const handlePlayerChange = useCallback((players : Player[]) => {
    setSelectedPlayers(players);
  }, []);

  const configGame = useCallback(() => {
    const maxSelections = 7;

    const isReady = selectedPlayers.length >0 && selectedPlayers.length <= maxSelections;

    return {maxSelections, isReady};
  }, [selectedPlayers.length]);

  return (
    <div className="p-2">
      <Header_Golpeao 
        titulo="Golpeado" 
        descrip="Bienvenido al juego Golpeado. Aquí podrás jugar con una mano de 7 cartas y ver quién será el donador." 
        botones={botones}/>

      <MultiPlayerSelector
        players={players}
        selectedPlayers={selectedPlayers}
        onPlayersChange={handlePlayerChange}
        placeholder="Buscar jugadores..."
        className="mt-4"
        disabled={false}
        maxSelections={7}
      />

    </div>
  );
}