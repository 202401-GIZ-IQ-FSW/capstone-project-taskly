import { toast } from 'react-toastify';

const WarnAlert = (msg) => {
  return toast.warning(msg, {
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

export default WarnAlert;
