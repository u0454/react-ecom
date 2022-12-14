import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks/hooks";
import Backdrop from "../../features/backdrop/Backdrop";
import CartModal from "../../features/cartModal/CartModal";
import styles from "./Modal.module.scss";
import SearchModal from "../../features/searchModal/SearchModal";
import DesignerModal from "../../features/designerModal/DesignerModal";
import NavModal from "../../features/navModal/NavModal";
import InfoModal from "../../features/infoModal/InfoModal";

const Modal = () => {
  const { backdropIsOpen } = useAppSelector((state) => state.backdrop);

  useEffect(() => {
    // lock the page when use searchModal and cartModal.
    document.body.style.overflow = backdropIsOpen ? "hidden" : "auto";
    // const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    // document.body.style.paddingRight = `17px`;
  }, [backdropIsOpen]);

  return (
    <aside className={`${styles.modalContainer} ${styles.active}`}>
      <Backdrop />
      <SearchModal />
      <CartModal />
      <DesignerModal />
      <InfoModal />
    </aside>
  );
};

export default Modal;
