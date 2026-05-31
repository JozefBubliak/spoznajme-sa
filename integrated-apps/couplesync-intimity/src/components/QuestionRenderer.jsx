import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function QuestionRenderer({ question, value, onChange }) {
  if (question.type === "radio") {
    return (
      <div className="space-y-3">
        <p className="font-medium text-base">{question.text}</p>
        {question.subtitle && <p className="text-sm text-muted-foreground -mt-1">{question.subtitle}</p>}
        <RadioGroup value={value || ""} onValueChange={onChange}>
          {question.options.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                value === opt.value
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/30 hover:bg-secondary/50"
              )}
            >
              <RadioGroupItem value={opt.value} />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>
    );
  }

  if (question.type === "checkbox") {
    const selected = value || [];
    const toggle = (val) => {
      const next = selected.includes(val)
        ? selected.filter((v) => v !== val)
        : [...selected, val];
      onChange(next);
    };
    return (
      <div className="space-y-3">
        <p className="font-medium text-base">{question.text}</p>
        {question.subtitle && <p className="text-sm text-muted-foreground -mt-1">{question.subtitle}</p>}
        {question.options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
              selected.includes(opt.value)
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/30 hover:bg-secondary/50"
            )}
          >
            <Checkbox checked={selected.includes(opt.value)} onCheckedChange={() => toggle(opt.value)} />
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "scale") {
    const max = question.max || 5;
    const labels = question.labels || {};
    return (
      <div className="space-y-3">
        <p className="font-medium text-base">{question.text}</p>
        {question.subtitle && <p className="text-sm text-muted-foreground -mt-1">{question.subtitle}</p>}
        <div className="flex gap-2 justify-center">
          {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={cn(
                "w-10 h-10 rounded-full border-2 font-medium text-sm transition-all",
                value === n
                  ? "border-primary bg-primary text-primary-foreground scale-110"
                  : "border-border hover:border-primary/40 hover:bg-secondary"
              )}
            >
              {n}
            </button>
          ))}
        </div>
        {(labels.min || labels.max) && (
          <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>{labels.min || ""}</span>
            <span>{labels.max || ""}</span>
          </div>
        )}
      </div>
    );
  }

  if (question.type === "textarea") {
    return (
      <div className="space-y-3">
        <p className="font-medium text-base">{question.text}</p>
        {question.subtitle && <p className="text-sm text-muted-foreground -mt-1">{question.subtitle}</p>}
        <Textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder || "Napíš sem..."}
          className="min-h-[100px] resize-none"
        />
      </div>
    );
  }

  return null;
}
