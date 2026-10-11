import { randomUserMock, additionalUsers } from "./FE4U-Lab2-mock.js";

const COURSES = [
  "Mathematics",
  "Physics",
  "English",
  "Computer Science",
  "Dancing",
  "Chess",
  "Biology",
  "Chemistry",
  "Law",
  "Art",
  "Medicine",
  "Statistics",
];

const getRandomCourse = () =>
  COURSES[Math.floor(Math.random() * COURSES.length)];

function formatUser(user) {
  if (user.login) {
    return {
      gender: user.gender,
      title: user.name.title,
      full_name: `${user.name.first} ${user.name.last}`,
      city: user.location.city,
      state: user.location.state,
      country: user.location.country,
      postcode: user.location.postcode,
      coordinates: user.location.coordinates,
      timezone: user.location.timezone,
      email: user.email,
      b_date: user.dob.date,
      age: user.dob.age,
      phone: user.phone,
      picture_large: user.picture.large,
      picture_thumbnail: user.picture.thumbnail,
      id: crypto.randomUUID(),
      favorite: false,
      course: getRandomCourse(),
      bg_color: "#ffffff",
      note: "",
    };
  }

  return {
    gender: user.gender,
    title: user.title,
    full_name: user.full_name,
    city: user.city || "Unknown",
    state: user.state || "Unknown",
    country: user.country || "Unknown",
    postcode: user.postcode || null,
    coordinates: user.coordinates || { latitude: null, longitude: null },
    timezone: user.timezone || { offset: null, description: null },
    email: user.email,
    b_date: user.b_date || null,
    age: user.age || null,
    phone: user.phone || null,
    picture_large: user.picture_large || null,
    picture_thumbnail: user.picture_thumbnail || null,
    id: user.id || crypto.randomUUID(),
    favorite: !!user.favorite,
    course: user.course || getRandomCourse(),
    bg_color: user.bg_color || "#ffffff",
    note: user.note || "",
  };
}

export function getFormattedUsers() {
  const allUsers = [...randomUserMock, ...additionalUsers];
  const uniqueUsersMap = new Map();

  allUsers.forEach((user) => {
    const formatted = formatUser(user);
    if (!uniqueUsersMap.has(formatted.email)) {
      uniqueUsersMap.set(formatted.email, formatted);
    }
  });

  return Array.from(uniqueUsersMap.values());
}
