import React from 'react';

const fetchBookById = async (id) => {
  const res = await fetch('https://example-data.draftbit.com/books');
  const books = await res.json();
  return books.find((book) => book.id === Number(id)); 
};

const BookDetailPage = async ({ params }) => {
  const book = await fetchBookById(params.id);

  if (!book) {
    return <div>Livre non trouvé</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Auteur: {book.authors}</p>
      <p>description: {book.description}</p>
      <p>Étoiles: {book.rating}</p>
    </div>
  );
};

export default BookDetailPage;
