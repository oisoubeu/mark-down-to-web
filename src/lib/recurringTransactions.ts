import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, endOfMonth, addMonths } from "date-fns";
import { formatDateForDB, getCurrentDateInCuiaba } from "./dateUtils";

/**
 * Creates transactions for current and next month based on recurring transaction
 */
export async function generateRecurringTransactions(
  userId: string,
  recurringId: string,
  name: string,
  amount: number,
  dayOfMonth: number,
  type: "income" | "expense",
  categoryId: string | null
) {
  const currentDate = getCurrentDateInCuiaba();
  const months = [currentDate, addMonths(currentDate, 1)];
  
  const transactionsToCreate = [];

  for (const month of months) {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    // Check if transaction already exists for this month
    const { data: existing } = await supabase
      .from("transactions")
      .select("id")
      .eq("recurring_transaction_id", recurringId)
      .eq("user_id", userId)
      .gte("date", formatDateForDB(monthStart))
      .lte("date", formatDateForDB(monthEnd))
      .maybeSingle();

    if (!existing) {
      // Create transaction date (use day_of_month, or last day if month is shorter)
      const year = month.getFullYear();
      const monthNumber = month.getMonth();
      const lastDayOfMonth = endOfMonth(month).getDate();
      const day = Math.min(dayOfMonth, lastDayOfMonth);
      const transactionDate = new Date(year, monthNumber, day);
      
      transactionsToCreate.push({
        user_id: userId,
        recurring_transaction_id: recurringId,
        type: type,
        amount: amount,
        description: name,
        date: formatDateForDB(transactionDate),
        category_id: categoryId,
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
  userId: string,
  recurringId: string,
  name: string,
  amount: number,
  dayOfMonth: number,
  type: "income" | "expense",
  categoryId: string | null
) {
  const currentDate = getCurrentDateInCuiaba();
  const nextMonth = addMonths(currentDate, 1);
  
  const months = [currentDate, nextMonth];
  
  for (const month of months) {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    // Find existing transaction for this month
    const { data: existing } = await supabase
      .from("transactions")
      .select("id")
      .eq("recurring_transaction_id", recurringId)
      .eq("user_id", userId)
      .gte("date", formatDateForDB(monthStart))
      .lte("date", formatDateForDB(monthEnd))
      .maybeSingle();

    const year = month.getFullYear();
    const monthNumber = month.getMonth();
    const lastDayOfMonth = endOfMonth(month).getDate();
    const day = Math.min(dayOfMonth, lastDayOfMonth);
    const transactionDate = new Date(year, monthNumber, day);

    if (existing) {
      // Update existing transaction
      await supabase
        .from("transactions")
        .update({
          amount: amount,
          description: name,
          date: formatDateForDB(transactionDate),
          category_id: categoryId,
        })
        .eq("id", existing.id);
    } else {
      // Create new transaction
      await supabase
        .from("transactions")
        .insert({
          user_id: userId,
          recurring_transaction_id: recurringId,
          type: type,
          amount: amount,
          description: name,
          date: formatDateForDB(transactionDate),
          category_id: categoryId,
        });
    }
  }
}

/**
 * Deletes all future transactions associated with a recurring transaction
 */
export async function deleteRecurringTransactions(recurringTransactionId: string) {
  const currentDate = getCurrentDateInCuiaba();
  const monthStart = startOfMonth(currentDate);
  
  await supabase
    .from("transactions")
    .delete()
    .eq("recurring_transaction_id", recurringTransactionId)
    .gte("date", formatDateForDB(monthStart));
}
