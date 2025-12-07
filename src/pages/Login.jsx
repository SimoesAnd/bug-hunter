import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Bug, Mail, Lock, User, LogIn, Sun, Moon } from "lucide-react";

export default function Login() {
  const { loginGoogle, loginEmail, registerEmail, resetPassword } = useAuth();
  
  const [mode, setMode] = useState("login");
  
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // tradutor de erros mostrado na tela login
  const getFriendlyError = (error) => {
    console.error("Erro original:", error.code);
    
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "E-mail ou senha incorretos.";
      case "auth/email-already-in-use":
        return "Este e-mail já está sendo usado por outra conta.";
      case "auth/weak-password":
        return "A senha é muito fraca. Escolha uma mais forte.";
      case "auth/invalid-email":
        return "O formato do e-mail é inválido.";
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde.";
      case "auth/network-request-failed":
        return "Erro de conexão. Verifique sua internet.";
      case "auth/popup-closed-by-user":
        return "O login com Google foi cancelado.";
      default:
        return "Ocorreu um erro inesperado. Tente novamente.";
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = "O e-mail é obrigatório.";
    else if (!emailRegex.test(email)) newErrors.email = "Digite um e-mail válido.";

    if (pass.length < 6) newErrors.pass = "Mínimo 6 caracteres";
    
    if (mode === "register") {
      if (!name.trim()) newErrors.name = "Nome é obrigatório";
      if (pass !== pass2) newErrors.pass2 = "Senhas não conferem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit() {
    setMessage("");
    if (!validate()) return;

    try {
      if (mode === "login") {
        await loginEmail(email, pass);
      } else if (mode === "register") {
        await registerEmail(name, email, pass);
      } else if (mode === "forgot") {
        await resetPassword(email);
        setMessage("✅ E-mail de recuperação enviado! Verifique sua caixa de entrada.");
        return; // Retorna para não cair no catch nem limpar a mensagem de sucesso
      }
    } catch (err) {
      setMessage(getFriendlyError(err));
    }
  }

  async function handleGoogle() {
    try {
      await loginGoogle();
    } catch (err) {
      setMessage(getFriendlyError(err));
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-gray-200"}`}>
      <div className={`w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-300"}`}>
        
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Bug className="text-red-500 w-6 h-6 sm:w-8 sm:h-8"/>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-black"}`}>
              Bug<span className="text-red-500">Hunter</span>
            </h1>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition active:scale-95">
            {theme === "dark" ? <Sun className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6"/> : <Moon className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6"/>}
          </button>
        </div>

        {/* Mensagem de Erro/Sucesso Estilizada */}
        {message && (
          <div className={`mb-4 p-3 rounded text-sm text-center animate-pulse border font-medium ${
            message.includes("✅") 
              ? "bg-green-500/10 border-green-500/30 text-green-400" 
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}>
            {message}
          </div>
        )}

        {mode !== "forgot" && (
          <div className="flex mb-6 p-1 bg-white/5 rounded-lg border border-white/10">
            {["login", "register"].map((m) => (
              <button 
                key={m} 
                onClick={() => { setMode(m); setMessage(""); setErrors({}); }} 
                className={`flex-1 py-2 text-sm sm:text-base rounded font-semibold capitalize transition-all duration-200 ${
                  mode === m 
                    ? "bg-red-600 text-white shadow-md" 
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {m === "login" ? "Entrar" : "Criar Conta"}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {mode === "register" && (
            <Input icon={User} placeholder="Nome Completo" val={name} set={setName} error={errors.name} theme={theme} />
          )}
          
          <Input icon={Mail} type="email" placeholder="Seu E-mail" val={email} set={setEmail} error={errors.email} theme={theme} />
          
          {mode !== "forgot" && (
            <Input icon={Lock} type="password" placeholder="Sua Senha" val={pass} set={setPass} error={errors.pass} theme={theme} />
          )}

          {mode === "register" && (
             <Input icon={Lock} type="password" placeholder="Confirme a Senha" val={pass2} set={setPass2} error={errors.pass2} theme={theme} />
          )}

          <button 
            onClick={handleSubmit} 
            className="w-full bg-red-600 hover:bg-red-500 py-3 sm:py-3.5 rounded-lg text-white font-bold shadow-lg transition active:scale-[0.98] flex justify-center items-center gap-2 text-sm sm:text-base"
          >
             {mode === "login" ? <><LogIn size={18}/> Acessar Plataforma</> : mode === "register" ? "Cadastrar-se" : "Enviar Link"}
          </button>

          {mode === "login" && (
            <>
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-500/30"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-xs">OU</span>
                <div className="flex-grow border-t border-gray-500/30"></div>
              </div>

              <button 
                onClick={handleGoogle} 
                className="w-full bg-white text-black py-3 sm:py-3.5 rounded-lg font-bold hover:bg-gray-100 transition active:scale-[0.98] flex justify-center items-center gap-2 text-sm sm:text-base shadow-sm"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="G" /> 
                Continuar com Google
              </button>
              
              <p 
                className="text-center text-sm text-gray-400 cursor-pointer hover:text-white mt-2 transition underline decoration-transparent hover:decoration-white" 
                onClick={() => { setMode("forgot"); setMessage(""); setErrors({}); }}
              >
                Esqueceu sua senha?
              </p>
            </>
          )}

          {mode === "forgot" && (
             <p 
               className="text-center text-sm text-gray-400 cursor-pointer hover:text-white mt-4 transition" 
               onClick={() => { setMode("login"); setMessage(""); setErrors({}); }}
             >
               &larr; Voltar para o login
             </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ icon: Icon, theme, error, val, set, ...props }) {
  return (
    <div className="relative group">
      <Icon className={`absolute left-3 top-3.5 transition-colors ${error ? "text-red-500" : "text-gray-400 group-focus-within:text-red-500"}`} size={20} />
      <input 
        value={val}
        onChange={e => set(e.target.value)}
        className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none border transition-all duration-200 text-sm sm:text-base
          ${error 
            ? "border-red-500 focus:ring-2 focus:ring-red-500/20" 
            : "border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
          } 
          ${theme === "dark" 
            ? "bg-white/5 text-white placeholder-gray-500" 
            : "bg-gray-50 text-black placeholder-gray-400"
          }
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-400 ml-1 mt-1 block font-medium">{error}</span>}
    </div>
  );
}