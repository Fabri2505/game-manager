import { Player } from "@/lib/utils-golpea";
import React, { useCallback } from "react";


const PlayerItem = React.memo<{
    player: Player;
    onRemove: (playerId:number) => void;}>
(({player, onRemove})=>{
    console.log(`🔄 PlayerItem ${player.name} re-renderizado`); // Para debug
    const handleRemove = useCallback(() => {
        onRemove(player.id);
    }, [onRemove, player.id]);

    return (
        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div>
                <div className="font-medium text-blue-900">{player.name}</div>
                <div className="text-sm text-blue-600">{player.email}</div>
            </div>
            <button
                onClick={handleRemove}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
                Remover
            </button>
        </div>
    );
});

export default PlayerItem;