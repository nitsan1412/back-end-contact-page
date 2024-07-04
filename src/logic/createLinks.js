exports.createLinks = (pageId, isFinished) => {
  if (isFinished) return `${process.env.BASE_URL}/new_student/${pageId}`;
  else return `${process.env.BASE_URL}/finished_page/${pageId}`;
};

// function createLinks(pageId, isFinished) {
//   if (isFinished) return `${process.env.BASE_URL}/new_student/${pageId}`;
//   else return `${process.env.BASE_URL}/finished_page/${pageId}`;
// }

// module.exports = { createLinks };
