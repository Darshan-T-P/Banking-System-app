// components/AnimatedCounter.jsx
import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }) => {
  return (
    <div className="w-full" style={{ fontWeight: 600, fontSize: '1.5rem' }}>
      <CountUp
        end={amount}
        prefix="₹"
        decimals={2}
        separator=","
      />
    </div>
  );
};

export default AnimatedCounter;
