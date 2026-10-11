export function findUser(users, findValue) {
  const value = String(findValue).toLowerCase();

  return users.find((user) => {
    const nameFind =
      user.full_name && user.full_name.toLowerCase().includes(value);
    const noteFind = user.note && user.note.toLowerCase().includes(value);
    const ageFind =
      user.age !== null && user.age !== undefined && String(user.age) === value;

    return nameFind || noteFind || ageFind;
  });
}
