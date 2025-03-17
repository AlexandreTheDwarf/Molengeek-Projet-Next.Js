"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Carousel from "../components/Carousel/Carousel";
import { useFavorites } from "../context/FavoritesContext"; 
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Importer les icônes de cœur

export default function Home() {
  const [books, setBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState(15);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { favorites, toggleFavorite } = useFavorites(); // Utiliser le contexte des favoris

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("https://example-data.draftbit.com/books");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();

        const filteredBooks = data.filter(book => book.rating >= 4);

        setBooks(filteredBooks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const loadMoreBooks = () => {
    setVisibleBooks((prev) => prev + 12);
  };

  return (
    <div className="flex flex-col gap-20">
      <Carousel />

      <div className="flex flex-col justify-center gap-2">
        <h4 className="text-center">Books Gallery</h4>
        <h1 className="text-center text-gray-800 text-3xl font-bold">Popular Books</h1>
      </div>

      {loading && <p className="text-center text-gray-600">Loading books...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && books.length > 0 && (
        <>
          <div className="grid grid-cols-5 gap-6 p-5 bg-gray-200">
            {books.slice(0, visibleBooks).map((book) => {
              const isFavorite = favorites.some((fav) => fav.id === book.id);

              return (
                <div key={book.id} className="text-center p-2 bg-white text-black w-4/5 h-[375px] shadow-md mx-auto">
                  <Link href={`/books/${book.id}`} className="no-underline text-black">
                    <img
                      src={book.image_url}
                      alt={book.title}
                      width={175}
                      height={200}
                      className="w-4/5 h-[250px] object-cover mx-auto"
                    />
                    <p className="mt-2 font-medium">{book.title}</p>
                    <p className="text-sm">
                      By : <i>{book.authors}</i>
                    </p>
                  </Link>
                  <button
                    onClick={() => toggleFavorite(book)}
                    className="mt-2 text-red-500"
                  >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
              );
            })}
          </div>

          {visibleBooks < books.length && (
            <button
              onClick={loadMoreBooks}
              className="block mx-auto bg-green-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-800 transition"
            >
              Load More
            </button>
          )}
        </>
      )}

      {!loading && !error && books.length === 0 && (
        <p className="text-center text-gray-600">No books found with rating 4 or higher.</p>
      )}
    </div>
  );
}
