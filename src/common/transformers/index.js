export function UserTransformer(user) {
  delete user["_doc"]["password"];

  return user;
}
