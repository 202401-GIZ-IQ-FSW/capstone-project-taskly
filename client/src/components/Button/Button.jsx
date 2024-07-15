/* eslint-disable react/prop-types */
const Button = ({
  type = 'submit',
  className = '',
  processing,
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-md bg-light-blue  px-3 py-2 text-lg font-bold text-white shadow-sm hover:bg-custom-blue ${
        processing && 'opacity-75'
      } ${disabled ? 'cursor-not-allowed' : ''} ${className}`}
      disabled={disabled} // Disable the button if disabled prop is true
    >
      {children}
    </button>
  );
};

export default Button;
