// components/AnimatedCounter.jsx
import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }) => {
  return (
    <div className="w-full">
      <CountUp
        decimal="," 
        decimals={2}
        prefix="$"
        end={amount}
      />
    </div>
  );
};

export default AnimatedCounter;
