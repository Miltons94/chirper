import '@inertiajs/core';
import type { Auth } from './auth';
import Echo from 'laravel-echo';

declare module '@inertiajs/core' {
    interface InertiaConfig {
        sharedPageProps: {
            auth: Auth,
            flash: {
                status: string|null,
                message: string|null,
                error: string|null,
                success: string|null
            }
        }
    }
}

export { };