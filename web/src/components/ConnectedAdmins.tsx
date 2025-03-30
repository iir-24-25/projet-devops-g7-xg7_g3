"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface Admin {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  lastActive: string;
}

const ConnectedAdmins = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 2;

  // Exemple de données - À remplacer par des données réelles
  const connectedAdmins: Admin[] = [
    {
      id: 1,
      name: "John Doe",
      role: "Super Admin",
      avatar: "/admin1.jpg",
      status: "online",
      lastActive: "Active now"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Administrator",
      avatar: "/admin2.jpg",
      status: "away",
      lastActive: "Away"
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Moderator",
      avatar: "/admin3.jpg",
      status: "offline",
      lastActive: "Last seen 2h ago"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      role: "Administrator",
      avatar: "/admin4.jpg",
      status: "online",
      lastActive: "Active now"
    }
  ];

  const getStatusColor = (status: Admin['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAdminColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'super admin':
        return 'border-blue-400 bg-blue-50';
      case 'administrator':
        return 'border-green-400 bg-green-50';
      case 'moderator':
        return 'border-yellow-400 bg-yellow-50';
      default:
        return 'border-gray-400 bg-gray-50';
    }
  };

  // Calculer les indices pour la pagination
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = connectedAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(connectedAdmins.length / adminsPerPage);

  // Calculer le nombre d'admins en ligne
  const onlineAdmins = connectedAdmins.filter(admin => admin.status === 'online').length;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Connected Administrators</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{onlineAdmins}/{connectedAdmins.length} connecting</span>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </div>

      <div className="space-y-2">
        {currentAdmins.map((admin) => (
          <div
            key={admin.id}
            className={`flex items-center justify-between p-2 rounded-lg border-2 ${getAdminColor(admin.role)} transition-all duration-200`}
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={admin.avatar}
                    alt={admin.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white ${getStatusColor(admin.status)}`}></div>
              </div>
              <div>
                <h3 className="text-xs font-medium text-gray-800">{admin.name}</h3>
                <p className="text-[10px] text-gray-500">{admin.role}</p>
              </div>
            </div>
            <div className="text-[10px] text-gray-500">{admin.lastActive}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 pt-4 border-t flex items-center justify-center gap-4">
        <button 
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
          className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(1)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
              currentPage === 1 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            1
          </button>
          <button 
            onClick={() => setCurrentPage(2)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
              currentPage === 2 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            2
          </button>
        </div>

        <button 
          onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
          className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ConnectedAdmins; 