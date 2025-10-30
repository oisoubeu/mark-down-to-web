import { supabase } from "@/integrations/supabase/client";
import { format, startOfMonth, endOfMonth, addMonths } from "date-fns";
import { getBusinessDay } from "./businessDays";

/**
 * Creates salary transactions for current and next month
 */
export async function generateSalaryTransactions(
  userId: string,
  salaryAmount: number,
  salaryDay: number
) {
  const currentDate = new Date();
  const months = [currentDate, addMonths(currentDate, 1)];
  
  const transactionsToCreate = [];

  for (const month of months) {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    // Check if salary transaction already exists for this month
    const { data: existing } = await supabase
      .from("transactions")
      .select("id")
      .eq("is_salary", true)
      .eq("user_id", userId)
      .gte("date", format(monthStart, "yyyy-MM-dd"))
      .lte("date", format(monthEnd, "yyyy-MM-dd"))
      .maybeSingle();

    if (!existing) {
      // Calculate business day for salary
      const salaryDate = getBusinessDay(month.getFullYear(), month.getMonth(), salaryDay);
      
      transactionsToCreate.push({
        user_id: userId,
        is_salary: true,
        type: "income",
        amount: salaryAmount,
        description: "Salário",
        date: format(salaryDate, "yyyy-MM-dd"),
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
 * Updates salary transactions for current and next month
 */
export async function updateSalaryTransactions(
  userId: string,
  salaryAmount: number,
  salaryDay: number
) {
  const currentDate = new Date();
  const nextMonth = addMonths(currentDate, 1);
  
  const months = [currentDate, nextMonth];
  
  for (const month of months) {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    // Find existing salary transaction for this month
    const { data: existing } = await supabase
      .from("transactions")
      .select("id")
      .eq("is_salary", true)
      .eq("user_id", userId)
      .gte("date", format(monthStart, "yyyy-MM-dd"))
      .lte("date", format(monthEnd, "yyyy-MM-dd"))
      .maybeSingle();

    const salaryDate = getBusinessDay(month.getFullYear(), month.getMonth(), salaryDay);

    if (existing) {
      // Update existing transaction
      await supabase
        .from("transactions")
        .update({
          amount: salaryAmount,
          date: format(salaryDate, "yyyy-MM-dd"),
        })
        .eq("id", existing.id);
    } else {
      // Create new transaction
      await supabase
        .from("transactions")
        .insert({
          user_id: userId,
          is_salary: true,
          type: "income",
          amount: salaryAmount,
          description: "Salário",
          date: format(salaryDate, "yyyy-MM-dd"),
        });
    }
  }
}
