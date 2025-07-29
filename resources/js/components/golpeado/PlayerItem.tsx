import { Player } from "@/lib/utils-golpea";
import React, { useCallback, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {Crown, UserCheck, UserX } from "lucide-react";


const PlayerItem = React.memo<{
  player: Player;
  onRemove: (playerId:number) => void;
  onSelect: (playerId:number, isSelected: boolean) => void;
  isSelected?:boolean;
}>(
  ({player, onRemove, onSelect, isSelected = false})=>{
  console.log(`🔄 PlayerItem ${player.name} re-renderizado`); // Para debug
  
  const [localIsSelected, setLocalIsSelected] = useState(isSelected);

  const handleRemove = useCallback(() => {
    onRemove(player.id);
  }, [onRemove, player.id]);

  const selectPlayer = useCallback(() => {
    const newEstadoSelect = !localIsSelected;
    setLocalIsSelected(newEstadoSelect);
    onSelect(player.id, newEstadoSelect);
  }, [localIsSelected, onSelect, player.id]);

  const getIniciales = (name:string)=>{
    return name.split(' ').map(palabra => palabra.charAt(0)).join('').toUpperCase().slice(0,2);
  };

  const truncateEmail = (email: string, maxLength: number = 25) => {
    if (email.length <= maxLength) return email;
    return email.substring(0, maxLength) + '...';
  };

  return (
    <Card className={`w-full max-w-sm transition-all duration-200 rounded-none ${
      localIsSelected 
        ? 'border-blue-500 border-2 bg-blue-50 shadow-md' 
        : 'border-gray-200 hover:border-gray-300'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className={`h-10 w-10 flex items-center justify-center text-white font-medium text-sm rounded-none flex-shrink-0 ${
              localIsSelected ? 'bg-blue-600' : 'bg-gray-500'
            }`}>
              {getIniciales(player.name)}
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="font-medium text-blue-900 truncate">
                {player.name}
              </CardTitle>
              <CardDescription className="text-sm text-blue-600 truncate">
                {truncateEmail(player.email)}
              </CardDescription>
            </div>
          </div>
          
          {/* Badge de estado - ahora dentro del layout */}
          {localIsSelected && (
            <div className="inline-flex items-center rounded-2xl px-2 py-1 text-xs font-semibold bg-yellow-200 text-yellow-800 border-yellow-300 flex-shrink-0 ml-2">
              <Crown className="h-3 w-3 mr-1" />Ganador
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex gap-2 pt-0">
        <Button 
          onClick={handleRemove} 
          variant="destructive"
          className="flex-1 rounded-none"
          size="sm"
        >
          <UserX className="h-4 w-4 mr-1" />
          Remover
        </Button>
        
        <Button 
          onClick={selectPlayer} 
          variant={localIsSelected ? "secondary" : "default"}
          className={`flex-1 rounded-none ${
            localIsSelected 
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          size="sm"
        >
          <UserCheck className="h-4 w-4 mr-1" />
          {localIsSelected ? 'Deseleccionar' : 'Seleccionar'}
        </Button>
      </CardContent>
    </Card>
  );
});

export default PlayerItem;