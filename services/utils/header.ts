import service from "../axios";

export function insertAuthorizationToken(token: string): any {
    return { ...service.defaults.headers, Authorization: `Bearer ${token}` };
}
