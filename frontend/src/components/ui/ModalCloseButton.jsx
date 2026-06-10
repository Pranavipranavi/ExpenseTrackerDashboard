import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import clsx from "clsx";

const ModalCloseButton = ({ className, label = "Close", ...props }) => (
  <motion.button
    type="button"
    aria-label={label}
    title={label}
    className={clsx(
      "focus-ring group relative inline-grid h-11 min-h-11 w-11 min-w-11 place-items-center rounded-full",
      "border border-slate-200/90 bg-white/95 text-slate-700 shadow-[0_14px_34px_rgba(15,23,42,0.12)]",
      "transition-colors duration-200 hover:border-slate-300 hover:bg-slate-950 hover:text-white",
      "dark:border-white/10 dark:bg-slate-900/95 dark:text-slate-200 dark:shadow-[0_18px_42px_rgba(0,0,0,0.35)]",
      "dark:hover:border-sky-400/60 dark:hover:bg-sky-400 dark:hover:text-slate-950",
      className
    )}
    whileHover={{ y: -1, scale: 1.04 }}
    whileTap={{ scale: 0.94 }}
    {...props}
  >
    <FiX className="h-5 w-5 stroke-[2.6]" aria-hidden="true" />
    <span
      role="tooltip"
      className="pointer-events-none absolute right-0 top-[calc(100%+0.55rem)] z-20 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-black text-slate-700 opacity-0 shadow-premium transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 dark:border-white/10 dark:bg-slate-950 dark:text-white"
    >
      {label}
    </span>
  </motion.button>
);

export default ModalCloseButton;
