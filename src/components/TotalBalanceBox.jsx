import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

const TotalBalanceBox = ({
  accounts = [], totalBanks, totalCurrentBalance
}) => {
  // Inline style objects
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem',
    padding: '1.5rem',
    border: '1px solid #E5E7EB',
    borderRadius: '1rem',
    boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
    backgroundColor: '#fff',
    width: '300vh',          // You can set this to '100%', '90vw', or a fixed size
    maxWidth: '900px',      // Increase this for wider layout
    margin: '0 auto',       // Center the box horizontally
  };
  

  const chartStyle = {
    minWidth: '220px',
    maxWidth: '260px',
    width: '100%',
    height: '100px', // 🔼 Increased height here
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 auto',
  };
  
  const infoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flex: 1,
    justifyContent: 'center', // Ensures the content is aligned in the center vertically
    textAlign: 'left',        // Align the text to the left
  };
  

  const headingStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#101828',
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',

    color: '#667085',
  };

  const amountStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#101828',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  return (
    <section style={containerStyle}>
      {/* Left: Chart */}
      <div style={chartStyle}>
        <DoughnutChart accounts={accounts} />
      </div>

      {/* Right: Text Info */}
      <div style={infoStyle}>
        <h2 style={headingStyle}>
          Bank Accounts: {totalBanks}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={labelStyle}>Total Current Balance</p>
          <div style={amountStyle}>
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
