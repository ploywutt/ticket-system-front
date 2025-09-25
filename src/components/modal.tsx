import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <button className="absolute inset-0" onClick={onClose} />

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full z-10">
        {children}
      </div>
    </div>
  );
};
