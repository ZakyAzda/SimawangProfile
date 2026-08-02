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
    background: #0b1f18;
    position: relative;
    overflow: hidden;
    font-family: var(--font-body), sans-serif;
  }
  .login-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(201, 148, 58, 0.15), transparent 40%),
                radial-gradient(circle at bottom left, rgba(46, 102, 82, 0.4), transparent 50%);
  }
  .login-noise {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
    mix-blend-mode: overlay;
  }
  
  .login-card {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 440px;
    padding: 48px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: 24px;
    box-shadow: 0 32px 64px rgba(0, 0, 0, 0.3);
  }

  .login-header {
    text-align: center;
    margin-bottom: 40px;
  }
  .login-logo-ring {
    width: 64px;
    height: 64px;
    margin: 0 auto 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c9943a, #f7d273);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(201, 148, 58, 0.3);
  }
  .login-title {
    font-family: var(--font-display), serif;
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }
  .login-subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
  }

  .input-group {
    margin-bottom: 24px;
    position: relative;
  }
  .input-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 8px;
  }
  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }
  .input-icon {
    position: absolute;
    left: 16px;
    color: rgba(255, 255, 255, 0.4);
    width: 20px;
    height: 20px;
    transition: color 0.3s ease;
  }
  .login-input {
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 14px 16px 14px 48px;
    font-size: 15px;
    color: #ffffff;
    transition: all 0.3s ease;
  }
  .login-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  .login-input:focus {
    outline: none;
    border-color: #c9943a;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 0 4px rgba(201, 148, 58, 0.1);
  }
  .login-input:focus + .input-icon,
  .login-input:not(:placeholder-shown) + .input-icon {
    color: #c9943a;
  }

  .login-btn {
    width: 100%;
    padding: 16px;
    background: #c9943a;
    color: #1a3c30;
    font-size: 15px;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 24px rgba(201, 148, 58, 0.25);
  }
  .login-btn:hover:not(:disabled) {
    background: #deb25f;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(201, 148, 58, 0.35);
  }
  .login-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fca5a5;
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 13px;
    margin-bottom: 24px;
  }

  /* Decorative elements */
  .deco-line {
    position: absolute;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    height: 1px;
    width: 100%;
    top: 50%;
    pointer-events: none;
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
        <div className="login-bg" />
        <div className="login-noise" />
        
        <div className="deco-line" style={{ top: '20%' }} />
        <div className="deco-line" style={{ top: '80%' }} />

        <motion.div 
          className="login-card"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="login-header">
            <motion.div 
              className="login-logo-ring"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            >
              <Lock style={{ color: "#1a3c30" }} size={28} strokeWidth={2.5} />
            </motion.div>
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
