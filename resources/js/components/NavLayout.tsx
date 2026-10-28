import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function NavLayout() {

  const { auth } = usePage().props;

  return (
    <nav className="navbar bg-gray-50 border-b border-b-gray-200 sticky top-0 z-10 opacity-95">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl">🐦 Chirper</a>
      </div>
      <div className="navbar-end gap-2">
        {auth.user ? (
          <div className="gap-2 flex flex-row items-center">
            <span className="text-sm">{auth.user.name}</span>
            <form method="POST" action='/logout' className="inline">
              <button type="submit" className="btn btn-ghost btn-sm">Logout</button>
            </form>
          </div>
        ) : (
          <div className="gap-2 flex flex-row items-center">
            <Link href='/login' className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link href='/register' className="btn btn-primary btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}