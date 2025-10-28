import { addDays, isWeekend, startOfMonth, addMonths } from "date-fns";

/**
 * Calcula o n-ésimo dia útil de um mês
 * @param year Ano
 * @param month Mês (0-11)
 * @param businessDay Número do dia útil (1, 2, 3, etc.)
 * @returns Data do n-ésimo dia útil
 */
export function getBusinessDay(year: number, month: number, businessDay: number): Date {
  let currentDate = startOfMonth(new Date(year, month));
  let businessDayCount = 0;

  while (businessDayCount < businessDay) {
    if (!isWeekend(currentDate)) {
      businessDayCount++;
      if (businessDayCount === businessDay) {
        return currentDate;
      }
    }
    currentDate = addDays(currentDate, 1);
  }

  return currentDate;
}

/**
 * Calcula a data do próximo salário baseado no dia útil configurado
 * @param businessDay Número do dia útil (ex: 5 = quinto dia útil)
 * @returns Data do próximo pagamento
 */
export function getNextSalaryDate(businessDay: number): Date {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Tenta o mês atual
  const currentMonthSalaryDate = getBusinessDay(currentYear, currentMonth, businessDay);

  // Se a data já passou, pega o próximo mês
  if (currentMonthSalaryDate > today) {
    return currentMonthSalaryDate;
  }

  // Caso contrário, calcula para o próximo mês
  const nextMonth = addMonths(today, 1);
  return getBusinessDay(nextMonth.getFullYear(), nextMonth.getMonth(), businessDay);
}
