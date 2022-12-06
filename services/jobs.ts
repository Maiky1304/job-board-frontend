import service from "./axios";
import { Job } from "./types";
import { insertAuthorizationToken } from "./utils/header";

export function createJob(token: string, job: Job) {
  return service.post("/v1/jobs", job, {
    headers: insertAuthorizationToken(token),
  });
}

export function getJobs(token: string) {
  return service.get("/v1/jobs", {
    headers: insertAuthorizationToken(token),
  });
}

export function getJob(token: string, id: string) {
  return service.get(`/v1/jobs/${id}`, {
    headers: insertAuthorizationToken(token),
  });
}

export function updateJob(token: string, id: string, job: Partial<Job>) {
  return service.put(`/v1/jobs/${id}`, job, {
    headers: insertAuthorizationToken(token),
  });
}

export function deleteJob(token: string, id: string) {
  return service.delete(`/v1/jobs/${id}`, {
    headers: insertAuthorizationToken(token),
  });
}
