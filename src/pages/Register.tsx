import { useState } from "react"
import { Leaf, Eye, EyeOff } from "lucide-react"
import { useNav } from "../context/NavigationContext"

export default function Register() {
  const { navigate } = useNav()
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="min-h-full flex bg-white">
      {/* Left */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=1000&fit=crop&auto=format"
          alt="Invernadero agrícola"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-aiden-secondary/85 via-aiden-primary/80 to-aiden-primary/90" />
        <div className="relative z-10 flex flex-col h-full p-12">
          <div className="flex items-center gap-2 mb-auto">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
              <Leaf size={18} className="text-white" />
            </div>
            <span className="font-bold text-white text-2xl" style={{ fontFamily: "DM Sans, sans-serif" }}>AiDEN</span>
          </div>
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Empieza a gestionar tu vivero hoy
            </h2>
            <p className="text-white/75 text-lg leading-relaxed max-w-sm">
              Crea tu cuenta y accede a todas las herramientas operativas de AiDEN.
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col justify-center flex-1 max-w-md w-full mx-auto px-8 py-12">
        <div className="mb-8 lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 bg-aiden-primary rounded-lg flex items-center justify-center">
            <Leaf size={15} className="text-white" />
          </div>
          <span className="font-bold text-aiden-primary text-lg" style={{ fontFamily: "DM Sans, sans-serif" }}>AiDEN</span>
        </div>

        <h1 className="text-3xl font-bold text-aiden-text mb-2" style={{ fontFamily: "DM Sans, sans-serif" }}>
          Crear cuenta
        </h1>
        <p className="text-aiden-muted mb-8 text-sm">
          Completa el formulario para unirte a AiDEN.
        </p>

        <div className="space-y-4">
          <div>
            <label className="aiden-label">Nombre Completo</label>
            <input className="aiden-input" placeholder="María González Torres" />
          </div>

          <div>
            <label className="aiden-label">Correo Electrónico</label>
            <input type="email" className="aiden-input" placeholder="maria@vivero.com" />
          </div>

          <div>
            <label className="aiden-label">Rol</label>
            <select className="aiden-input">
              <option value="">Seleccionar rol...</option>
              <option value="supervisor">Supervisor</option>
              <option value="operario">Operario</option>
            </select>
          </div>

          <div>
            <label className="aiden-label">Contraseña</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="aiden-input pr-10"
                placeholder="Mínimo 8 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-aiden-muted hover:text-aiden-primary transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="aiden-label">Confirmar Contraseña</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="aiden-input pr-10"
                placeholder="Repite tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-aiden-muted hover:text-aiden-primary transition-colors"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input type="checkbox" className="mt-0.5 w-4 h-4 accent-aiden-primary rounded" />
            <span className="text-xs text-aiden-muted leading-relaxed">
              Acepto los{" "}
              <a href="#" className="text-aiden-secondary hover:underline">Términos de Uso</a>{" "}
              y la{" "}
              <a href="#" className="text-aiden-secondary hover:underline">Política de Privacidad</a>{" "}
              de AiDEN.
            </span>
          </div>

          <button
            onClick={() => navigate("login")}
            className="aiden-btn-primary w-full justify-center py-3"
          >
            Crear Cuenta
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-aiden-muted">
          {"¿Ya tienes cuenta? "}
          <button
            onClick={() => navigate("login")}
            className="text-aiden-secondary hover:text-aiden-primary font-medium transition-colors"
          >
            Iniciar Sesión
          </button>
        </p>

        <button
          onClick={() => navigate("landing")}
          className="text-center mt-4 text-xs text-aiden-muted hover:text-aiden-primary transition-colors"
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  )
}
