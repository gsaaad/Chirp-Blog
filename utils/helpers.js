module.exports = {
  formate_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new date(date)}/${new date(
      date
    ).getFullYear()}`;
  },
  format_url: (url) => {
    return url
      .replace("http://", "")
      .replace("https://", "")
      .reaplce("wwww", "")
      .split("/")[0]
      .split("?")[0];
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },
};
