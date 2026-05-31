import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PageNotFound() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md text-center space-y-5">
        <h1 className="text-7xl font-light text-slate-300">404</h1>
        <h2 className="text-2xl font-medium text-slate-800">Stránka sa nenašla</h2>
        <p className="text-slate-600">Cesta <strong>{location.pathname}</strong> v aplikácii neexistuje.</p>
        <Link to="/"><Button>Späť domov</Button></Link>
      </div>
    </div>
  );
}
