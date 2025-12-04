import React, { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import { db, auth } from "../firebase";

import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default function Settings() {
  const { user, userData, setUserData } = useAuth(); 


  const [name, setName] = useState(userData?.name || user?.displayName || "");
  const [photo, setPhoto] = useState(userData?.photoURL || user?.photoURL || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function save() {
    if (!user) return;
    setLoading(true);
    setMessage("");

    try {
      // 1. Atualiza no Auth do Firebase (Core)
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      // 2. Atualiza no Banco de Dados (Firestore)
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, {
        name: name,
        photoURL: photo,
      });

      // 3. Atualiza o Contexto Global (para refletir na hora sem F5)
      setUserData((prev) => ({
        ...prev,
        name: name,
        photoURL: photo
      }));

      setMessage("✅ Perfil atualizado com sucesso!");
      
      // Limpa mensagem após 3 segundos
      setTimeout(() => setMessage(""), 3000);
      
    } catch (e) {
      console.error(e);
      setMessage("❌ Erro ao salvar: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <Link to="/profile" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 w-fit">
        <ArrowLeft size={20} /> Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-6">Configurações</h1>

      <div className="max-w-xl mx-auto bg-[#1e1e1e] p-6 rounded-xl border border-gray-700">
        
        {/* Campo Nome */}
        <label className="block mb-4">
          <span className="text-gray-300 text-sm font-bold">Nome de Exibição</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 bg-[#121212] text-white border border-gray-600 px-4 py-3 rounded focus:border-blue-500 outline-none transition"
            placeholder="Como você quer ser chamado?"
          />
        </label>

        {/* Campo Foto */}
        <label className="block mb-6">
          <span className="text-gray-300 text-sm font-bold">URL da Foto (Avatar)</span>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="https://exemplo.com/minha-foto.png"
            className="w-full mt-2 bg-[#121212] text-white border border-gray-600 px-4 py-3 rounded focus:border-blue-500 outline-none transition"
          />
          <p className="text-xs text-gray-500 mt-2">Cole um link direto de uma imagem (Imgur, etc).</p>
        </label>

        {/* Preview da Foto (Opcional) */}
        {photo && (
          <div className="mb-6 flex justify-center">
            <img 
              src={photo} 
              alt="Preview" 
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
              onError={(e) => e.target.style.display = 'none'} // Esconde se a imagem quebrar
            />
          </div>
        )}

        {/* Botão Salvar */}
        <button
          onClick={save}
          disabled={loading}
          className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded flex items-center justify-center gap-2 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Save size={18} /> {loading ? "Salvando..." : "Salvar Alterações"}
        </button>

        {/* Mensagem de Feedback */}
        {message && (
          <div className={`mt-4 text-center text-sm p-3 rounded border ${message.includes("Erro") ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-green-500/10 border-green-500/30 text-green-400"}`}>
            {message}
          </div>
        )}

      </div>
    </div>
  );
}