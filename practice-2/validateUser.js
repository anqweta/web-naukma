export function validateUser(user) {
  const errors = [];

  const validateValue = [
    "full_name",
    "gender",
    "note",
    "state",
    "city",
    "country",
  ];

  for (const key of validateValue) {
    const value = user[key];
    if (
      key &&
      (typeof value !== "string" ||
        (value.length > 0 && value[0] !== value[0].toUpperCase()))
    ) {
      errors.push(
        `Поле '${key}' має бути строкою та починатися з великої літери.`,
      );
    }
  }

  if (typeof user.age !== "number" || isNaN(user.age)) {
    errors.push("Поле 'age' має бути числом.");
  }

  if (
    !user.email ||
    typeof user.email !== "string" ||
    !user.email.includes("@")
  ) {
    errors.push(
      "Поле 'email' має бути валідною електронною адресою та містити '@'.",
    );
  }

  const phoneValidate = /^[\d\s\-\(\)\+]+$/;
  if (
    !user.phone ||
    typeof user.phone !== "string" ||
    !phoneValidate.test(user.phone)
  ) {
    errors.push("Неправильний формат поля 'phone'.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
