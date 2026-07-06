import { usePage } from '@inertiajs/react';
import { tenantUrl } from './tenantUrl';

export function useTenantUrl() {
    const tenantPrefix = usePage().props.tenantPrefix ?? '';

    return (path) => tenantUrl(path, tenantPrefix);
}
