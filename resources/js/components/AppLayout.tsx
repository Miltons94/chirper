import { Link, usePage } from "@inertiajs/react";
import { ReactNode } from "react";
import NavLayout from "./NavLayout";
import ToastComponent from "./Toast";

interface AppLayoutProps{
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps)
{
  return (
    <div className="max-w-full p-0 m-0">
      <NavLayout/>
      <ToastComponent/>
      <main>
        {children}
      </main>
    </div>
  );
}