"use client";

import { useEffect, useState } from "react";

interface Comment {
  id: string;
  name: string;
  text: string;
}

interface Machine {
  id: string;
  name: string;
  note: string;
  comments: Comment[];
}

interface Shift {
  id: string;
  name: string;
  machines: Machine[];
}

export default function DashboardPage() {
  const [selectedShiftId, setSelectedShiftId] = useState("morning");
  const [shifts, setShifts] = useState<Shift[]>([]);

  const names = [
    "Marek",
    "Jano",
    "Luboš",
    "Filip",
    "Rado",
    "Tomas",
    "Ivan",
    "Milan",
    "Pali",
  ];
  const sampleTexts = [
    "Všetko beží v poriadku.",
    "Zasekáva sa podávač pri treťom cykle.",
    "Skontrolovať olejový filter, môže byť zanesený.",
    "Premazané, zatiaľ ide hladko.",
    "Zvláštne vibrácie pri štarte, odporúčam diagnostiku.",
    "Vymenená hadica, únik zastavený.",
    "Pravidelná údržba vykonaná.",
    "Čistota zachovaná, nič mimoriadne.",
    "Potrebné dotiahnuť skrutky na ramene.",
  ];

  const getRandomComments = (machineIndex: number) => {
    const numberOfComments = Math.floor(Math.random() * 4); // 0 až 3 komentáre
    return Array.from({ length: numberOfComments }, (_, i) => ({
      id: `c${machineIndex + 1}-${i + 1}`,
      name: names[(machineIndex + i) % names.length],
      text: sampleTexts[(machineIndex + i) % sampleTexts.length],
    }));
  };

  useEffect(() => {
    const shiftsData = ["morning", "afternoon", "night"].map(
      (shiftId, shiftIdx) => ({
        id: shiftId,
        name: ["R", "O", "N"][shiftIdx],
        machines: Array.from({ length: 12 }, (_, i) => ({
          id: `m${i + 1}`,
          name: `Stroj ${i + 1}`,
          note: "Bez problémov",
          comments: getRandomComments(i),
        })),
      })
    );
    setShifts(shiftsData);
  }, []);

  const selectedShift =
    shifts.find((s) => s.id === selectedShiftId) || null;

  return (
    <main className="h-[calc(100vh-80px)] flex flex-col bg-white text-font-prim p-2 ">
      <div className="flex-shrink-0">
        <div className="flex gap-2 mb-2">
          {shifts.map((shift) => (
            <button
              className={`px-4 py-2 font-normal rounded-md transition-colors ${
                selectedShiftId === shift.id
                  ? "text-k3-blue"
                  : "text-gray-700 hover:text-slate-500"
              }`}
              key={shift.id}
              onClick={() => setSelectedShiftId(shift.id)}
            >
              {shift.name}
            </button>
          ))}
        </div>
      </div>

      <section className="flex-1 min-h-0">
        {selectedShift && (
          <div key={selectedShift.id} className="h-full">
            <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 h-full">
              {selectedShift.machines.map((machine) => (
                <div
                  key={machine.id}
                  className="bg-gray-300 border border-gray-400 rounded-lg p-2 shadow-sm flex flex-col h-full"
                >
                  <h3 className="text-sm font-semibold text-gray-600 mb-2 flex-shrink-0">
                    {machine.name}
                  </h3>

                  <div className="flex-1 overflow-y-auto space-y-1">
                    {machine.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-50 p-3 rounded-md"
                      >
                        <p className="text-sm font-medium text-blue-700">
                          {comment.name}
                        </p>
                        <p className="text-sm text-gray-800 leading-relaxed">
                          {comment.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
