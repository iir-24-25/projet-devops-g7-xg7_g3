"use client";

import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import React from "react";

// ✅ Définition du type Teacher
type Teacher = {
  id: string;
  name: string;
  email: string;
  subject: string;
};

// ✅ Données d’exemple (tu peux les remplacer par une vraie source de données plus tard)
const teachers: Teacher[] = [
  { id: "1", name: "Alice Dupont", email: "alice@example.com", subject: "Mathématiques" },
  { id: "2", name: "Karim Benyahia", email: "karim@example.com", subject: "Physique" },
  { id: "3", name: "Sophie Morel", email: "sophie@example.com", subject: "Histoire" },
];

// ✅ Fonction pour afficher chaque ligne du tableau
const renderRow = (teacher: Teacher) => (
  <tr
    key={teacher.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="px-4 py-2">{teacher.name}</td>
    <td className="px-4 py-2">{teacher.email}</td>
    <td className="px-4 py-2">{teacher.subject}</td>
  </tr>
);

// ✅ Page principale
const TeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold mb-4">Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Liste des enseignants</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Matière</th>
              </tr>
            </thead>
            <tbody>{teachers.map(renderRow)}</tbody>
          </table>
        </div>

        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
