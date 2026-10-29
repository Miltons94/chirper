import { usePage } from "@inertiajs/react";

export default function ToastComponent() {
  const { flash } = usePage().props;

  return (
    <div>
      {flash.status && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-success animate-fade-out">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{flash.status}</span>
            </div>
          </div>
        )}
    </div>
  );
}