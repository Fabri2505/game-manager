import Header_Golpeao from "@/components/home/header";

export default function Golpeado() {
  return (
    <div className="p-2">
        <Header_Golpeao 
            titulo="Golpeado" 
            descrip="Bienvenido al juego Golpeado. Aquí podrás jugar con una mano de 7 cartas y ver quién será el donador." 
            botones={[]}/>
    </div>
  );
}