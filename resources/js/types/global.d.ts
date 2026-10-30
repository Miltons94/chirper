import '@inertiajs/core';
import type { Auth } from './auth';
import Echo from 'laravel-echo';

declare module '@inertiajs/core' {
    interface InertiaConfig {
        sharedPageProps: {
            auth: Auth
        },
        flashDataType: {
            status: string | null
        }
    }
}

export { };
