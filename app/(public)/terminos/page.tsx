import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso de la plataforma Flow State.",
  openGraph: { title: "Términos | Flow State", url: "/terminos" },
};

const SECTIONS = [
  {
    id: "aceptacion",
    title: "1. Aceptación de los términos",
    content: `Al acceder y utilizar la plataforma Flow State ("la Plataforma"), aceptas quedar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con alguno de estos términos, no debes utilizar la Plataforma.

Flow State se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación. El uso continuado de la Plataforma constituye la aceptación de los términos modificados.`,
  },
  {
    id: "cuenta",
    title: "2. Cuenta de usuario",
    content: `Para acceder a determinados servicios de la Plataforma, debes crear una cuenta. Eres responsable de mantener la confidencialidad de tus credenciales de acceso y de todas las actividades realizadas bajo tu cuenta.

Debes proporcionar información precisa y completa al crear tu cuenta. Flow State se reserva el derecho de suspender o cancelar cuentas que incumplan estos términos o que proporcionen información falsa.`,
  },
  {
    id: "contenido",
    title: "3. Contenido y propiedad intelectual",
    content: `Todo el contenido disponible en la Plataforma, incluyendo cursos, vídeos, textos, gráficos y software, está protegido por derechos de autor y otras leyes de propiedad intelectual. Flow State o sus licenciantes son los propietarios de todos los derechos de propiedad intelectual.

Queda prohibida la reproducción, distribución o modificación del contenido sin autorización expresa por escrito de Flow State.`,
  },
  {
    id: "uso-aceptable",
    title: "4. Uso aceptable",
    content: `Te comprometes a utilizar la Plataforma únicamente para fines lícitos y de conformidad con estos términos. En particular, te comprometes a no:

• Compartir tu cuenta con terceros o permitir el acceso no autorizado
• Descargar, copiar o redistribuir el contenido de los cursos
• Utilizar la Plataforma para actividades ilegales o fraudulentas
• Interferir con el funcionamiento normal de la Plataforma
• Publicar contenido ofensivo, difamatorio o que infrinja derechos de terceros`,
  },
  {
    id: "pagos",
    title: "5. Pagos y reembolsos",
    content: `Los precios de los planes de suscripción se muestran en la Plataforma e incluyen los impuestos aplicables. Flow State se reserva el derecho de modificar los precios con un preaviso de 30 días.

Ofrecemos una garantía de devolución de 30 días para el plan Pro. Si no estás satisfecho con el servicio, puedes solicitar un reembolso completo dentro de los primeros 30 días desde tu primera suscripción de pago.`,
  },
  {
    id: "limitacion",
    title: "6. Limitación de responsabilidad",
    content: `Flow State proporciona la Plataforma "tal como está" y no garantiza que el servicio sea ininterrumpido, libre de errores o que cumpla con tus requisitos específicos. En ningún caso Flow State será responsable por daños indirectos, incidentales, especiales o consecuentes.`,
  },
  {
    id: "contacto",
    title: "7. Contacto",
    content: `Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos en: legal@flowstate.academy`,
  },
];

export default function TerminosPage() {
  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      <div className="relative bg-white border-b border-violet-100">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1535] mb-2">Términos y Condiciones</h1>
          <p className="text-sm text-slate-400">Última actualización: 1 de mayo de 2025</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sticky index */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-violet-100 rounded-2xl p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Índice</p>
            <nav className="space-y-2">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="block text-sm text-slate-500 hover:text-primary transition-colors py-1">
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="lg:col-span-3 space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id} className="bg-white border border-violet-100 rounded-2xl p-7">
              <h2 className="text-base font-bold text-[#1a1535] mb-4">{s.title}</h2>
              <div className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{s.content}</div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
