import { Card } from "../CardsComponent.tsx";

export function Section1() {
  return (
    <div className="w-full flex justify-center items-center pt-24 pb-10 bg-[#121214] border-t border-[#222226]">
      <h1 className="text-2xl font-normal text-center text-[#d0d0d0]">
        Reinventing the Wheel
      </h1>
    </div>
  );
}

export function Section2() {
  return (
    <div className="w-full py-20 px-10 flex justify-center gap-8 bg-[#121214]">
      <Card
        header="Hand-Tracking"
        description="Move your hands around and see what happens. This project was just practice in getting an app developed end to end."
      />
      <Card
        header="Built From Scratch"
        description="No drag-and-drop builders, no shortcuts. Every layer of this, from the ML model to the auth flow, was figured out the hard way."
      />
    </div>
  );
}