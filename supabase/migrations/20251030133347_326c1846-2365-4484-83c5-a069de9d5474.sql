-- Create recurring_transactions table
CREATE TABLE public.recurring_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  day_of_month INTEGER NOT NULL CHECK (day_of_month >= 1 AND day_of_month <= 31),
  category_id UUID,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.recurring_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own recurring transactions" 
ON public.recurring_transactions 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own recurring transactions" 
ON public.recurring_transactions 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own recurring transactions" 
ON public.recurring_transactions 
FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Users can delete own recurring transactions" 
ON public.recurring_transactions 
FOR DELETE 
USING (user_id = auth.uid());

-- Add trigger for updated_at
CREATE TRIGGER update_recurring_transactions_updated_at
BEFORE UPDATE ON public.recurring_transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add recurring_transaction_id to transactions table to track which transactions were auto-generated
ALTER TABLE public.transactions 
ADD COLUMN recurring_transaction_id UUID REFERENCES public.recurring_transactions(id) ON DELETE SET NULL;

-- Add is_salary flag to transactions
ALTER TABLE public.transactions 
ADD COLUMN is_salary BOOLEAN DEFAULT false;