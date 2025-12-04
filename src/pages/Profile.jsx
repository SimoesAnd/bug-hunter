import React from "react";
import { ArrowLeft, User, Trophy, Code, Settings as SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { achievements } from "../achievements"; 

export default function Profile() {
  const { user, userData } = useAuth();

  if (!user || !userData) {
    return <div className="h-screen flex items-center justify-center text-white bg-[#121212]">Carregando...</div>;
  }

  const avatar = userData.photoURL || user.photoURL;
  const name = userData.name || user.displayName || "Usuário";
  const email = userData.email || user.email;
  const runs = userData.runs || 0;
  
  const rawUnlocked = userData.achievements || [];
  const validAchievementIds = achievements.map(a => a.id);
  const validUnlocked = rawUnlocked.filter(id => validAchievementIds.includes(id));
  const totalAchievements = achievements.length;

  return (
    <div className="min-h-screen bg-[#121212] text-white p-4 md:p-6">
      <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 w-fit">
        <ArrowLeft size={20} /> Voltar para Dashboard
      </Link>

      {/* Grid Responsivo*/}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Cartão do Usuário */}
        <div className="col-span-1 bg-[#1e1e1e] p-6 rounded-xl border border-gray-700 flex flex-col items-center h-fit">
          <div className="mb-4 relative">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#121212] shadow-xl" />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-700 rounded-full flex items-center justify-center border-4 border-[#121212] shadow-xl">
                <User size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-center break-words w-full">{name}</h2>
          <p className="text-gray-400 text-sm mb-6 break-words w-full text-center">{email}</p>
          <Link to="/settings" className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm transition font-medium">
            <SettingsIcon size={16} /> Editar Perfil
          </Link>
        </div>

        {/* Estatísticas e Conquistas */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1e1e1e] p-4 md:p-5 rounded-xl border border-gray-700 flex flex-col items-center justify-center gap-2">
              <Code className="text-blue-500" size={28} />
              <span className="text-2xl md:text-3xl font-bold">{runs}</span>
              <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider text-center">Runs Executadas</span>
            </div>
            <div className="bg-[#1e1e1e] p-4 md:p-5 rounded-xl border border-gray-700 flex flex-col items-center justify-center gap-2">
              <Trophy className="text-yellow-500" size={28} />
              <span className="text-2xl md:text-3xl font-bold">{validUnlocked.length} <span className="text-lg text-gray-500">/ {totalAchievements}</span></span>
              <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider text-center">Conquistas</span>
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-4 md:p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Trophy className="text-yellow-500" size={20} /> Galeria de Troféus
            </h3>
            <div className="space-y-3">
              {achievements.map((ach) => {
                const isUnlocked = validUnlocked.includes(ach.id);
                return (
                  <div key={ach.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border transition-all ${isUnlocked ? "bg-yellow-500/10 border-yellow-500/30" : "bg-[#121212] border-gray-800 opacity-50 grayscale"}`}>
                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                      <div className={`p-2 rounded-full flex-shrink-0 ${isUnlocked ? "bg-yellow-500/20 text-yellow-500" : "bg-gray-800 text-gray-600"}`}>
                        <Trophy size={16} />
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${isUnlocked ? "text-white" : "text-gray-500"}`}>{ach.title}</h4>
                        <p className="text-xs text-gray-400">{ach.description}</p>
                      </div>
                    </div>
                    {isUnlocked && <span className="text-xs text-center text-yellow-500 font-bold px-2 py-1 bg-yellow-500/10 rounded sm:ml-4">Desbloqueado</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}