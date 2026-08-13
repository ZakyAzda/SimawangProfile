"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Inter, Merriweather } from "next/font/google";
import { Loader2, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-display" });

const CSS = `
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    font-family: var(--font-body), sans-serif;
  }
  
  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 48px 40px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  }

  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }
  .login-logo-ring {
    width: 56px;
    height: 56px;
    margin: 0 auto 16px;
    border-radius: 12px;
    background: #111827;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-title {
    font-size: 24px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }
  .login-subtitle {
    font-size: 14px;
    color: #6b7280;
  }

  .input-group {
    margin-bottom: 20px;
  }
  .input-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #4b5563;
    margin-bottom: 8px;
  }
  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }
  .input-icon {
    position: absolute;
    left: 14px;
    color: #9ca3af;
    width: 18px;
    height: 18px;
  }
  .login-input {
    width: 100%;
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    padding: 12px 14px 12px 42px;
    font-size: 14px;
    color: #111827;
    transition: all 0.2s ease;
  }
  .login-input::placeholder {
    color: #9ca3af;
  }
  .login-input:focus {
    outline: none;
    border-color: #111827;
    box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.1);
  }

  .login-btn {
    width: 100%;
    padding: 12px;
    background: #111827;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;
    margin-top: 24px;
  }
  .login-btn:hover:not(:disabled) {
    background: #374151;
  }
  .login-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #ef4444;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 13px;
    margin-bottom: 20px;
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Email atau password tidak valid.");
      } else {
        router.push("/admin"); // Redirect to dashboard
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <style>{CSS}</style>
      <div className="login-container">
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="login-header">
            <div className="login-logo-ring">
              <Lock style={{ color: "#ffffff" }} size={24} strokeWidth={2.5} />
            </div>
            <h1 className="login-title">Portal Admin</h1>
            <p className="login-subtitle">Masuk untuk mengelola Nagari Simawang</p>
          </div>

          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="email">Alamat Email</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  className="login-input"
                  placeholder="admin@simawang.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="input-icon" />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Kata Sandi</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  className="login-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="input-icon" />
              </div>
            </div>

            <motion.button
              type="submit"
              className="login-btn"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dasbor</span>
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
