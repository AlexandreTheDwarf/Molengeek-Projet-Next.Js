"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { FaTimes, FaHeart, FaHeartBroken, FaBook, FaPhoneAlt, FaSearch } from "react-icons/fa";
import { CgMenuLeft } from "react-icons/cg";

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const pathname = usePathname(); // Détecte la page actuelle

  if (isLoading) return null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-sidebar") && isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (!event.target.closest(".favorites-sidebar") && isFavoritesOpen) {
        setIsFavoritesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isFavoritesOpen]);

  return (
    <>
      <nav className="flex items-center justify-center p-4 bg-white text-lg h-[10vh] w-full gap-[15%]">
        <div className="flex items-center justify-center w-[30%] gap-[3%]">
          <CgMenuLeft className="w-10 h-10 cursor-pointer" onClick={() => setIsMenuOpen(true)} />
          <Link href="/" className="text-black no-underline">
            <h1>BOOKSHELF.</h1>
          </Link>
        </div>

        <div className={`flex items-center justify-center bg-gray-200 p-2 rounded-full w-[20%] ${pathname === "/allBookPage" ? "opacity-0 pointer-events-none invisible" : ""}`}>
          <FaSearch className="text-lg cursor-pointer mx-2.5 bg-gray-200" />
          <input type="text" placeholder="Search your book here" className="border-none bg-transparent outline-none ml-2.5 w-full" />
        </div>

        <div className="flex items-center ml-[10%] mr-[5%] gap-5">
          <FaPhoneAlt />
          <span>0485313406</span>
          <FaHeart className="cursor-pointer hover:text-[#328f7b]" onClick={() => setIsFavoritesOpen(true)} />
        </div>
      </nav>

      <div className={`fixed top-0 left-0 w-[300px] h-screen bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-10 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center font-bold text-xl pb-2.5 bg-gray-300 p-5">
          <h2>BOOKSHELF</h2>
          <FaTimes className="text-xl cursor-pointer" onClick={() => setIsMenuOpen(false)} />
        </div>

        <ul className="list-none pl-5 mt-5">
          <li className="py-2.5 text-xl">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-black no-underline transition-colors hover:text-[#328f7b]">
              Main page
            </Link>
          </li>
          <li className="py-2.5 text-xl">
            <Link href="/allBookPage" onClick={() => setIsMenuOpen(false)} className="text-black no-underline transition-colors hover:text-[#328f7b]">
              All books
            </Link>
          </li>
        </ul>

        <div className="text-left pl-5">
          {user ? (
            <>
              <p className="font-bold text-xl mb-2.5">Bonjour, {user.username}</p>
              <button className="bg-[#328f7b] text-white border-none p-2.5 cursor-pointer w-1/2 rounded" onClick={logout}>
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/login" className="block text-[#328f7b] text-xl font-bold p-2.5" onClick={() => setIsMenuOpen(false)}>
              Connexion
            </Link>
          )}
        </div>
      </div>

      <div className={`fixed top-0 right-0 w-[350px] h-screen bg-white shadow-lg p-5 transform transition-transform duration-300 flex flex-col text-center z-10 ${isFavoritesOpen ? "translate-x-0" : "translate-x-full"}`}>
        <FaTimes className="absolute right-3.5 top-3.5 text-lg cursor-pointer" onClick={() => setIsFavoritesOpen(false)} />
        <h2>Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorites yet</p>
        ) : (
          <ul>
            {favorites.map((book) => (
              <li key={book.id} className="flex items-center p-6 relative transition-colors duration-300 w-full hover:bg-gray-100 rounded">
                <img src={book.image_url} alt={book.title} className="w-24 h-24 object-cover mr-2.5" />
                <div className="flex justify-between items-center w-full">
                  <p>{book.title}</p>
                  <div className="flex gap-5 opacity-0 transition-opacity duration-300 mr-2.5">
                    <FaHeartBroken className="w-5 h-5 p-1.5 text-black bg-gray-400 rounded-full cursor-pointer transition-transform duration-300 hover:bg-[#328f7b] hover:text-white hover:scale-110" onClick={() => toggleFavorite(book)} />
                    <Link href={`/book/${book.id}`}>
                      <FaBook className="w-5 h-5 p-1.5 text-black bg-gray-400 rounded-full cursor-pointer transition-transform duration-300 hover:bg-[#328f7b] hover:text-white hover:scale-110" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
