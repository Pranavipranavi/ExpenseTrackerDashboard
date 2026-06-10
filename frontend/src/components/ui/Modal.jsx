import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId } from "react";
import ModalCloseButton from "./ModalCloseButton";

const Modal = ({ open, onClose, title, children }) => {
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/55 px-4 py-6 backdrop-blur-md sm:items-center sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) onClose?.();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_28px_80px_rgba(15,23,42,0.24)] backdrop-blur-xl dark:border-white/10 dark:bg-cardDark/95 dark:shadow-[0_28px_90px_rgba(0,0,0,0.46)] sm:p-6"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 id={titleId} className="truncate text-xl font-black tracking-normal text-slate-950 dark:text-white">
                  {title}
                </h2>
              </div>
              <ModalCloseButton onClick={onClose} autoFocus />
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
