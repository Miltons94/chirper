import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ToastComponent() {
  const { flash } = usePage();
  const [toastKey, setToastKey] = useState(0);

  useEffect(() => {
    return router.on("flash", (event) => {
      if (event.detail.flash.status) {
        setToastKey((currentKey) => currentKey + 1);
      }
    });
  }, []);

  return (
    <div>
      {flash.status && (
          <div className="toast toast-top toast-center z-50">
            <div key={toastKey} className="alert alert-success animate-fade-out">
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
