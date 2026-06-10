import { FiHelpCircle } from "react-icons/fi";

const InfoTip = ({ label }) => (
  <span
    className="inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-sky-600 dark:hover:bg-slate-800 dark:hover:text-primary"
    title={label}
    aria-label={label}
    role="img"
  >
    <FiHelpCircle className="h-3.5 w-3.5" />
  </span>
);

export default InfoTip;
