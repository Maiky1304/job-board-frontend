import service from "./axios";
import { insertAuthorizationToken } from "./utils/header";

export function identify(token: string) {
  return service.get("/v1/users/identify", {
    headers: insertAuthorizationToken(token),
  });
}
