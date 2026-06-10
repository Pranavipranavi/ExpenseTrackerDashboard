import { useEffect, useState } from "react";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { initials } from "../../utils/formatters";
import Button from "../ui/Button";

const Topbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    setAvatarFailed(false);
  }, [user?.avatar]);

  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-slate-50/75 px-4 py-3 backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-ink/75 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Workspace</p>
          <h1 className="truncate text-lg font-black sm:text-xl">Financial command center</h1>
        </div>
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Button variant="secondary" className="h-10 w-10 shrink-0 p-0" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
            {isDark ? <FiSun /> : <FiMoon />}
          </Button>
          <div className="hidden min-w-0 max-w-[15rem] items-center gap-3 rounded-lg border border-slate-200/80 bg-white/90 px-3 py-2 shadow-sm dark:border-white/10 dark:bg-slate-900/80 sm:flex">
            {user?.avatar && !avatarFailed ? (
              <img src={user.avatar} alt={user.name || "User avatar"} onError={() => setAvatarFailed(true)} className="h-10 w-10 shrink-0 rounded-full border border-slate-200 object-cover dark:border-white/10" />
            ) : (
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-softPink to-primary text-sm font-black text-ink">
                {initials(user?.name)}
              </div>
            )}
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-black text-slate-950 dark:text-white">{user?.name || "User"}</p>
              <p className="truncate text-xs font-semibold text-slate-500 dark:text-slate-400">{user?.email}</p>
            </div>
          </div>
          <Button variant="secondary" className="h-10 shrink-0 px-3 sm:px-4" onClick={logout} aria-label="Logout" title="Logout">
            <FiLogOut />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
