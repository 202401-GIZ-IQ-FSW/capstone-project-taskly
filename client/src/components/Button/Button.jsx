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
      className={`rounded-md bg-custom-blue/80 hover:bg-light-blue  px-3 py-2 text-lg font-semibold text-white shadow-sm  ${
        processing && 'opacity-75'
      } ${disabled ? 'cursor-not-allowed' : ''} ${className}`}
      disabled={disabled} // Disable the button if disabled prop is true
    >
      {children}
    </button>
  );
};

export default Button;
