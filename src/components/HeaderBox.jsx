// components/HeaderBox.jsx
const HeaderBox = ({ type = "title", title, user,subtext }) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === 'greeting' && (
          <span className="text-bankGradient">&nbsp;{user}</span>
        )}
      </h1>
      <p className="text-gray-500 mt-1">{subtext}</p>
    </div>
  );
};

export default HeaderBox;


