import { FC, useRef } from "react";
import CrossIcon from "../../../assets/icons/cross.svg";
import useClickOutside from "../../hooks/useClickOutside";
import classes from "./Dialog.module.css";

type Props = {
  /**
   * Determines whether the dialog should close when the overlay is clicked.
   */
  closeOnOverlayClick?: boolean;
  /**
   * Determines whether the dialog is open or closed.
   */
  open: boolean;
  /**
   * The callback function to be called when the dialog is closed.
   */
  onClose: () => void;
  children: React.ReactNode;
};

/**
 * A reusable dialog component.
 * @example
 * <Dialog
 *  open={isDialogOpen}
 *  onClose={() => setIsDialogOpen(false)}
 * >
 *  <div className="p-4">
 *    <h2 className="text-xl font-semibold">Dialog Title</h2>
 *    <p className="text-sm">Dialog content goes here.</p>
 *  </div>
 * </Dialog>
 */
const Dialog: FC<Props> = ({
  closeOnOverlayClick,
  open,
  onClose,
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useClickOutside(dialogRef, () => closeOnOverlayClick && open && onClose());

  if (!open) return null;

  return (
    <div className={classes["root"]}>
      <dialog ref={dialogRef} open={open} className={classes["dialog"]}>
        <div className={classes["button-close-container"]} onClick={onClose}>
          <div className={classes["close-icon-container"]}>
            <img
              src={CrossIcon}
              alt="Close"
              className={classes["close-icon"]}
            />
          </div>
        </div>
        {children}
      </dialog>
    </div>
  );
};

export default Dialog;
