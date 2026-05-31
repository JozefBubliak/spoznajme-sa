import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/AuthContext";
import { dataApi } from "@/api/dataApi";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getQuestionsForTopic } from "../lib/simpleQuestions";
import { getVisibleQuestions } from "@/lib/quizFlow";
import QuestionRenderer from "../components/QuestionRenderer";

export default function SimpleQuiz() {
  const { slug: rawSlug } = useParams();
  const slug = decodeURIComponent(rawSlug || "");
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const { data: topics = [] } = useQuery({
    queryKey: ["topics"],
    queryFn: () => dataApi.topics.list(),
  });

  const { data: mySession } = useQuery({
    queryKey: ["my-session", user?.id],
    queryFn: async () => {
      return dataApi.sessions.getMine(user.id);
    },
    enabled: !!user,
  });

  const topic = topics.find((t) => t.slug === slug || t.topic_id === slug);
  const perspective = user?.perspective || "neutral";
  const allQuestions = topic ? getQuestionsForTopic(topic, perspective) : [];
  const questions = getVisibleQuestions(allQuestions, answers);

  const saveResponse = useMutation({
    mutationFn: (data) => dataApi.responses.save(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["responses"] });
      setCompleted(true);
      toast.success("Odpovede uložené!");
    },
  });

  const handleAnswer = (value) => {
    const q = questions[step];
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      saveResponse.mutate({
        sessionId: mySession.id,
        topicId: topic.topic_id,
        userId: user.id,
        version: "simple",
        answers,
        completed: true,
      });
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  if (!topic || !mySession) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (completed) {
    return (
      <div className="max-w-lg mx-auto text-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Hotovo!</h2>
        <p className="text-muted-foreground">
          Tvoje odpovede pre <strong>{topic.name_sk}</strong> boli uložené.
        </p>

        {/* Summary */}
        <div className="text-left rounded-xl border border-border bg-card p-5 space-y-3 mt-6">
          <h3 className="font-semibold text-sm">Tvoj prehľad</h3>
          {questions.map((q) => {
            const val = answers[q.id];
            const label = q.options?.find((o) => o.value === val)?.label
              || (Array.isArray(val) ? val.map((v) => q.options?.find((o) => o.value === v)?.label || v).join(", ") : val);
            return (
              <div key={q.id} className="flex justify-between items-start gap-2 text-sm">
                <span className="text-muted-foreground">{q.text}</span>
                <span className="font-medium text-right shrink-0 max-w-[50%]">{label || "—"}</span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 justify-center pt-4">
          <Link to={`/topic/${slug}`}>
            <Button variant="outline">Späť na tému</Button>
          </Link>
          <Link to="/results">
            <Button>Zobraziť porovnanie</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const hasAnswer = answers[currentQ?.id] !== undefined && answers[currentQ?.id] !== "" &&
    !(Array.isArray(answers[currentQ?.id]) && answers[currentQ?.id].length === 0);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Link to={`/topic/${slug}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> {topic.name_sk}
      </Link>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">
            Otázka {step + 1} z {questions.length}
          </span>
          <span className="text-xs text-muted-foreground">Jednoduchá verzia</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div className="min-h-[300px]">
        <QuestionRenderer
          question={currentQ}
          value={answers[currentQ?.id]}
          onChange={handleAnswer}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handlePrev} disabled={step === 0}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Späť
        </Button>
        <Button onClick={handleNext} disabled={!hasAnswer}>
          {step === questions.length - 1 ? "Uložiť" : "Ďalej"}
          {step < questions.length - 1 && <ArrowRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}
