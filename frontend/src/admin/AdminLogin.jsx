import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 

const adminEmails = ["sude__daka@hotmail.com","ali.daka@hotmail.com"]; 

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && adminEmails.includes(user.email)) {
        navigate("/admin/dashboard");
      }
    });
    return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        if (!adminEmails.includes(user.email)) {
          alert("Yetkiniz yok.");
          signOut(auth);
          return;
        }
        navigate("/admin/dashboard");
      })
      .catch((err) => alert("Giriş başarısız: " + err.message));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-6 text-center font-semibold">Admin Girişi</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          className="border p-2 rounded mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}
