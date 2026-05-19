import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Cómo Flow State recopila, usa y protege tu información personal.",
  openGraph: { title: "Privacidad | Flow State", url: "/privacidad" },
};

const SECTIONS = [
  {
    id: "introduccion",
    title: "1. Introducción",
    content: `Flow State ("nosotros", "nuestro") se compromete a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información personal cuando utilizas nuestra plataforma.

Al utilizar la Plataforma, consientes la recopilación y el uso de información de acuerdo con esta política.`,
  },
  {
    id: "informacion",
    title: "2. Información que recopilamos",
    content: `Recopilamos los siguientes tipos de información:

Información que nos proporcionas directamente:
• Nombre y dirección de correo electrónico al crear una cuenta
• Información de pago (procesada de forma segura por terceros)
• Contenido que publicas en la comunidad
• Respuestas a encuestas y formularios de contacto

Información recopilada automáticamente:
• Datos de uso de la plataforma (cursos visitados, progreso, tiempo de estudio)
• Información del dispositivo y navegador
• Dirección IP y datos de geolocalización aproximada
• Cookies y tecnologías similares`,
  },
  {
    id: "uso",
    title: "3. Cómo usamos tu información",
    content: `Utilizamos la información recopilada para:

• Proporcionar, mantener y mejorar la Plataforma
• Personalizar tu experiencia de aprendizaje (Flow Score™)
• Procesar transacciones y enviar confirmaciones
• Enviarte actualizaciones sobre tu progreso y nuevos cursos
• Responder a tus consultas y solicitudes de soporte
• Cumplir con obligaciones legales
• Detectar y prevenir fraudes o actividades maliciosas`,
  },
  {
    id: "compartir",
    title: "4. Compartir información",
    content: `No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en los siguientes casos:

• Proveedores de servicios: empresas que nos ayudan a operar la Plataforma (pagos, hosting, analytics) bajo estrictos acuerdos de confidencialidad
• Requisitos legales: cuando sea necesario para cumplir con una obligación legal o proteger los derechos de Flow State
• Con tu consentimiento: en cualquier otro caso, solo compartiremos tu información con tu autorización explícita`,
  },
  {
    id: "cookies",
    title: "5. Cookies y tecnologías de seguimiento",
    content: `Utilizamos cookies y tecnologías similares para mejorar tu experiencia. Puedes configurar tu navegador para rechazar todas las cookies, aunque esto puede afectar a algunas funcionalidades de la Plataforma.

Tipos de cookies que utilizamos:
• Esenciales: necesarias para el funcionamiento básico de la Plataforma
• De rendimiento: nos ayudan a entender cómo se usa la Plataforma
• De funcionalidad: recuerdan tus preferencias
• De marketing: usadas para mostrar contenido relevante`,
  },
  {
    id: "derechos",
    title: "6. Tus derechos",
    content: `Dependiendo de tu ubicación, puedes tener los siguientes derechos sobre tu información personal:

• Acceso: solicitar una copia de los datos que tenemos sobre ti
• Rectificación: corregir información inexacta
• Eliminación: solicitar que eliminemos tus datos personales
• Oposición: oponerte al procesamiento de tus datos
• Portabilidad: recibir tus datos en formato estructurado

Para ejercer estos derechos, contáctanos en: privacidad@flowstate.academy`,
  },
  {
    id: "seguridad",
    title: "7. Seguridad",
    content: `Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger tu información contra accesos no autorizados, pérdidas o alteraciones. Sin embargo, ningún método de transmisión por Internet es 100% seguro.`,
  },
  {
    id: "contacto",
    title: "8. Contacto",
    content: `Si tienes preguntas sobre esta Política de Privacidad o sobre el tratamiento de tus datos personales, puedes contactarnos en: privacidad@flowstate.academy`,
  },
];

export default function PrivacidadPage() {
  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      <div className="relative bg-white border-b border-violet-100">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1535] mb-2">Política de Privacidad</h1>
          <p className="text-sm text-slate-400">Última actualización: 1 de mayo de 2025</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
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
