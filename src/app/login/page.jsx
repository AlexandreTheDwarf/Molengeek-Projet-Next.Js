"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (isRegistering) {
      const result = register(username, password);
      if (!result.success) {
        setError(result.message);
      } else {
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        setIsRegistering(false);
      }
    } else {
      const result = login(username, password);
      if (!result.success) {
        setError(result.message);
      } else {
        router.push("/"); // Redirection après connexion
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegistering ? "Inscription" : "Connexion"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#328f7b] text-white p-2 rounded hover:bg-[#28735e] transition"
          >
            {isRegistering ? "S'inscrire" : "Se connecter"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isRegistering ? "Déjà un compte ?" : "Pas encore de compte ?"}
          <button
            className="text-[#328f7b] font-bold ml-1"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError(null);
            }}
          >
            {isRegistering ? "Se connecter" : "S'inscrire"}
          </button>
        </p>
      </div>
    </div>
  );
}
