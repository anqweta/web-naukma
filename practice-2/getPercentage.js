export function getPercentage(users, conditionCallback) {
  if (!users || users.length === 0) {
    return 0;
  }
  const matchedUsersCount = users.filter(conditionCallback).length;
  const percentage = (matchedUsersCount / users.length) * 100;
  return Math.round(percentage);
}
