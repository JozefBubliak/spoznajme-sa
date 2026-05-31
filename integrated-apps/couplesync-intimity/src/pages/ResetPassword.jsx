import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Heslá sa nezhodujú");
      return;
    }
    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw updateError;
      setDone(true);
    } catch (updateError) {
      setError(updateError.message || "Zmena hesla zlyhala");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <AuthLayout icon={Lock} title="Heslo je zmenené" subtitle="Môžeš pokračovať do aplikácie">
        <Link to="/app"><Button className="w-full">Pokračovať</Button></Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout icon={Lock} title="Nové heslo" subtitle="Zadaj svoje nové heslo">
      {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Nové heslo</Label>
          <Input id="password" type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Potvrď heslo</Label>
          <Input id="confirm" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mením heslo...</> : "Zmeniť heslo"}
        </Button>
      </form>
    </AuthLayout>
  );
}
