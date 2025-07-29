import MultiPlayerSelector from "@/components/golpeado/MultiPlayerSelector";
import Header_Golpeao from "@/components/home/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Player } from "@/lib/utils-golpea";
import { Gamepad2, Link, Play, Trophy } from "lucide-react";
import React, { useCallback, useState } from "react";

const HomeGolpeado:React.FC<{
  players:Player[]
}> = ({players}) => {
  console.log(players);

  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const handlePlayerChange = useCallback((players : Player[]) => {
    setSelectedPlayers(players);
  }, []);

  const handleRemovePlayer = useCallback((playerId: number): void => {
      const newPlayers = selectedPlayers.filter(p => p.id !== playerId);
      handlePlayerChange(newPlayers);
  }, [selectedPlayers, handlePlayerChange]);

  return (
    <div>
      <Header_Golpeao 
        botones={[]}
        descrip="Inicia un nuevo juego o continúa una serie existente"
        logo={<Gamepad2 className="bg-blue-600 text-white p-2 rounded-md" size={45}/>}
        titulo="Configurar Juego de Cartas"
      />
      <div className="w-2/3 m-auto">
        <Tabs defaultValue="newGame">
          <TabsList className="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-2">
            <TabsTrigger value="newGame">Nuevo Juego</TabsTrigger>
            <TabsTrigger value="continueSerie">Continuar Serie</TabsTrigger>
          </TabsList>
          <TabsContent value="newGame">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-3xl font-bold tracking-tight"> 
                  <Play className="text-green-700" /> Iniciar Nuevo Juego
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  Crea un nuevo juego de cartas. Podrás añadir más juegos a esta serie más tarde
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="titleGame">Nombre del juego</Label>
                <Input
                  id="titleGame"
                  type="text"
                  placeholder="Ej: Golpeado de cierre de caja"
                  />
                <Label>Jugadores</Label>
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
              <CardFooter>
                <Button className="w-full"> <Play/> Iniciar nuevo juego </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="continueSerie">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-3xl font-bold tracking-tight"> 
                  <Link className="text-blue-700" /> Continuar Serie Existente
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  Añade un nuevo juego a una serie existente. Las ganancias se acumularán con los juegos anteriores.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                    <Trophy  className="h-10 w-10 sm:h-16 sm:w-16 text-gray-400 mb-4" />
                    <p className="text-base sm:text-lg font-medium text-gray-700 mb-2">
                        No hay jugadores en la mesa
                    </p>
                    <p className="text-sm sm:text-base text-gray-500">
                        Añade jugadores para comenzar la partida
                    </p>
                </div>
              </CardContent>
              <CardFooter>

              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HomeGolpeado;