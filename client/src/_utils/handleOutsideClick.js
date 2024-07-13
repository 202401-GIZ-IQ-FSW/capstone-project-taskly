export const handleOutsideClick = (ref, setState) => {
  return (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setState(false);
    }
  };
};
