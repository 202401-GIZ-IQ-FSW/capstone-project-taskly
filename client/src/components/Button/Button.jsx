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
      className={`rounded-md bg-accent-dark  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark ${
        processing && 'opacity-75'
      } ${disabled ? 'cursor-not-allowed' : ''} ${className}`}
      disabled={disabled} // Disable the button if disabled prop is true
    >
      {children}
    </button>
  );
};

export default Button;
