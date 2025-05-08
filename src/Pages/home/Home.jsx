// Inside Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBox from "../../components/HeaderBox";
import TotalBalanceBox from "../../components/TotalBalanceBox";
import BankAccountModal from "../../components/BankAccountModal";
import Card from "../../components/card"; // Importing Card Component
import '../../app.css';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Retrieve user data from localStorage (Ensure it's done once)
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData?.id;

  useEffect(() => {
    if (!userId) {
      console.warn('No userId in localStorage. Redirecting to signin.');
      navigate("/signin");
      return;
    }

    const fetchUserAndAccounts = async () => {
      try {
        const userRes = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (!userRes.ok) throw new Error('Failed to fetch user data');
        const userData = await userRes.json();
        setUser(userData.user);

        const accountsRes = await fetch(`http://localhost:5000/api/users/${userId}/accounts`);
        if (!accountsRes.ok) {
          if (accountsRes.status === 404) {
            console.warn('No accounts found for this user.');
            setAccounts([]); // No accounts for the user
          } else {
            throw new Error('Failed to fetch accounts');
          }
        } else {
          const accountData = await accountsRes.json();
          setAccounts(accountData.accounts || accountData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        alert('There was an issue fetching your data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndAccounts();
  }, [userId, navigate]);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <HeaderBox
                type="greeting"
                title="Welcome"
                user={user?.firstName || 'Guest'}
                subtext="Access and manage your account and transactions efficiently."
              />
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="add-account-button"
              style={{ alignSelf: "flex-start" }}
            >
              ➕ Add Bank Account
            </button>
          </div>
        </header>

        {/* Total Balance Box */}
        <TotalBalanceBox
          accounts={accounts}
          totalBanks={accounts.length}
          totalCurrentBalance={totalBalance}
        />

        {/* Check if there are no bank accounts */}
        {accounts.length === 0 ? (
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <h3>No Banks Added</h3>
            <p>Please add a bank account to manage your balance and transactions.</p>
            <button
              onClick={() => setShowModal(true)}
              className="add-account-button"
            >
              ➕ Add Your Bank
            </button>
          </div>
        ) : (
          <>
            {/* List Bank Accounts */}
            <div style={{ marginTop: "30px" }}>
              <h2>Your Bank Accounts</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "10px" }}>
                {accounts.map((acc) => (
                  <Card
                    key={acc._id}
                    bankName={acc.bankName}
                    accountType={acc.accountType}
                    balance={acc.balance}
                    isActive={acc.isActive}
                    createdAt={acc.createdAt}
                  />
                ))}
              </div>
            </div>

            {/* Placeholder for transactions */}
            <div style={{ marginTop: "30px" }}>
              <h2>Recent Transactions</h2>
              <p>No recent transactions yet.</p>
            </div>
          </>
        )}
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
