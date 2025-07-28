import { Player } from "@/lib/utils-golpea";
import React from "react";
import PlayerItem from "./PlayerItem";
import { Card, CardContent } from "../ui/card";
import { Crown } from "lucide-react";

const SelectedPlayersList = React.memo<{
    players: Player[];
    onRemove: (playerId:number) => void;
}>(({players,onRemove})=>{
    console.log("Rendering SelectedPlayersList");

    return(
        <div>
            {players.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                    <Crown className="h-10 w-10 sm:h-16 sm:w-16 text-gray-400 mb-4" />
                    <p className="text-base sm:text-lg font-medium text-gray-700 mb-2">
                        No hay jugadores en la mesa
                    </p>
                    <p className="text-sm sm:text-base text-gray-500">
                        Añade jugadores para comenzar la partida
                    </p>
                </div>
            ): (<div className="space-y-2">
                    {players.map((player) => (
                        <PlayerItem 
                            key={player.id} 
                            player={player} 
                            onRemove={onRemove} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

export default SelectedPlayersList;