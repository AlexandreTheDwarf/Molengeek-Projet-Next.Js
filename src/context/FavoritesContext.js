"use client"

import { createContext, useContext, useEffect, useState } from "react"

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Récupération des favoris stockés au lancement de l'app
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(storedFavorites)
  }, [])

  // Mise à jour du localStorage dès qu'on modifie les favoris
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  // Ajoute ou retire un livre des favoris
  const toggleFavorite = (book) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === book.id)
      return isAlreadyFavorite
        ? prevFavorites.filter((fav) => fav.id !== book.id) // Si déjà en fav, on le vire
        : [...prevFavorites, book] // Sinon, on l'ajoute
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// Hook custom pour utiliser les favoris dans les composants
export function useFavorites() {
  return useContext(FavoritesContext)
}
