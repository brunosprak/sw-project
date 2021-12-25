const API_BASE = 'http://localhost:9001/';

export function getImageUrl(isbn) {
  return `${API_BASE}books/${isbn}/cover`;
}

export async function getFutureBooks() {
  const response = await fetch(`${API_BASE}books`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  // const transformedBooks = [];

  // for (const key in data) {
  //   const quoteObj = {
  //     id: key,
  //     ...data[key],
  //   };

  //   transformedBooks.push(quoteObj);
  // }

  // return transformedBooks;
  return data;
}
