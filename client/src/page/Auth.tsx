import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 

    const [role, setRole] = useState("Viewer");

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    
    const requestBody = isLogin
        ? { email, password }
        : { name, email, password, role};

    const url = isLogin
        ? "http://localhost:3004/api/auth/login"
        : "http://localhost:3004/api/user";

    try {
    const response = await axios.post(url, requestBody);
    if (response.status === 200 || response.status === 201) {
            setMessage(isLogin ? "Успішний вхід!" : "Реєстрація пройшла успішно!");
            setEmail("");
            setPassword("");
            setName("");
        }
        
        //save token
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        setTimeout(() => navigate("/tasks"), 1000);
    } catch (err: any) {
        console.error("Помилка:", err.message);
        setMessage("Помилка при " + (isLogin ? "вході" : "реєстрації"));
    }
};

return (
    <div className="bg-slate-800 p-6 rounded-md text-white max-w-md mx-auto">
        <h2 className="text-2xl mb-4 text-center">
            {isLogin ? "Авторизація" : "Реєстрація"}
        </h2>

        {message && (
            <p className={`mb-4 text-center ${message.includes("Помилка") ? "text-red-400" : "text-green-400"}`}>
                {message}
            </p>
        )}

    <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
            <>
            <div>
                <label className="block mb-2">Ім'я:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md"
                    required
                />
            </div>

            <div>
            <label className="block mb-2">Роль:</label>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md"
            >
                <option value="Viewer">Viewer</option>
                <option value="Admin">Admin</option>
            </select>
            </div>
            </>
        )}

        <div>
            <label className="block mb-2">Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md"
                required
            />
        </div>

            <div>
                <label className="block mb-2">Пароль:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 p-2 rounded-md w-full"
            >
                {isLogin ? "Вхід" : "Зареєструватися"}
            </button>
        </form>

        <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-400 hover:text-gray-300 mt-4 block text-center"
        >
            {isLogin ? "Немає акаунта? Зареєструватися" : "Вже є акаунт? Увійти"}
        </button>
        </div>
    );
};

export default Auth;
