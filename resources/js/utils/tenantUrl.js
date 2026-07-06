export function tenantUrl(path, tenantPrefix) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    if (!tenantPrefix) {
        return normalizedPath;
    }

    return `/${tenantPrefix}${normalizedPath}`;
}
