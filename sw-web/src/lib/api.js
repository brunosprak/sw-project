const API_BASE = process.env.REACT_APP_API_BASE;

export function getImageUrl(isbn) {
  return `${API_BASE}books/${isbn}/cover`;
}

export function getEraNamesByCanonicity(canonicity) {
  if (canonicity === 'canon') {
    return [
      { id: 'can/thr', label: 'The High Republic' },
      { id: 'can/fotj', label: 'Fall of the Jedi' },
      { id: 'can/rote', label: 'Reign of the Empire' },
      { id: 'can/aor', label: 'Age of Rebellion' },
      { id: 'can/tnr', label: 'The New Republic' },
      { id: 'can/rotfo', label: 'Rise of The First Order' }
    ];
  }
  if (canonicity === 'legends') {
    return [
      { id: 'leg/pre', label: 'Pre-Republic' },
      { id: 'leg/btr', label: 'Before the Republic' },
      { id: 'leg/old', label: 'Old republic' },
      { id: 'leg/imp', label: 'Rise of the Empire' },
      { id: 'leg/reb', label: 'Rebellion' },
      { id: 'leg/njo', label: 'New Jedi Order' },
      { id: 'leg/lgc', label: 'Legacy' }
    ];
  }

  return null;
}

export function getEraNameByAcronym(acronym) {
  let canonicity;
  if (acronym.includes('can/')) {
    canonicity = 'canon';
  } else if (acronym.includes('leg/')) {
    canonicity = 'legends';
  } else {
    return '';
  }
  const eraFound = getEraNamesByCanonicity(canonicity).find((era) => era.id === acronym);

  if (!eraFound) {
    return '';
  }
  return eraFound.label;
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
