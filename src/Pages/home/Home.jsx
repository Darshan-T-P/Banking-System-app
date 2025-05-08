  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import HeaderBox from "../../components/HeaderBox";
  import TotalBalanceBox from "../../components/TotalBalanceBox";
  import BankAccountModal from "../../components/BankAccountModal";
  import '../../app.css';

  const Home = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Retrieve user data from localStorage (Ensure it's done once)
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData?.id;

    // If there's no userId, redirect to sign-in page
    useEffect(() => {
      if (!userId) {
        console.warn('No userId in localStorage. Redirecting to signin.');
        navigate("/signin");
        return;
      }

      const fetchUserAndAccounts = async () => {
        try {
          // Fetch user data
          const userRes = await fetch(`http://localhost:5000/api/users/${userId}`);
          if (!userRes.ok) throw new Error('Failed to fetch user data');
          const userData = await userRes.json();
          setUser(userData.user);

          // Fetch bank accounts data
          const accountsRes = await fetch(`http://localhost:5000/api/users/${userId}/accounts`);
          // Handle 404 or empty accounts case
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
    }, [userId, navigate]); // Depend only on userId and navigate

    const handleAddAccount = async (formData) => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}/accounts`, {
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

    if (loading) return <div>Loading...</div>;

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
            <div key={acc._id} style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              minWidth: "250px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>
              <h3>{acc.bankName}</h3>
              <p><strong>Type:</strong> {acc.accountType}</p>
              <p><strong>Balance:</strong> ₹{acc.balance.toLocaleString()}</p>
              <p><strong>Status:</strong> {acc.isActive ? "Active" : "Inactive"}</p>
              <p style={{ fontSize: "0.8rem", color: "#777" }}>Created: {new Date(acc.createdAt).toLocaleDateString()}</p>
            </div>
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
