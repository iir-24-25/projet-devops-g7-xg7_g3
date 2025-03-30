// src/components/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

const ProtectedRoute = ({ children, roles }: { 
  children: React.ReactNode,
  roles?: string[] 
}) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Non authentifié');
        }

        // Vérification supplémentaire si des rôles sont spécifiés
        if (roles) {
          const response = await api.get('/verify-role');
          const userRole = response.data.role;
          if (!roles.includes(userRole)) {
            throw new Error('Accès non autorisé');
          }
        }
      } catch (err) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, roles]);

  return <>{children}</>;
};

export default ProtectedRoute;