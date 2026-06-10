import { motion } from "framer-motion";
import { FiBarChart2, FiInbox } from "react-icons/fi";

const EmptyState = ({ title = "Nothing here yet", description = "Create your first item to fill this space.", action }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid min-h-64 place-items-center rounded-xl border border-dashed border-slate-300/80 bg-white/75 p-6 text-center shadow-inner dark:border-slate-700 dark:bg-slate-900/60"
  >
    <div className="max-w-md">
      <div className="relative mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-sky-100 to-violet-100 text-primary shadow-sm dark:from-sky-500/10 dark:to-violet-500/10">
        <FiBarChart2 className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-white p-1 text-highlight shadow-sm dark:bg-slate-900" />
        <FiInbox />
      </div>
      <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">{description}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  </motion.div>
);

export default EmptyState;
