import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import darklogo from "../../assets/logoicon-black.png";
import rotateVid from "@/assets/a.mp4";
import usePlaybackRate from "@/hooks/usePlaybackRate";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  usePlaybackRate(videoRef, 0.7);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
  navigate(PATHS.root);
    } catch (err) {
      let message = "Error al registrar el usuario.";
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            message = "El correo ya está en uso.";
            break;
          case "auth/invalid-email":
            message = "El correo no es válido.";
            break;
          case "auth/weak-password":
            message = "La contraseña es demasiado débil (mín. 6 caracteres).";
            break;
          default:
            message = err.message || message;
        }
      }
      console.error("Register error:", err);
      setError(message);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-[url('@/assets/bg11.png')] bg-cover bg-no-repeat bg-center">
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.1),rgba(0,0,0,0.01),rgba(0,0,0,0.01),rgba(0,0,0,0.8))]">
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
            {/* Left: Form card */}
            <div className="bg-[#f6f7f3]/90 dark:bg-white/95 backdrop-blur-md p-8 sm:p-12">
              <form onSubmit={handleRegister} className="max-w-md mx-auto">
                {/* Logo */}
                <div className="flex items-center justify-center mb-8">
                  <img src={darklogo} alt="Logo" onClick={() => navigate(PATHS.root)} className="h-19 cursor-pointer hover:scale-[1.1] transition-transform ease-in-out duration-500" />
                </div>
                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center">Create your account</h1>
                <p className="mt-2 text-center text-gray-500">Start your journey with us today.</p>

                {error && <p className="text-red-500 mt-4 text-center text-sm">{error}</p>}

                {/* Name */}
                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-full border border-gray-300 focus:border-black focus:ring-0 px-4 py-3 text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-full border border-gray-300 focus:border-black focus:ring-0 px-4 py-3 text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-full border border-gray-300 focus:border-black focus:ring-0 px-4 py-3 text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* Primary CTA */}
                <button
                  className="mt-6 w-full rounded-full bg-black text-white py-3 font-medium hover:bg-black/90 transition"
                  type="submit"
                >
                  Create account
                </button>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex-1 h-px bg-gray-200" />
                  Or
                  <span className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Bottom helper */}
                <div className="text-xs text-gray-500 flex items-center justify-center gap-2">
                  <span>Already have an account?</span>
                  <button
                    type="button"
                    className="underline underline-offset-4 hover:text-gray-700"
                    onClick={() => navigate(PATHS.login)}
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Video panel */}
            <div className="relative bg-white/10 backdrop-blur-md">
              <video
                className="h-full w-full object-cover"
                src={rotateVid}
                autoPlay
                muted
                loop
                playsInline
                ref={videoRef}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-white/20" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
