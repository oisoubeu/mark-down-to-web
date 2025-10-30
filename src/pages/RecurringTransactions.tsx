import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  generateRecurringTransactions,
  updateRecurringTransactions,
  deleteRecurringTransactions,
} from "@/lib/recurringTransactions";

interface RecurringTransaction {
  id: string;
  name: string;
  amount: number;
  day_of_month: number;
  category_id: string | null;
  type: "income" | "expense";
}

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string | null;
}

export default function RecurringTransactions() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    day_of_month: "1",
    category_id: "",
    type: "expense" as "income" | "expense",
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [recurringResult, categoriesResult] = await Promise.all([
        supabase
          .from("recurring_transactions")
          .select("*")
          .eq("is_active", true)
          .order("name"),
        supabase
          .from("categories")
          .select("*")
          .order("name"),
      ]);

      if (recurringResult.error) throw recurringResult.error;
      if (categoriesResult.error) throw categoriesResult.error;

      setRecurringTransactions((recurringResult.data as RecurringTransaction[]) || []);
      setCategories((categoriesResult.data as Category[]) || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar as transações fixas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      if (editingId) {
        // Update existing
        const { data: updated, error } = await supabase
          .from("recurring_transactions")
          .update({
            name: formData.name,
            amount: Number(formData.amount),
            day_of_month: Number(formData.day_of_month),
            category_id: formData.category_id || null,
            type: formData.type,
          })
          .eq("id", editingId)
          .select()
          .single();

        if (error) throw error;

        await updateRecurringTransactions(
          user.id,
          updated.id,
          updated.name,
          Number(updated.amount),
          Number(updated.day_of_month),
          updated.type as "income" | "expense",
          updated.category_id
        );

        toast({
          title: "Transação fixa atualizada",
          description: "Os extratos do mês atual e próximo foram atualizados.",
        });
      } else {
        // Create new
        const { data: created, error } = await supabase
          .from("recurring_transactions")
          .insert({
            user_id: user.id,
            name: formData.name,
            amount: Number(formData.amount),
            day_of_month: Number(formData.day_of_month),
            category_id: formData.category_id || null,
            type: formData.type,
          })
          .select()
          .single();

        if (error) throw error;

        await generateRecurringTransactions(
          user.id,
          created.id,
          created.name,
          Number(created.amount),
          Number(created.day_of_month),
          created.type as "income" | "expense",
          created.category_id
        );

        toast({
          title: "Transação fixa criada",
          description: "Extratos criados para o mês atual e próximo.",
        });
      }

      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error saving recurring transaction:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a transação fixa.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (transaction: RecurringTransaction) => {
    setFormData({
      name: transaction.name,
      amount: transaction.amount.toString(),
      day_of_month: transaction.day_of_month.toString(),
      category_id: transaction.category_id || "",
      type: transaction.type,
    });
    setEditingId(transaction.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta transação fixa?")) return;

    try {
      setLoading(true);

      await deleteRecurringTransactions(id);

      const { error } = await supabase
        .from("recurring_transactions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Transação fixa excluída",
        description: "Transações futuras também foram removidas.",
      });

      fetchData();
    } catch (error) {
      console.error("Error deleting recurring transaction:", error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a transação fixa.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      amount: "",
      day_of_month: "1",
      category_id: "",
      type: "expense",
    });
    setIsAdding(false);
    setEditingId(null);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Transações Fixas Mensais</h1>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Transação Fixa
            </Button>
          )}
        </div>

        {isAdding && (
          <Card>
            <CardHeader>
              <CardTitle>{editingId ? "Editar" : "Nova"} Transação Fixa</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da Transação</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Conta de Luz"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: "income" | "expense") =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expense">Despesa</SelectItem>
                        <SelectItem value="income">Receita</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Valor (R$)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="day">Dia do Pagamento</Label>
                    <Input
                      id="day"
                      type="number"
                      min="1"
                      max="31"
                      value={formData.day_of_month}
                      onChange={(e) => setFormData({ ...formData, day_of_month: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria (opcional)</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.icon && <span className="mr-2">{category.icon}</span>}
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    {editingId ? "Atualizar" : "Criar"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {recurringTransactions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Nenhuma transação fixa cadastrada ainda.
                </p>
              </CardContent>
            </Card>
          ) : (
            recurringTransactions.map((transaction) => {
              const category = categories.find((c) => c.id === transaction.category_id);
              return (
                <Card key={transaction.id}>
                  <CardContent className="flex items-center justify-between pt-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{transaction.name}</h3>
                        {category && (
                          <span className="text-sm text-muted-foreground">
                            {category.icon} {category.name}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>
                          Valor:{" "}
                          <span
                            className={
                              transaction.type === "income" ? "text-success" : "text-destructive"
                            }
                          >
                            {transaction.type === "income" ? "+" : "-"}R${" "}
                            {Number(transaction.amount).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </span>
                        <span>Dia: {transaction.day_of_month}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(transaction)}>
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(transaction.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
