export function sortUsers(users, sortBy, orderBy = "asc") {
  const sortedArr = [...users];

  sortedArr.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (valA === undefined || valA === null) {
      valA = "";
    }
    if (valB === undefined || valB === null) {
      valB = "";
    }

    let comparison = 0;

    if (sortBy === "age") {
      comparison = Number(valA) - Number(valB);
    } else if (sortBy === "b_date") {
      comparison = new Date(valA).getTime() - new Date(valB).getTime();
    } else {
      comparison = String(valA).localeCompare(String(valB));
    }

    return orderBy === "desc" ? comparison * -1 : comparison;
  });

  return sortedArr;
}
