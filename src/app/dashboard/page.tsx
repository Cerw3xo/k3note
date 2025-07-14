export default function DashboardPage() {
  const shifts = [
    {
      id: "morning",
      name: "Ranní smena",
      machines: Array.from({ length: 9 }, (_, i) => ({
        id: `m${i + 1}`,
        name: `Stroj ${i + 1}`,
        note: "Bez problémov",
        comments: [
          {
            id: "c1",
            name: "Marek",
            text: "Stáčanie",
          },
        ],
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-white-200 text-font-prim p-8 w-screen">
      <h1 className="text-2xl font-bold mb-5 p-2">
        Denný prehľad smien
      </h1>
      <p className="text-zinc-400">
        Tu bude výpis troch smien a poznámok mechanikov.
      </p>
      <section>
        {shifts[0].machines.map((machine) => (
          <div key={machine.id}>
            <h2>{machine.name}</h2>
            <p>{machine.note}</p>
            {machine.comments.map((comment) => (
              <div key={comment.id}>
                <p className="text-xl text-font-prim">
                  <strong>{comment.name}:</strong> {comment.text}
                </p>
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
