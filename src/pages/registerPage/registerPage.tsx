import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import darklogo from "../../assets/logoicon-black.png";
import rotateVid from "@/assets/a.mp4";
import usePlaybackRate from "@/hooks/usePlaybackRate";
import { loginWithGoogle } from "@/auth/authService";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  usePlaybackRate(videoRef, 0.7);

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await loginWithGoogle();
      navigate(PATHS.movies);
    } catch (err) {
      let message = "No se pudo iniciar sesión con Google.";
      if (err instanceof FirebaseError) message = err.message || message;
      setError(message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
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
            <div className="bg-[#f6f7f3]/90 dark:bg-white/95 backdrop-blur-md p-8 sm:p-12">
              <form onSubmit={handleRegister} className="max-w-md mx-auto">
                <div className="flex items-center justify-center mb-8">
                  <img
                    src={darklogo}
                    alt="Logo"
                    onClick={() => navigate(PATHS.root)}
                    className="h-19 cursor-pointer hover:scale-[1.1] transition-transform ease-in-out duration-500"
                  />
                </div>
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center">
                  Create your account
                </h1>
                <p className="mt-2 text-center text-gray-500">
                  Start your journey with us today.
                </p>

                {error && (
                  <p className="text-red-500 mt-4 text-center text-sm">
                    {error}
                  </p>
                )}

                <div className="mt-8">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
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

                <div className="mt-4">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
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

                <div className="mt-4">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
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

                <button
                  className="mt-6 w-full rounded-full bg-black text-white py-3 font-medium hover:bg-black/90 transition"
                  type="submit"
                >
                  Create account
                </button>

                <div className="my-4 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex-1 h-px bg-gray-200" />
                  Or
                  <span className="flex-1 h-px bg-gray-200" />
                </div>

                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="w-full rounded-full border cursor-pointer border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-black py-3 font-medium flex items-center justify-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
                      fill="#F44336"
                    ></path>
                    <path
                      d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                      fill="#2196F3"
                    ></path>
                    <path
                      d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
                      fill="#FFC107"
                    ></path>
                    <path
                      d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z"
                      fill="#00B060"
                    ></path>
                  </svg>
                  Sign Up with Google
                </button>

                <div className="text-xs mt-8 text-gray-500 flex items-center justify-center gap-2">
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
