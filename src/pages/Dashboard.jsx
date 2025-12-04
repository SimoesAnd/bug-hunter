import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { achievements } from "../achievements";
import { levels } from "../levels"; 
import { Link } from "react-router-dom";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/themes/prism-tomorrow.css";

import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, RotateCcw, Bug, Code, Check, XCircle, ArrowRight, Trophy, LogOut, Save, Menu, User, Settings, X 
} from "lucide-react";

export default function Dashboard() {
  const { user, userData, setUserData, logout } = useAuth();
  
  // Controle da Sidebar (Mobile vs Desktop)
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); 

  const [unlockedAchievement, setUnlockedAchievement] = useState(null);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(() => parseInt(localStorage.getItem("bugHunterLevel") || "0"));
  
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle");
  const [output, setOutput] = useState("Aguardando execução...");

  const currentLevel = levels[currentLevelIndex] || levels[0];
  const isLastLevel = currentLevelIndex === levels.length - 1;
  const progressPercent = Math.round(((currentLevelIndex + 1) / levels.length) * 100);

  useEffect(() => {
    setCode(currentLevel.initialCode);
    setStatus("idle");
    setOutput("Aguardando execução...");
    localStorage.setItem("bugHunterLevel", currentLevelIndex.toString());
    setSidebarOpen(false); 
  }, [currentLevelIndex]);

  const handleSuccess = async () => {
    if (!user || !userData) return;
    const newRuns = (userData.runs || 0) + 1;
    let currentAchievs = userData.achievements || [];
    const newUnlocked = [];

    achievements.forEach(ach => {
      if (!currentAchievs.includes(ach.id)) {
        if (ach.condition(user, currentLevelIndex + 1, levels.length)) {
          newUnlocked.push(ach.id);
          setUnlockedAchievement(ach); 
          setTimeout(() => setUnlockedAchievement(null), 5000);
        }
      }
    });

    const finalAchievs = [...currentAchievs, ...newUnlocked];
    setUserData(prev => ({ ...prev, runs: newRuns, achievements: finalAchievs }));

    try {
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { runs: newRuns, achievements: finalAchievs });
    } catch (e) { console.error(e); }
  };

  const runCode = async () => {
    setStatus("running");
    setOutput("Analisando solução...");
    setSidebarOpen(false); 

    setTimeout(async () => {
      try {
        let log = "";
        let passed = false;

        if (!currentLevel.language || currentLevel.language === "javascript") {
          const userFunctionWrapper = new Function(`try { ${code}; return ${currentLevel.functionName}; } catch(e) { throw new Error(e.message); }`);
          const userFn = userFunctionWrapper();
          if (typeof userFn !== "function") throw new Error(`Função '${currentLevel.functionName}' não encontrada.`);

          for (const test of currentLevel.testCases) {
            let result;
            try { result = userFn(...test.input); } catch (e) { throw new Error(`Erro na execução: ${e.message}`); }
            if (result !== test.expected) {
              setStatus("error");
              setOutput(`${log}❌ FALHA\nEntrada: ${JSON.stringify(test.input)}\nEsperado: ${test.expected}\nObtido: ${result}`);
              return;
            }
            log += `✅ Passou: ${JSON.stringify(test.input)} -> ${result}\n`;
          }
          passed = true;
        } else if (currentLevel.language === "html" || currentLevel.language === "css") {
          const result = currentLevel.validation(code);
          if (!result.passed) {
            setStatus("error");
            setOutput(`❌ FALHA: ${result.msg}`);
            return;
          }
          log = `✅ ${result.msg}`;
          passed = true;
        }

        if (passed) {
          setStatus("success");
          setOutput(log + "\n✨ DESAFIO CONCLUÍDO!");
          triggerConfetti();
          await handleSuccess();
        }
      } catch (err) {
        setStatus("error");
        setOutput(`💀 ERRO CRÍTICO:\n${err.message}`);
      }
    }, 500);
  };

  const triggerConfetti = (big = false) => {
    confetti({ particleCount: big ? 200 : 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-gray-100 font-sans overflow-hidden">
      
      <AnimatePresence>
        {unlockedAchievement && (
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="fixed top-0 left-1/2 -translate-x-1/2 z-[60] bg-[#1e1e1e] border border-yellow-500 text-yellow-400 p-4 rounded-xl shadow-2xl flex items-center gap-4 w-11/12 md:w-auto">
            <Trophy size={32} />
            <div>
              <h3 className="font-bold text-lg">{unlockedAchievement.title}</h3>
              <p className="text-sm text-gray-400">{unlockedAchievement.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HEADER RESPONSIVO --- */}
      <header className="h-14 bg-[#18181b] border-b border-gray-700 flex items-center justify-between px-3 md:px-4 relative z-50">
        <div className="flex items-center gap-2">
           {/* Botão Menu Mobile */}
           <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-white">
             <Menu />
           </button>
           <div className="flex items-center gap-1 font-bold text-lg">
             <Bug className="text-red-500" /> 
             <span className="hidden sm:inline">Bug<span className="text-red-500">Hunter</span></span>
           </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 text-sm">
          <div className="hidden lg:flex items-center gap-3 mr-4 border-r border-gray-700 pr-4">
            <span className="text-gray-400 font-mono text-xs">
              Nível <span className="text-white font-bold">{currentLevelIndex + 1}</span>/{levels.length}
            </span>
            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <span className="mr-2 hidden sm:block">Runs: <b className="text-blue-400">{userData?.runs || 0}</b></span>
          
          <Link to="/profile" className="text-gray-400 hover:text-blue-400 transition"><User size={20} /></Link>
          <Link to="/settings" className="text-gray-400 hover:text-white transition"><Settings size={20} /></Link>

          <div className="w-px h-4 bg-gray-700 mx-1"></div>
          <button onClick={() => { localStorage.removeItem("bugHunterLevel"); window.location.reload(); }}><Save size={20} className="text-gray-400 hover:text-red-500"/></button>
          <button onClick={logout}><LogOut size={20} className="text-gray-400 hover:text-red-500"/></button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        
        {/* --- SIDEBAR RESPONSIVA --- */}
        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" />
        )}

        <aside className={`
            fixed md:relative z-50 h-full bg-[#18181b] border-r border-gray-700 transition-all duration-300
            ${sidebarOpen ? "translate-x-0 w-3/4" : "-translate-x-full md:translate-x-0"}
            ${sidebarCollapsed ? "md:w-16" : "md:w-80"}
            flex flex-col p-4 shadow-2xl md:shadow-none
        `}>
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden md:block text-gray-400 hover:text-white"><Menu/></button>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 ml-auto"><X/></button>
          </div>
          
          {(!sidebarCollapsed || sidebarOpen) && (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-green-400 border border-green-500/30 px-2 py-1 rounded">{currentLevel.difficulty}</span>
                  <span className={`text-xs font-bold border px-2 py-1 rounded uppercase ${
                    currentLevel.language === "html" ? "text-orange-400 border-orange-500/30" : 
                    currentLevel.language === "css" ? "text-blue-400 border-blue-500/30" : 
                    "text-yellow-400 border-yellow-500/30"
                  }`}>
                    {currentLevel.language || "JS"}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold mb-2">{currentLevel.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{currentLevel.description}</p>
                
                <div className="bg-blue-500/10 p-4 rounded border border-blue-500/20 mb-6">
                  <h4 className="text-blue-400 text-xs font-bold mb-1 uppercase">Dica</h4>
                  <p className="text-xs text-gray-300">{currentLevel.hint}</p>
                </div>
              </div>

              {status === "success" && (
                <div className="mt-auto pt-4 border-t border-gray-700">
                  <button onClick={() => !isLastLevel ? setCurrentLevelIndex(p => p+1) : triggerConfetti(true)} className="w-full bg-white text-black font-bold py-3 rounded hover:bg-gray-200 transition flex justify-center items-center gap-2 shadow-lg animate-bounce">
                    {isLastLevel ? "Receber Troféu" : <><ArrowRight size={18}/> Próximo</>}
                  </button>
                </div>
              )}
            </div>
          )}
        </aside>

        {/* --- ÁREA DE CÓDIGO E TERMINAL --- */}
        <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
          
          {/* EDITOR */}
          <section className="flex-1 flex flex-col bg-[#1e1e1e] min-h-[50%] md:min-h-full border-b md:border-b-0 md:border-r border-gray-800">
            <div className="h-9 border-b border-gray-800 flex items-center justify-between px-4 text-xs text-gray-400 bg-[#1e1e1e]">
               <span className="flex items-center gap-2">
                 <Code size={14}/> 
                 {currentLevel.language === 'html' ? 'index.html' : currentLevel.language === 'css' ? 'style.css' : 'script.js'}
               </span>
               <button onClick={() => setCode(currentLevel.initialCode)}><RotateCcw size={14} className="hover:text-white"/></button>
            </div>
            
            <div className="flex-1 overflow-auto relative">
              <Editor 
                value={code} 
                onValueChange={setCode} 
                highlight={code => {
                  if (currentLevel.language === "html") return highlight(code, languages.markup);
                  if (currentLevel.language === "css") return highlight(code, languages.css);
                  return highlight(code, languages.js);
                }}
                padding={20}
                style={{ fontFamily: '"Fira Code", monospace', fontSize: 14, backgroundColor: "#1e1e1e", color: "#f8f8f2", minHeight: "100%" }}
              />
              {/* Botão Play Flutuante (Mobile Only) */}
              <button onClick={runCode} className="md:hidden absolute bottom-4 right-4 z-30 bg-green-600 p-3 rounded-full shadow-lg hover:scale-110 transition text-white">
                <Play fill="white" size={20} />
              </button>
            </div>
          </section>

          {/* TERMINAL */}
          <section className="h-[35%] md:h-full md:w-1/3 bg-[#0d0d0d] flex flex-col border-t md:border-t-0 font-mono">
            <div className="h-9 bg-[#18181b] border-b border-gray-700 flex items-center px-4 font-bold text-gray-500 text-xs uppercase justify-between">
              Terminal
              {status === "success" && <span className="text-green-500 flex items-center gap-1"><Check size={12}/> Passou</span>}
              {status === "error" && <span className="text-red-500 flex items-center gap-1"><XCircle size={12}/> Erro</span>}
            </div>
            <div className={`flex-1 p-4 text-sm whitespace-pre-wrap overflow-auto ${status === "error" ? "text-red-400" : status === "success" ? "text-green-400" : "text-gray-400"}`}>
              {output}
            </div>
            {/* Botão Play (Desktop Only) */}
            <div className="p-4 border-t border-gray-800 hidden md:block">
              <button onClick={runCode} disabled={status === "running"} className="w-full bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-3 rounded transition flex justify-center items-center gap-2">
                 {status === "running" ? "Executando..." : <><Play size={16} fill="white"/> Testar Solução</>}
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}