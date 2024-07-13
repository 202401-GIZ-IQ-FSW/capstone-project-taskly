import { toast } from 'react-toastify';

const SuccessAlert = (msg) => {
  return toast.success(msg, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export default SuccessAlert;
