import React from "react";
import { ArrowLeft, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import { achievements } from "../achievements";

export default function AchievementsPage() {
  const { user, userData } = useAuth();

  const unlocked = userData?.achievements || [];

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 w-fit">
        <ArrowLeft size={20} /> Voltar
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Trophy className="text-yellow-400" size={32} /> Sala de Troféus
        </h1>
        <p className="text-gray-400 mb-8">Todas as conquistas disponíveis no BugHunter.</p>

        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((a) => {
            const has = unlocked.includes(a.id);

            return (
              <div
                key={a.id}
                className={`p-5 rounded-xl border relative overflow-hidden transition-all
                  ${has 
                    ? "border-yellow-500/50 bg-yellow-500/5 shadow-lg shadow-yellow-900/10" 
                    : "border-gray-800 bg-[#1e1e1e] opacity-60"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${has ? "bg-yellow-500 text-black" : "bg-gray-800 text-gray-600"}`}>
                    <Trophy size={24} />
                  </div>
                  <div>
                    <h2 className={`text-lg font-bold ${has ? "text-white" : "text-gray-400"}`}>{a.title}</h2>
                    <p className="text-gray-400 text-sm mt-1">{a.description}</p>
                    
                    <div className="mt-3 flex gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded border ${
                        a.rarity === "Comum" ? "text-green-400 border-green-500/20 bg-green-500/10" :
                        a.rarity === "Raro" ? "text-blue-400 border-blue-500/20 bg-blue-500/10" :
                        "text-purple-400 border-purple-500/20 bg-purple-500/10"
                      }`}>
                        {a.rarity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}