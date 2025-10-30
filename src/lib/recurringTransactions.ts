import { supabase } from "@/integrations/supabase/client";
import { format, startOfMonth, endOfMonth, addMonths } from "date-fns";

interface RecurringTransaction {
  id: string;
  name: string;
  amount: number;
  day_of_month: number;
  category_id: string | null;
  type: "income" | "expense";
}

/**
 * Creates transactions for current and next month based on recurring transaction
 */
export async function generateRecurringTransactions(
  recurringTransaction: RecurringTransaction,
  userId: string
) {
  const currentDate = new Date();
  const months = [currentDate, addMonths(currentDate, 1)];
  
  const transactionsToCreate = [];

  for (const month of months) {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    // Check if transaction already exists for this month
    const { data: existing } = await supabase
      .from("transactions")
      .select("id")
      .eq("recurring_transaction_id", recurringTransaction.id)
      .gte("date", format(monthStart, "yyyy-MM-dd"))
      .lte("date", format(monthEnd, "yyyy-MM-dd"))
      .single();

    if (!existing) {
      // Create transaction date (use day_of_month, or last day if month is shorter)
      const year = month.getFullYear();
      const monthNumber = month.getMonth();
      const lastDayOfMonth = endOfMonth(month).getDate();
      const day = Math.min(recurringTransaction.day_of_month, lastDayOfMonth);
      
      transactionsToCreate.push({
        user_id: userId,
        recurring_transaction_id: recurringTransaction.id,
        type: recurringTransaction.type,
        amount: recurringTransaction.amount,
        description: recurringTransaction.name,
        category_id: recurringTransaction.category_id,
        date: format(new Date(year, monthNumber, day), "yyyy-MM-dd"),
      });
    }
  }

  if (transactionsToCreate.length > 0) {
    const { error } = await supabase
      .from("transactions")
      .insert(transactionsToCreate);
    
    if (error) throw error;
  }
}

/**
 * Updates transactions for current and next month when recurring transaction is edited
 */
export async function updateRecurringTransactions(
  recurringTransaction: RecurringTransaction,
  userId: string
) {
  const currentDate = new Date();
  const nextMonth = addMonths(currentDate, 1);
  
  const months = [currentDate, nextMonth];
  
  for (const month of months) {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    // Find existing transaction for this month
    const { data: existing } = await supabase
      .from("transactions")
      .select("id")
      .eq("recurring_transaction_id", recurringTransaction.id)
      .gte("date", format(monthStart, "yyyy-MM-dd"))
      .lte("date", format(monthEnd, "yyyy-MM-dd"))
      .maybeSingle();

    const year = month.getFullYear();
    const monthNumber = month.getMonth();
    const lastDayOfMonth = endOfMonth(month).getDate();
    const day = Math.min(recurringTransaction.day_of_month, lastDayOfMonth);
    const transactionDate = format(new Date(year, monthNumber, day), "yyyy-MM-dd");

    if (existing) {
      // Update existing transaction
      await supabase
        .from("transactions")
        .update({
          amount: recurringTransaction.amount,
          description: recurringTransaction.name,
          category_id: recurringTransaction.category_id,
          type: recurringTransaction.type,
          date: transactionDate,
        })
        .eq("id", existing.id);
    } else {
      // Create new transaction
      await supabase
        .from("transactions")
        .insert({
          user_id: userId,
          recurring_transaction_id: recurringTransaction.id,
          type: recurringTransaction.type,
          amount: recurringTransaction.amount,
          description: recurringTransaction.name,
          category_id: recurringTransaction.category_id,
          date: transactionDate,
        });
    }
  }
}

/**
 * Deletes all future transactions associated with a recurring transaction
 */
export async function deleteRecurringTransactions(recurringTransactionId: string) {
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  
  await supabase
    .from("transactions")
    .delete()
    .eq("recurring_transaction_id", recurringTransactionId)
    .gte("date", format(monthStart, "yyyy-MM-dd"));
}
