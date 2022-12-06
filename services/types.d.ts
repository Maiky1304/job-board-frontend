export type Job = {
    title: string;
    content: string;
};

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    role: "USER" | "ADMIN";
};
