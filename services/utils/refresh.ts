import { AxiosResponse } from "axios";

export function handleRefreshTokenIfPresent(
    response: AxiosResponse
): string | null {
    const headers = response.headers;

    if (!headers || !headers["authorization"]) {
        return null;
    }

    return headers["authorization"];
}
