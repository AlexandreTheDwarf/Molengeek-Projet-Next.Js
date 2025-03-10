import React from 'react';
import Link from 'next/link';

const fetchBooks = async () => {
  const res = await fetch('https://example-data.draftbit.com/books');
  return res.json();
};

const AllBooksPage = async () => {
  const books = await fetchBooks();

  return (
    <div>
      <h1>Liste des Livres</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link href={`/books/${book.id}`}>
              <h2>{book.title}</h2>
            </Link>
            <p>Auteur: {book.authors}</p>
            <p>Étoiles: {book.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBooksPage;