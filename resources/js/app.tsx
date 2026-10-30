/// <reference types="vite/client" />
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { configureEcho } from '@laravel/echo-react';

configureEcho({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    wsHost: import.meta.env.VITE_PUSHER_HOST,
    wsPort: import.meta.env.VITE_PUSHER_PORT,
    wssPort: import.meta.env.VITE_PUSHER_PORT,
    enabledTransports: ["ws", "wss"],
});

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