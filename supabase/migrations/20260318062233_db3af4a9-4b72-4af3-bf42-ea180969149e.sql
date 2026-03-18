
-- Create user_companies first (referenced by company_data RLS)
CREATE TABLE public.user_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name text NOT NULL,
  assigned_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, company_name)
);

ALTER TABLE public.user_companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage user_companies"
  ON public.user_companies FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can read own assignments"
  ON public.user_companies FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create company_data
CREATE TABLE public.company_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL UNIQUE,
  compliance_data jsonb NOT NULL DEFAULT '[]'::jsonb,
  registration_data jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

ALTER TABLE public.company_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage company_data"
  ON public.company_data FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can read assigned company_data"
  ON public.company_data FOR SELECT
  TO authenticated
  USING (
    company_name IN (
      SELECT uc.company_name FROM public.user_companies uc WHERE uc.user_id = auth.uid()
    )
  );
