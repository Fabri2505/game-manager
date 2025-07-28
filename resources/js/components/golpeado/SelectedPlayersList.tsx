import { Player } from "@/lib/utils-golpea";
import React from "react";
import PlayerItem from "./PlayerItem";

const SelectedPlayersList = React.memo<{
    players: Player[];
    onRemove: (playerId:number) => void;
}>(({players,onRemove})=>{
    console.log("Rendering SelectedPlayersList");

    return(
        <div className="mt-4">
            <h4 className="font-semibold mb-2">Jugadores Seleccionados ({players.length})</h4>
            {players.length === 0 ? (
                <p className="text-gray-500 italic">No hay jugadores seleccionados</p>
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