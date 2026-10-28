/// <reference types="vite/client" />
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Chirper';

createInertiaApp({
    title: (title) => (title? `${title} - ${appName}`: appName),
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx', {
            eager: true,
        });

        const page = pages[`./pages/${name}.tsx`];
    
        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        return page as {
            default: React.ComponentType;
        };
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});