import Header_Golpeao from "@/components/home/header";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

export default function Golpeado() {

  const botones = [
    <Button variant="outline" className="w-full">
      <Music />
    </Button>,
    <Button variant="outline" className="w-full">
      Rock
    </Button>
  ];

  return (
  <div className="p-2">
    <Header_Golpeao 
      titulo="Golpeado" 
      descrip="Bienvenido al juego Golpeado. Aquí podrás jugar con una mano de 7 cartas y ver quién será el donador." 
      botones={botones}/>
    </div>
  );
}