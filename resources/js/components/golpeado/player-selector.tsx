import { Player } from "@/lib/utils-golpea";
import React, { useCallback, useMemo, useState } from "react";

interface MultiPlayerSelectorProps {
    players: Player[];
    selectedPlayers: Player[];
    onPlayersChange: (players: Player[]) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    maxSelections?: number;
}

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

const MultiPlayerSelector: React.FC<MultiPlayerSelectorProps> = ({
    players, 
    selectedPlayers,
    onPlayersChange,
    placeholder = "Buscar jugadores...",
    className = "",
    disabled = false,
    maxSelections
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const filteredPlayers = useMemo(() => {
        if (searchTerm.length === 0) return [];

        const selectIds = new Set(selectedPlayers.map(p => p.id));

        return players.filter(player => 
            !selectIds.has(player.id) && (
                player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                player.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, selectedPlayers, players]);


    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>):void => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowDropdown(value.length > 0);
    }, []);

    const handlePlayerSelect = useCallback((player: Player): void => {
        // Verificar límite máximo
        if (maxSelections && selectedPlayers.length >= maxSelections) {
            alert(`Máximo ${maxSelections} jugadores permitidos`);
            return;
        }

        // Agregar player a la lista
        const newPlayers = [...selectedPlayers, player];
        onPlayersChange(newPlayers);
        
        // Limpiar búsqueda
        setSearchTerm('');
        setShowDropdown(false);
    }, [selectedPlayers, onPlayersChange, maxSelections]);

    const handleRemovePlayer = useCallback((playerId: number): void => {
        const newPlayers = selectedPlayers.filter(p => p.id !== playerId);
        onPlayersChange(newPlayers);
    }, [selectedPlayers, onPlayersChange]);

    const clearAllPlayers = useCallback((): void => {
        onPlayersChange([]);
    }, [onPlayersChange]);

    // 🚀 OPTIMIZACIÓN 3: Verificar si puede agregar más
    const canAddMore = useMemo(() => {
        return !maxSelections || selectedPlayers.length < maxSelections;
    }, [maxSelections, selectedPlayers.length]);

    return (
        <div className={`${className}`}>
            {/* INPUT DE BÚSQUEDA */}
            <div className="relative">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder={canAddMore ? placeholder : `Máximo ${maxSelections} jugadores`}
                            disabled={disabled || !canAddMore}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                        
                        {/* DROPDOWN OPTIMIZADO */}
                        {showDropdown && filteredPlayers.length > 0 && !disabled && canAddMore && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {filteredPlayers.map((player) => (
                                    <div
                                        key={player.id}
                                        onClick={() => handlePlayerSelect(player)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    >
                                        <div className="font-medium">{player.name}</div>
                                        <div className="text-sm text-gray-600">{player.email}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {/* NO HAY RESULTADOS */}
                        {showDropdown && filteredPlayers.length === 0 && searchTerm.length > 0 && canAddMore && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-gray-500 text-center">
                                No se encontraron jugadores disponibles
                            </div>
                        )}
                    </div>
                    
                    {/* BOTÓN LIMPIAR TODO */}
                    {selectedPlayers.length > 0 && (
                        <button
                            onClick={clearAllPlayers}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Limpiar Todo
                        </button>
                    )}
                </div>
                
                {/* CONTADOR */}
                {maxSelections && (
                    <div className="mt-2 text-sm text-gray-600">
                        {selectedPlayers.length} / {maxSelections} jugadores seleccionados
                    </div>
                )}
            </div>

            {/* 🚀 LISTA OPTIMIZADA - Solo se re-renderiza cuando cambian los selectedPlayers */}
            <SelectedPlayersList 
                players={selectedPlayers} 
                onRemove={handleRemovePlayer} 
            />
        </div>
    );
};

export default MultiPlayerSelector;

