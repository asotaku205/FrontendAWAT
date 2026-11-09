import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

type ModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  contentClassName?: string;
};

const Modal = ({
  title,
  open,
  onClose,
  children,
  className = "",
  description,
  contentClassName = "p-5",
}: ModalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`w-full max-w-lg rounded-xl bg-white shadow-xl ${className}`}
      >
        <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            {description && (
              <div className="mt-1 text-xs font-normal text-gray-500">
                {description}
              </div>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Đóng"
            onClick={onClose}
          >
            <X aria-hidden="true" size={18} />
          </Button>
        </header>
        <div className={contentClassName}>{children}</div>
      </section>
    </div>
  );
};

export default Modal;
