import Header_Golpeao from "@/components/home/header";
import { Button } from "@/components/ui/button";
import { Player } from "@/lib/utils-golpea";
import { Gamepad2, Music } from "lucide-react";
import  MultiPlayerSelector  from "@/components/golpeado/MultiPlayerSelector";
import { useCallback, useState } from "react";
import SelectedPlayersList from "@/components/golpeado/SelectedPlayersList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const handleRemovePlayer = useCallback((playerId: number): void => {
      const newPlayers = selectedPlayers.filter(p => p.id !== playerId);
      handlePlayerChange(newPlayers);
  }, [selectedPlayers, handlePlayerChange]);

  const configGame = useCallback(() => {
    const maxSelections = 7;

    const isReady = selectedPlayers.length >0 && selectedPlayers.length <= maxSelections;

    return {maxSelections, isReady};
  }, [selectedPlayers.length]);

  return (
    <div className="p-2">
      <Header_Golpeao 
        logo={<Gamepad2 className="bg-blue-600 text-white p-2 rounded-md" size={45}/>}
        titulo="Golpeado" 
        descrip="Bienvenido al juego Golpeado. Aquí podrás jugar con una mano de 7 cartas y ver quién será el donador." 
        botones={botones}/>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Mesa de Juego
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SelectedPlayersList
              players={selectedPlayers}
              onRemove={handleRemovePlayer}
            />
            <MultiPlayerSelector
              players={players}
              selectedPlayers={selectedPlayers}
              onPlayersChange={handlePlayerChange}
              placeholder="Buscar jugadores..."
              className="mt-4"
              disabled={false}
              maxSelections={7}
            />
          </CardContent>
        </Card>
        <Card className="space-y-4">
          <CardContent className="p-6 py-6 text-center">
            <p className="text-muted-foreground text-sm">Añade jugadores para comenzar la partida</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}