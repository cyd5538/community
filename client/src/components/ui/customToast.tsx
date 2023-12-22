// CustomToast.js
import { toast, ToastOptions } from 'react-toastify';

const customToast = (type: string, message: string) => {
  const toastOptions: ToastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'info':
      toast.info(message, toastOptions);
      break;
    case 'warning':
      toast.warning(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};

export default customToast;
