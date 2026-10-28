import '@inertiajs/core';
import type { Auth } from './auth';

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