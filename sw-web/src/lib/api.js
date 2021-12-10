const API_BASE = 'http://localhost:9001/';

export  function getImageUrl(wikiTitle) {
    return `${API_BASE}book/${wikiTitle}/cover`;
}

export async function getFutureBooks() {
    const response = await fetch(`${API_BASE}books/future`);
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