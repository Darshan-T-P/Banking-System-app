const RecentTransactions = () => {
    const transactions = [
      { id: 1, title: "Grocery", amount: -45.32, date: "2025-04-29" },
      { id: 2, title: "Salary", amount: 1500, date: "2025-04-28" },
      { id: 3, title: "Electric Bill", amount: -120.5, date: "2025-04-25" },
    ];
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Transactions</h2>
        <ul className="space-y-3">
          {transactions.map(txn => (
            <li key={txn.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium text-gray-800">{txn.title}</p>
                <p className="text-sm text-gray-400">{txn.date}</p>
              </div>
              <span className={`font-semibold ${txn.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
                {txn.amount < 0 ? '-' : '+'}${Math.abs(txn.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RecentTransactions;
  