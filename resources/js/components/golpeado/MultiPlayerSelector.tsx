import { Player } from "@/lib/utils-golpea";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Users } from "lucide-react";

interface MultiPlayerSelectorProps {
    players: Player[];
    selectedPlayers: Player[];
    onPlayersChange: (players: Player[]) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    maxSelections?: number;
}

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
                            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                        <Button variant="outline" size="lg">
                            <Users />
                        </Button>
                        
                        {/* DROPDOWN OPTIMIZADO */}
                        {showDropdown && filteredPlayers.length > 0 && !disabled && canAddMore && (
                            <div className="absolute z-10 w-1/2 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
                            <div className="absolute z-10 w-1/2 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-gray-500 text-center">
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
        </div>
    );
};

export default MultiPlayerSelector;

