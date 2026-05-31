import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import { absoluteAppUrl, appPath } from "@/lib/app-url";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Heslá sa nezhodujú");
      return;
    }
    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: absoluteAppUrl("/app") },
      });
      if (signUpError) throw signUpError;
      if (data.session) window.location.href = appPath("/app");
      else setSent(true);
    } catch (signUpError) {
      setError(signUpError.message || "Registrácia zlyhala");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: absoluteAppUrl("/app") },
    });
    if (oauthError) setError(oauthError.message);
  };

  if (sent) {
    return (
      <AuthLayout icon={Mail} title="Skontroluj si e-mail" subtitle={`Potvrdzovací odkaz sme poslali na ${email}`}>
        <p className="text-sm text-center text-muted-foreground">
          Po potvrdení adresy sa môžeš prihlásiť a vytvoriť párovú reláciu.
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={UserPlus}
      title="Vytvor si účet"
      subtitle="Bezpečný priestor pre vás oboch"
      footer={<Link to="/login" className="text-primary font-medium hover:underline">Už máš účet? Prihlás sa</Link>}
    >
      <Button variant="outline" className="w-full h-12 mb-6" onClick={handleGoogle}>
        <GoogleIcon className="w-5 h-5 mr-2" /> Pokračovať cez Google
      </Button>
      {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Heslo</Label>
          <Input id="password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Potvrď heslo</Label>
          <Input id="confirm" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
        </div>
        <Button type="submit" className="w-full h-12" disabled={loading}>
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Vytváram účet...</> : "Vytvoriť účet"}
        </Button>
      </form>
    </AuthLayout>
  );
}
