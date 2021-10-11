import { ToastContainer } from 'react-toastify';
import './style.scss';

const CustomToastContainer = () => {
  return (
    <ToastContainer
      autoClose={3000}
      hideProgressBar
      position="top-right"
      draggable
      bodyClassName="toastBody"
    />
  );
};

export default CustomToastContainer;
