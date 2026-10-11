import { getFormattedUsers } from "./transformUsers.js";
import { validateUser } from "./validateUser.js";
import { sortUsers } from "./filterUsers.js";
import { findUser } from "./findUser.js";
import { getPercentage } from "./getPercentage.js";

console.log("\n===== 1. getFormattedUsers() =====");
const formattedUsers = getFormattedUsers();
console.log(formattedUsers);

console.log("\n===== 2. validateUser() =====");
const validUsers = formattedUsers.filter((user) => validateUser(user).isValid);
console.log(validUsers);

console.log("\n===== 3. sortUsers(users, 'age', 'desc') =====");
const sortedUsers = sortUsers(validUsers, "age", "desc");
console.log(sortedUsers);

console.log("\n===== 4. findUser(users, 'norbert') =====");
const foundUser = findUser(validUsers, "norbert");
console.log(foundUser);

console.log("\n===== 5. getPercentage(users, user.age > 30) =====");
const percent = getPercentage(validUsers, (user) => user.age > 30);
console.log(`Відсоток юзерів старше 30 років: ${percent}%`);
