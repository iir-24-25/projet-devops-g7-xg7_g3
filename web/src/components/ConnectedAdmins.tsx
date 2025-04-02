"use client";

import React, { useState, useEffect } from "react";

interface Admin {
  id: number;
  name: string;
  email: string;
  status: "online" | "away" | "offline";
  lastActive: string;
  prenom: string;
  nom: string;
}

interface ApiAdmin {
  nom: string;
  prenom: string;
  email: string;
}

const getRandomColor = () => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ConnectedAdmins = () => {
  const [connectedAdmins, setConnectedAdmins] = useState<Admin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const adminsPerPage = 4;

  useEffect(() => {
    const fetchAdmins = async () => {
      const authToken = localStorage.getItem("authToken");
      const adminId = localStorage.getItem("id");

      try {
        const response = await fetch(`http://localhost:8080/list/admin?id=${adminId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch admins");
        }

        const apiData: ApiAdmin[] = await response.json();
        const transformedAdmins: Admin[] = apiData.map((admin, index) => {
          return {
            id: index + 1,
            name: `${admin.prenom} ${admin.nom}`,
            prenom: admin.prenom,
            nom: admin.nom,
            email: admin.email,
            status: index % 3 === 0 ? "online" : index % 3 === 1 ? "away" : "offline",
            lastActive: index % 3 === 0 ? "Active now" : index % 3 === 1 ? "Away" : `Last seen ${Math.floor(Math.random() * 5) + 1}h ago`,
          };
        });

        setConnectedAdmins(transformedAdmins);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admins:", error);
        setError("Failed to load administrators. Please try again later.");
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const totalPages = Math.ceil(connectedAdmins.length / adminsPerPage);
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = connectedAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 2);

    if (endPage - startPage < 2) {
      startPage = Math.max(1, endPage - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (connectedAdmins.length === 0) return <div className="text-gray-500">No administrators found</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Connected Administrators</h2>
      <ul className="space-y-2">
        {currentAdmins.map((admin) => (
          <li key={admin.id} className="flex items-center gap-4 p-3 border rounded-lg hover:shadow-lg transition">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${getRandomColor()}`}>
              {admin.prenom.charAt(0)}{admin.nom.charAt(0)}
            </div>
            <div>
              <span className="text-sm font-medium text-gray-800">{admin.name}</span>
              <p className="text-xs text-gray-500">{admin.email} - {admin.lastActive}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-1 text-gray-600 disabled:text-gray-400 hover:bg-gray-100 rounded"
        >
          Previous
        </button>

        <div className="flex gap-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-gray-600 disabled:text-gray-400 hover:bg-gray-100 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ConnectedAdmins;
