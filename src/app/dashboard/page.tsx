"use client";

export default function DashboardPage() {
  const machines = Array.from({length: 9}, (_, i) => `Stroj ${i + 1}`);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            K3Log - Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Dnes: {new Date().toLocaleDateString('sk-SK')}
            </span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Pridať zápis
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Info panel */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">1. SMENA</h3>
            <p className="text-2xl font-bold text-green-600">6:00 - 14:00</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">2. SMENA</h3>
            <p className="text-2xl font-bold text-blue-600">14:00 - 22:00</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">3. SMENA</h3>
            <p className="text-2xl font-bold text-purple-600">22:00 - 6:00</p>
          </div>
        </div>

        {/* Grid strojov */}
        <div className="grid grid-cols-3 gap-6">
          {machines.map((machine, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {machine}
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Aktívny
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Posledný zápis: <span className="font-medium">Pred 2h</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mechanik: <span className="font-medium">Ján Novák</span>
                  </p>
                </div>
                
                <button className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Zobraziť záznamy
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}