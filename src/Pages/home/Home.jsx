// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './Home.css';

// // const Home = () => {
// //     const navigate = useNavigate();

// //     // Mock demo data
// //     const user = {
// //         firstName: 'John',
// //         lastName: 'Doe',
// //         email: 'john.doe@example.com',
// //         accountType: 'Savings',
// //         balance: 5234.75
// //     };

// //     const handleLogout = () => {
// //         navigate('/signin');
// //     };

// //     return (
// //         <section className="home-container">
// //             <header className="home-header">
// //                 <h1>Welcome, {user.firstName}</h1>
// //                 <button onClick={handleLogout} className="logout-button">
// //                     Logout
// //                 </button>
// //             </header>

// //             <main className="home-main">
// //                 <section className="account-summary">
// //                     <h2>Account Summary</h2>
// //                     <div className="account-details">
// //                         <div className="detail-item">
// //                             <span>Name:</span>
// //                             <span>{user.firstName} {user.lastName}</span>
// //                         </div>
// //                         <div className="detail-item">
// //                             <span>Email:</span>
// //                             <span>{user.email}</span>
// //                         </div>
// //                         <div className="detail-item">
// //                             <span>Account Type:</span>
// //                             <span>{user.accountType}</span>
// //                         </div>
// //                         <div className="detail-item">
// //                             <span>Balance:</span>
// //                             <span>${user.balance.toFixed(2)}</span>
// //                         </div>
// //                     </div>
// //                 </section>

// //                 <section className="quick-actions">
// //                     <h2>Quick Actions</h2>
// //                     <div className="action-buttons">
// //                         <button className="action-button">Transfer Money</button>
// //                         <button className="action-button">Deposit</button>
// //                         <button className="action-button">Withdraw</button>
// //                         <button className="action-button">View Transactions</button>
// //                     </div>
// //                 </section>

// //                 <section className="recent-transactions">
// //                     <h2>Recent Transactions</h2>
// //                     <div className="transactions-list">
// //                         <p className="no-transactions">No recent transactions</p>
// //                     </div>
// //                 </section>
// //             </main>
// //         </section>
// //     );
// // };

// // export default Home;
// // app/Home.jsx
// import HeaderBox from "../../components/HeaderBox";
// import TotalBalanceBox from "../../components/TotalBalanceBox";
// // import RecentTransactions from "../../components/RecentTransactions";
// import RightSideBar from "../../components/RightSideBar";

// const Home = () => {
//   const loggedIn = { firstName: "John", lastName: "Doe", email: "johndoe@gmail.com" };

//   return (
//     <section className="flex flex-col lg:flex-row gap-6 p-6 w-full">
//       {/* Left Content */}
//       <div className="flex-1 flex flex-col gap-6">
//         {/* Header */}
//         <div>
//           <HeaderBox
//             type="greeting"
//             title="Welcome"
//             user={loggedIn?.firstName || "Guest"}
//             subtext="Access and manage your account and transactions efficiently."
//           />
//         </div>

//         {/* Balance Box */}
//         <TotalBalanceBox
//           accounts={[]}
//           totalBanks={1}
//           totalCurrentBalance={1250.35}
//         />

//         {/* Transactions */}
//         {/*     <RecentTransactions /> */}
//         Transcations
//       </div>

//       {/* Right Sidebar */}
//       <div className="w-full lg:w-[350px]">
//         <RightSideBar user={loggedIn} transactions={[]} banks={[]} />
//       </div>
//     </section>
//   );
// };

// export default Home;

import HeaderBox from "../../components/HeaderBox";
import TotalBalanceBox from "../../components/TotalBalanceBox";
import '../../app.css'; 
const Home=()=>{

  const loggedIn = {firstName: 'John', lastName: 'Doe', email:'johndoe@gmail.com'};
    return (
        <section className="home">
             <div className="home-content">
                <header className="home-header">
                    <HeaderBox 
                            type="greeting"
                            title="Welcome"
                            user={loggedIn?.firstName || 'Guest'}
                            subtext="Access and manage your account and transactions efficiently."
                    />

                    <TotalBalanceBox 
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250.35}

                    />
                </header>
                Reacent Transcations
            </div>
            
                {/* <RightSideBar 
                    user={loggedIn}
                    transactions={[]}
                    banks={[]}
                /> */}
        </section>
  )
};

export default Home;


  //   <div className="home-page">
  // <div className="home-header">
  //   <HeaderBox 
  //     type="greeting" 
  //     title="Welcome," 
  //     user="Darshan" 
  //   />
  //   <p className="text-24">Access & Manage your account and transcations efficently</p>
  // </div>
  // <div>
    
  // </div>
// </div>