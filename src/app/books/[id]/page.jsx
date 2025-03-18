"use client";

import React, { useState, useEffect } from "react";
import { useFavorites } from "../../../context/FavoritesContext";
import { useAuth } from "../../../context/AuthContext"; // Importer le contexte d'authentification
import { FaHeart, FaRegHeart } from "react-icons/fa";

const fetchBookById = async (id) => {
  const res = await fetch("https://example-data.draftbit.com/books");
  const books = await res.json();
  return books.find((book) => book.id === Number(id));
};

const BookDetailPage = ({ params }) => {
  const { user } = useAuth(); // Vérifier si l'utilisateur est connecté
  const { favorites, toggleFavorite } = useFavorites();
  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getBook = async () => {
      const fetchedBook = await fetchBookById(params.id);
      setBook(fetchedBook);
      setIsFavorite(favorites.some((fav) => fav.id === fetchedBook?.id));
    };

    getBook();
  }, [params.id, favorites]);

  if (!book) {
    return <div className="text-center text-gray-600">Livre non trouvé</div>;
  }

  return (
    <section className="w-full h-4/5 flex justify-center items-center bg-gray-200 py-20">
      <div className="w-3/12 h-128 relative">
        <img src={book.image_url} alt={book.title} className="rounded-xl h-full" />
        
        {/* Afficher le bouton favori uniquement si l'utilisateur est connecté */}
        {user && (
          <button
            className="absolute top-3 right-3 text-3xl text-red-500 hover:text-red-700"
            onClick={() => toggleFavorite(book)}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}
      </div>

      <div className="w-6/12 h-128 bg-white pt-5 rounded-xl flex flex-col items-center gap-2">
        <h1 className="text-center text-2xl font-bold">{book.title}</h1>
        <p className="text-center">
          By : <span className="italic">{book.authors}</span>
        </p>
        <p className="w-8/12 h-15 text-sm overflow-auto">{book.description}</p>

        <div className="flex flex-col gap-2 w-8/12 bg-gray-200 rounded p-2">
          <div className="p-3 flex justify-between items-center border">
            <span>Edition :</span>
            <span>{book.edition}</span>
          </div>
          <div className="p-3 flex justify-between items-center border">
            <span>Format :</span>
            <span>{book.format}</span>
          </div>
          <div className="p-3 flex flex-wrap gap-2 items-center justify-between border">
            <span>Genres :</span>
            <div className="flex flex-wrap gap-2">
              {Array.from(
                new Set(book.genres.split(",").map((genre) => genre.trim()))
              ).map((genre, index) => (
                <span key={index} className="px-2 py-1 bg-green-700 rounded-2xl text-white">
                  {genre}
                </span>
              ))}
            </div>
          </div>
          <div className="p-3 flex justify-between items-center border">
            <span>Number of Pages :</span>
            <span>{book.num_pages}</span>
          </div>
          <div className="p-3 flex justify-between items-center border">
            <span>Rating :</span>
            <span
              className={`font-bold ${
                book.rating > 4 ? "text-green-600" : book.rating < 2.5 ? "text-red-600" : "text-black"
              }`}
            >
              {book.rating} / 5
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailPage;
