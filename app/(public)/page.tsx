import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { env } from "@/lib/env";
import Link from "next/link";

interface featureProps {
  title: string;
  description: string;
  icon: string;
}

const features: featureProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carefully curated courses designed by industry experts.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assignments to enhance your learning experience.",
    icon: "🎮",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress and achievements with detailed analytics and personalized dashboards.",
    icon: "📊",
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and instructors to collaborate and share knowledge.",
    icon: "👥",
  },
];

export default function Home() {
  // Debug: Crear lista de todas las variables de entorno
  const envVars = [
    { name: "DATABASE_URL", value: env.DATABASE_URL, sensitive: true },
    { name: "BETTER_AUTH_SECRET", value: env.BETTER_AUTH_SECRET, sensitive: true },
    { name: "BETTER_AUTH_URL", value: env.BETTER_AUTH_URL, sensitive: false },
    { name: "AUTH_GITHUB_CLIENT_ID", value: env.AUTH_GITHUB_CLIENT_ID, sensitive: false },
    { name: "AUTH_GITHUB_SECRET", value: env.AUTH_GITHUB_SECRET, sensitive: true },
    { name: "RESEND_API_KEY", value: env.RESEND_API_SECRET_KEY, sensitive: true },
    { name: "ARCJET_KEY", value: env.ARCJET_KEY, sensitive: true },
    { name: "AWS_ACCESS_KEY_ID", value: env.AWS_ACCESS_KEY_ID, sensitive: true },
    { name: "AWS_SECRET_ACCESS_KEY", value: env.AWS_SECRET_ACCESS_KEY, sensitive: true },
    { name: "AWS_ENDPOINT_URL_S3", value: env.AWS_ENDPOINT_URL_S3, sensitive: false },
    { name: "AWS_ENDPOINT_URL_IAM", value: env.AWS_ENDPOINT_URL_IAM, sensitive: false },
    { name: "AWS_REGION", value: env.AWS_REGION, sensitive: false },
    { name: "STRIPE_SECRET_KEY", value: env.STRIPE_SECRET_KEY, sensitive: true },
    { name: "STRIPE_WEBHOOK_SECRET", value: env.STRIPE_WEBHOOK_SECRET, sensitive: true },
    { name: "NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES", value: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES, sensitive: false },
  ];

  const maskSensitive = (value: string | undefined, sensitive: boolean) => {
    if (!value) return "❌ undefined";
    if (value === "") return "⚠️ empty string";
    if (sensitive && value.length > 8) {
      return `${value.substring(0, 4)}...${value.substring(value.length - 4)} (${value.length} chars)`;
    }
    return value;
  };

  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="outline">The Future of Online Education</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover a new way to learn with our modern, interactive learning
            management system. Access high-quality courses anytime, anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              className={buttonVariants({
                size: "lg",
              })}
              href="/courses"
            >
              Explore Courses
            </Link>

            <Link
              className={buttonVariants({
                size: "lg",
                variant: "outline",
              })}
              href="/login"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* DEBUG SECTION - SOLO EN DESARROLLO */}
      {process.env.NODE_ENV === "development" && (
        <section className="mb-16">
          <Card className="border-red-500 border-2">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                🔧 DEBUG: Variables de Entorno
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Esta sección solo es visible en desarrollo
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {envVars.map((envVar, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <code className="font-mono text-sm font-semibold min-w-[280px]">
                      {envVar.name}:
                    </code>
                    <code className="font-mono text-xs flex-1 break-all">
                      {maskSensitive(envVar.value, envVar.sensitive)}
                    </code>
                    <Badge
                      variant={
                        envVar.value === undefined
                          ? "destructive"
                          : envVar.value === ""
                          ? "secondary"
                          : "default"
                      }
                      className="text-xs"
                    >
                      {envVar.value === undefined
                        ? "NOT SET"
                        : envVar.value === ""
                        ? "EMPTY"
                        : "OK"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}