export const validarFecha = (dateStr) => {
  if (!dateStr) return false;

  const regex = /^\d{4}\/\d{2}\/\d{2}$/;

  if (dateStr.match(regex) === null) {
    return false;
  }

  const [year, month, day] = dateStr.split("/");

  // 👇️ format Date string as `yyyy-mm-dd`
  const isoFormattedStr = `${year}-${month}-${day}`;

  const date = new Date(isoFormattedStr);

  const timestamp = date.getTime();

  if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
    // 👇️ this runs
    return false;
  }

  return date.toISOString().startsWith(isoFormattedStr);
};
