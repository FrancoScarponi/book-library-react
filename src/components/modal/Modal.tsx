import { memo } from "react";
import styles from "./modal.module.css";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export const Modal:React.FC<Props> = memo(({ isOpen, onClose, children }) => {
  if(!isOpen)return null; 
  return (
    <div onClick={onClose} className={styles.backDrop}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
});
