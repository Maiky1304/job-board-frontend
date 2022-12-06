import service from "./axios";
import { insertAuthorizationToken } from "./utils/header";

export function register(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const body = { email, password, firstName, lastName };

  return service.post("/v1/auth/register", body);
}

export function login(email: string, password: string) {
  const body = { email, password };

  return service.post("/v1/auth/login", body);
}

export function logout(token: string) {
  return service.post("/v1/auth/logout", undefined, {
    headers: insertAuthorizationToken(token),
  });
}
