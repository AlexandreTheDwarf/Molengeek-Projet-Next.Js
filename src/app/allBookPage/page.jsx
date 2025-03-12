"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaList } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";

const fetchBooks = async () => {
  const res = await fetch("https://example-data.draftbit.com/books");
  return res.json();
};

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("rating-up");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };
    getBooks();
  }, []);

  // Catégories fixes demandées
  const categories = ["All", "Classics", "Fiction", "Historical", "Science Fiction", "Fantasy", "Young Adult"];

  // Filtrage des livres selon la recherche, la catégorie, le rating minimum et l'ordre de tri
  const filteredBooks = books
    .filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
    .filter((book) => selectedCategory === "All" || book.genres?.split(",").some((g) => g.trim() === selectedCategory))
    .filter((book) => book.rating >= minRating)
    .sort((a, b) => sortOrder === "rating-up" ? a.rating - b.rating : b.rating - a.rating);

  return (
    <section className="w-full px-10 flex gap-10">
      {/* Sidebar gauche */}
      <div className="w-1/4 flex flex-col gap-6">
        {/* Searchbar */}
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded-md w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Catégories */}
        <div className="flex flex-col items-center">
          <h2 className="font-bold italic mb-2">Category</h2>
          <ul className="flex flex-col gap-2 items-center">
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer ${selectedCategory === category ? "font-bold text-green-700 underline" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Rating minimum */}
        <div className="flex flex-col items-center gap-6">
          <h2 className="font-bold italic mb-2 text-center">Minimum rating</h2>
          <p>{minRating} / 5</p>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="w-3/4">
        <div className="flex justify-between items-center mb-5">
          <div className="flex gap-3 text-xl">
            <FiPlusSquare className="cursor-pointer" />
            <FaList className="cursor-pointer" />
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-400 rounded px-3 py-1"
          >
            <option value="rating-up">Rating ⬆️</option>
            <option value="rating-down">Rating ⬇️</option>
          </select>
        </div>

        {/* Liste des livres */}
        <div className="grid grid-cols-3 gap-20 h-186 overflow-y-scroll px-10">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="h-96 p-4 rounded-md shadow-md bg-white flex flex-col items-center relative group overflow-hidden"
            >
              <Link className="flex flex-col items-center justify-center" href={`/books/${book.id}`}>
                <img src={book.image_url} alt={book.title} className="h-60 rounded-md mb-2" />
                <h2 className="font-bold text-lg">{book.title}</h2>
              </Link>
              <p className="text-gray-600 italic">By {book.authors}</p>
              <div className="w-full flex justify-evenly items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-full group-hover:translate-y-0 absolute bottom-0 left-0 right-0 bg-white p-2 rounded-t-md shadow-md">
                <p className="mt-1">⭐ {book.rating} / 5</p>
                <p className="mt-1">on {book.rating_count} advices</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllBooksPage;
