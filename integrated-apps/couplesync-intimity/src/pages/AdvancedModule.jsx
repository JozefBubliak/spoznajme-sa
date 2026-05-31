import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/AuthContext";
import { dataApi } from "@/api/dataApi";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Info, Loader2 } from "lucide-react";
import { toast } from "sonner";
import QuestionRenderer from "@/components/QuestionRenderer";
import { generateQuestionSections } from "@/lib/questionGenerator";
import { getVisibleQuestions } from "@/lib/quizFlow";

export default function AdvancedModule() {
  const { slug: rawSlug } = useParams();
  const topicId = decodeURIComponent(rawSlug || "");
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const { data: topics = [], isLoading: loadingTopics } = useQuery({
    queryKey: ["topics"],
    queryFn: () => dataApi.topics.list(),
  });
  const { data: mySession, isLoading: loadingSession } = useQuery({
    queryKey: ["my-session", user?.id],
    queryFn: () => dataApi.sessions.getMine(user.id),
    enabled: !!user,
  });

  const topic = topics.find((item) => item.topic_id === topicId || item.slug === topicId);
  const sections = useMemo(
    () => topic ? generateQuestionSections(topic, user?.perspective || "neutral", "advanced") : [],
    [topic, user?.perspective],
  );
  const allQuestions = sections.flatMap((section) => section.questions);
  const questions = getVisibleQuestions(allQuestions, answers);
  const currentQuestion = questions[step];
  const currentSection = sections.find((section) => section.questions.some((question) => question.id === currentQuestion?.id));
  const progress = questions.length ? ((step + 1) / questions.length) * 100 : 0;

  const saveResponse = useMutation({
    mutationFn: (data) => dataApi.responses.save(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["responses"] });
      setCompleted(true);
      toast.success("Rozšírený modul dokončený!");
    },
    onError: (error) => toast.error(error.message),
  });

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }
    saveResponse.mutate({
      sessionId: mySession.id,
      topicId: topic.topic_id,
      userId: user.id,
      version: "advanced",
      answers,
    });
  };

  if (loadingTopics || loadingSession) {
    return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  }
  if (!topic || !mySession || !topic.advanced_enabled || questions.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <p className="text-muted-foreground mb-4">Rozšírený modul pre túto tému ešte nie je dostupný.</p>
        <Link to={`/topic/${encodeURIComponent(topicId)}`}><Button variant="outline">Späť</Button></Link>
      </div>
    );
  }
  if (completed) {
    return (
      <div className="max-w-lg mx-auto text-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Modul dokončený!</h2>
        <p className="text-muted-foreground">Tvoje odpovede pre <strong>{topic.name_sk}</strong> boli uložené.</p>
        <Link to="/results"><Button>Zobraziť porovnanie</Button></Link>
      </div>
    );
  }
  if (showIntro) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <Link to={`/topic/${encodeURIComponent(topic.topic_id)}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeft className="w-4 h-4" /> Späť
        </Link>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-4">
          <div className="flex items-center gap-2"><Info className="w-5 h-5 text-primary" /><h2 className="text-xl font-bold">{topic.name_sk}</h2></div>
          <p className="text-sm text-muted-foreground">Hĺbkový modul je zostavený z blokov vhodných pre túto tému.</p>
          {sections.map((section) => <p key={section.id} className="text-sm">{section.title} <span className="text-muted-foreground">({section.questions.length})</span></p>)}
        </div>
        <Button className="w-full" onClick={() => setShowIntro(false)}>Začať modul <ArrowRight className="w-4 h-4 ml-1" /></Button>
      </div>
    );
  }

  const answer = answers[currentQuestion.id];
  const hasAnswer = answer !== undefined && answer !== "" && !(Array.isArray(answer) && answer.length === 0);
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <Progress value={progress} className="h-1.5 mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{currentSection?.title || "Téma"} · otázka {step + 1}/{questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
      <div className="min-h-[280px]">
        <QuestionRenderer question={currentQuestion} value={answer} onChange={(value) => setAnswers((previous) => ({ ...previous, [currentQuestion.id]: value }))} />
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Späť
        </Button>
        <Button onClick={handleNext} disabled={currentQuestion.type !== "textarea" && !hasAnswer}>
          {step === questions.length - 1 ? "Dokončiť" : "Ďalej"}
          {step < questions.length - 1 && <ArrowRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}
