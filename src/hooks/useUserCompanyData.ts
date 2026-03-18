import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { ComplianceRow, RegistrationRow } from '@/types/compliance';

export const useUserCompanyData = () => {
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const [complianceData, setComplianceData] = useState<ComplianceRow[]>([]);
  const [registrationData, setRegistrationData] = useState<RegistrationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignedCompany, setAssignedCompany] = useState<string>('');

  useEffect(() => {
    if (!user || adminLoading) return;
    if (isAdmin) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Get user's assigned companies
        const { data: assignments } = await (supabase as any)
          .from('user_companies')
          .select('company_name')
          .eq('user_id', user.id);

        if (!assignments || assignments.length === 0) {
          setLoading(false);
          return;
        }

        const companyNames = assignments.map((a: any) => a.company_name);
        setAssignedCompany(companyNames[0] || '');

        // Fetch company data
        const { data: companyData } = await (supabase as any)
          .from('company_data')
          .select('compliance_data, registration_data')
          .in('company_name', companyNames);

        if (companyData) {
          const allCompliance: ComplianceRow[] = [];
          const allRegistration: RegistrationRow[] = [];
          companyData.forEach((cd: any) => {
            if (cd.compliance_data) allCompliance.push(...cd.compliance_data);
            if (cd.registration_data) allRegistration.push(...cd.registration_data);
          });
          setComplianceData(allCompliance);
          setRegistrationData(allRegistration);
        }
      } catch (err) {
        console.error('Failed to fetch company data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isAdmin, adminLoading]);

  return { complianceData, registrationData, loading, isAdmin, assignedCompany };
};
