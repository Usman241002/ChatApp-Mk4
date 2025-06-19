import type { User } from "../../shared/types";

export let users: User[] = [];

export function addUser(user: User): void {
  users.push(user);
}

export function getUsers(): User[] {
  return users;
}

export function removeUser(id: string): string | undefined {
  const user = users.find((user) => user.id === id);
  users = users.filter((user) => user.id !== id);
  return user?.username;
}
