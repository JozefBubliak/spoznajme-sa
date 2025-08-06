import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, 
  X, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter,
  Heart,
  Users,
  Home,
  Baby
} from "lucide-react";
import { Header } from "@/components/Header";

interface Question {
  id: string;
  text: string;
  category: 'partneri' | 'kamaráti' | 'rodina' | 'rodič-dieťa';
  status: 1 | 2 | 3; // 1=na úpravu, 2=na zmazanie, 3=schválené
  createdAt: string;
  author?: string;
}

// Demo data pre admin panel
const demoAdminQuestions: Question[] = [
  {
    id: "1",
    text: "Aký je tvoj najkrajší spoločný zážitok z detstva?",
    category: "rodina",
    status: 3,
    createdAt: "2024-01-15",
    author: "System"
  },
  {
    id: "2",
    text: "Čo by si chcel/a, aby sme spoločne vyskúšali?",
    category: "partneri", 
    status: 1,
    createdAt: "2024-01-14",
    author: "Jana N."
  },
  {
    id: "3",
    text: "Nevhodná otázka ktorá sa musí zmazať",
    category: "kamaráti",
    status: 2,
    createdAt: "2024-01-13",
    author: "Anonym"
  }
];

const AdminPanel = () => {
  const [questions, setQuestions] = useState<Question[]>(demoAdminQuestions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionCategory, setNewQuestionCategory] = useState<string>("");

  const statusConfig = {
    1: { label: "Na úpravu", color: "bg-yellow-100 text-yellow-700", icon: Edit },
    2: { label: "Na zmazanie", color: "bg-red-100 text-red-700", icon: Trash2 },
    3: { label: "Schválené", color: "bg-green-100 text-green-700", icon: Check }
  };

  const categoryIcons = {
    'partneri': Heart,
    'kamaráti': Users, 
    'rodina': Home,
    'rodič-dieťa': Baby
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || q.status.toString() === statusFilter;
    const matchesCategory = categoryFilter === "all" || q.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleStatusChange = (questionId: string, newStatus: 1 | 2 | 3) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId ? { ...q, status: newStatus } : q
      )
    );
  };

  const handleQuestionUpdate = (questionId: string, newText: string) => {
    setQuestions(prev =>
      prev.map(q => 
        q.id === questionId ? { ...q, text: newText } : q
      )
    );
    setEditingQuestion(null);
  };

  const handleAddQuestion = () => {
    if (newQuestionText && newQuestionCategory) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: newQuestionText,
        category: newQuestionCategory as any,
        status: 1,
        createdAt: new Date().toISOString().split('T')[0],
        author: "Admin"
      };
      
      setQuestions(prev => [newQuestion, ...prev]);
      setNewQuestionText("");
      setNewQuestionCategory("");
    }
  };

  // Mock admin user
  const adminUser = {
    name: "Admin Používateľ",
    email: "admin@spoznajmesa.sk",
    isAdmin: true,
    isPremium: true
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-background)]">
      <Header user={adminUser} />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Správa otázok a obsahu aplikácie</p>
        </div>

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="questions">Otázky</TabsTrigger>
            <TabsTrigger value="stats">Štatistiky</TabsTrigger>
            <TabsTrigger value="settings">Nastavenia</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-end">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Hľadať otázky
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Zadajte text otázky..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Stav
                    </label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Všetky stavy</SelectItem>
                        <SelectItem value="1">Na úpravu</SelectItem>
                        <SelectItem value="2">Na zmazanie</SelectItem>
                        <SelectItem value="3">Schválené</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Kategória
                    </label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Všetky</SelectItem>
                        <SelectItem value="partneri">Partneri</SelectItem>
                        <SelectItem value="kamaráti">Kamaráti</SelectItem>
                        <SelectItem value="rodina">Rodina</SelectItem>
                        <SelectItem value="rodič-dieťa">Rodič & Dieťa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add New Question */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Pridať novú otázku
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Napíšte text otázky..."
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-4">
                  <Select value={newQuestionCategory} onValueChange={setNewQuestionCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Vyberte kategóriu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="partneri">Partneri</SelectItem>
                      <SelectItem value="kamaráti">Kamaráti</SelectItem>
                      <SelectItem value="rodina">Rodina</SelectItem>
                      <SelectItem value="rodič-dieťa">Rodič & Dieťa</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleAddQuestion}
                    disabled={!newQuestionText || !newQuestionCategory}
                    className="bg-[var(--gradient-warm)] hover:opacity-90"
                  >
                    Pridať otázku
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((question) => {
                const statusInfo = statusConfig[question.status];
                const StatusIcon = statusInfo.icon;
                const CategoryIcon = categoryIcons[question.category];
                
                return (
                  <Card key={question.id} className="transition-all hover:shadow-[var(--shadow-card)]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={statusInfo.color}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusInfo.label}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <CategoryIcon className="w-3 h-3 mr-1" />
                              {question.category}
                            </Badge>
                          </div>
                          
                          {editingQuestion === question.id ? (
                            <div className="space-y-3">
                              <Textarea
                                value={question.text}
                                onChange={(e) => 
                                  setQuestions(prev =>
                                    prev.map(q => 
                                      q.id === question.id ? { ...q, text: e.target.value } : q
                                    )
                                  )
                                }
                                rows={3}
                              />
                              <div className="flex gap-2">
                                <Button 
                                  size="sm"
                                  onClick={() => handleQuestionUpdate(question.id, question.text)}
                                  className="bg-[var(--gradient-warm)] hover:opacity-90"
                                >
                                  Uložiť
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setEditingQuestion(null)}
                                >
                                  Zrušiť
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-foreground leading-relaxed mb-3">
                              {question.text}
                            </p>
                          )}
                          
                          <div className="text-xs text-muted-foreground">
                            Vytvorené: {question.createdAt} • Autor: {question.author}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingQuestion(question.id)}
                            disabled={editingQuestion === question.id}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          
                          <div className="flex flex-col gap-1">
                            <Button
                              size="sm"
                              variant={question.status === 3 ? "default" : "outline"}
                              onClick={() => handleStatusChange(question.id, 3)}
                              className={question.status === 3 ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={question.status === 1 ? "default" : "outline"}
                              onClick={() => handleStatusChange(question.id, 1)}
                              className={question.status === 1 ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={question.status === 2 ? "default" : "outline"}
                              onClick={() => handleStatusChange(question.id, 2)}
                              className={question.status === 2 ? "bg-red-600 hover:bg-red-700" : ""}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-foreground">156</div>
                  <div className="text-sm text-muted-foreground">Celkový počet otázok</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-foreground">12</div>
                  <div className="text-sm text-muted-foreground">Čakajú na schválenie</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-foreground">1,247</div>
                  <div className="text-sm text-muted-foreground">Aktívni používatelia</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Nastavenia aplikácie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nastavenia budú implementované po pripojení Supabase backend-u.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;