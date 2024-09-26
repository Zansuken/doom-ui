import { FC, useRef } from "react";
import CrossIcon from "../../../assets/icons/cross.svg";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";

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
    <div
      className={classNames(
        "fixed w-full h-full bg-black bg-opacity-50 flex items-center"
      )}
    >
      <dialog
        ref={dialogRef}
        open={open}
        className="relative w-full max-w-md mx-auto rounded-md p-4 z-50"
      >
        <div
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-black cursor-pointer"
          onClick={onClose}
        >
          <div className="relative w-full h-full flex justify-center items-center">
            <img
              src={CrossIcon}
              alt="Close"
              className="h-2 w-2 top-2 right-2 invert"
            />
          </div>
        </div>
        {children}
      </dialog>
    </div>
  );
};

export default Dialog;
