import { useEffect, useState } from "react";
import HeaderBox from "../../components/HeaderBox";
import TotalBalanceBox from "../../components/TotalBalanceBox";
import BankAccountModal from "../../components/BankAccountModal";
import '../../app.css'; 

const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserAndAccounts = async () => {
      try {
        const userRes = await fetch(`/api/users/${userId}`);
        const userData = await userRes.json();
        setUser(userData.user);

        const accountsRes = await fetch(`/api/users/${userId}/accounts`);
        const accountData = await accountsRes.json();
        setAccounts(accountData.accounts);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserAndAccounts();
  }, [userId]);

  const handleAddAccount = async (formData) => {
    try {
      const res = await fetch(`/api/users/${userId}/accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const { account } = await res.json();
        setAccounts(prev => [...prev, account]);
        setShowModal(false);
      } else {
        const error = await res.json();
        alert(error.message || "Failed to add account.");
      }
    } catch (err) {
      console.error("Add account failed:", err);
    }
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={user?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <button 
            onClick={() => setShowModal(true)}
            className="add-account-button"
          >
            ➕ Add Bank Account
          </button>
        </header>

        <TotalBalanceBox 
          accounts={accounts}
          totalBanks={accounts.length}
          totalCurrentBalance={totalBalance}
        />

        <h2 style={{ marginTop: "30px" }}>Recent Transactions</h2>
        <p>No recent transactions yet.</p>
      </div>

      {showModal && (
        <BankAccountModal 
          onClose={() => setShowModal(false)}
          onSubmit={handleAddAccount}
        />
      )}
    </section>
  );
};

export default Home;
