"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Contexte d'authentification
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Récupération de l'utilisateur stocké au démarrage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    if (storedUser) setUser(storedUser)
  }, [])

  // Connexion : vérifie les identifiants et stocke l'utilisateur si OK
  const login = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || []
    const existingUser = storedUsers.find(
      (user) => user.username === username && user.password === password
    )

    if (existingUser) {
      setUser(existingUser)
      localStorage.setItem("user", JSON.stringify(existingUser))
      return { success: true }
    } else {
      return { success: false, message: "Identifiants incorrects" }
    }
  }

  // Inscription : ajoute un nouvel utilisateur si le pseudo n'existe pas déjà
  const register = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || []

    if (storedUsers.some((user) => user.username === username)) {
      return { success: false, message: "Ce nom d'utilisateur existe déjà" }
    }

    const newUser = { username, password }
    storedUsers.push(newUser)
    localStorage.setItem("users", JSON.stringify(storedUsers))
    return { success: true }
  }

  // Déconnexion : supprime l'utilisateur du state et du localStorage
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook custom pour accéder facilement au contexte
export function useAuth() {
  return useContext(AuthContext)
}
