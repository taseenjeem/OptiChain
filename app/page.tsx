import { LoginForm } from "../components/ui/LoginForm";

export default function LandingPage() {
  return (
    <main
      className="flex flex-col min-h-screen w-full items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('/images/login-bg.webp')",
      }}
    >
      <div className="text-white font-bold text-5xl mb-10">
        Log<span className="text-primary">In</span>
      </div>
      <LoginForm />
    </main>
  );
}
