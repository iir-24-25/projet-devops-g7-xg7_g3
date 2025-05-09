"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  CalendarDays,
  ClipboardList,
  Search,
  GraduationCap,
  Building,
  ChevronDown,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Assignment {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  teacher: string;
  dueDate: string;
  branch: string;
  level: string;
  submitted: number;
  notSubmitted: number;
  total: number;
  category: string;
  seance: string; // Added seance to the interface
}

export function CurrentAssignments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAssignment, setExpandedAssignment] = useState<number | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const assignmentsPerView = isMobile ? 1 : 2;

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Function to map session codes to time slots
  const getSessionTime = (seance: string): string => {
    switch (seance) {
      case "S1":
        return "8:30 AM - 10:00 AM";
      case "S2":
        return "10:15 AM - 11:45 AM";
      case "S3":
        return "12:00 PM - 1:30 PM";
      case "S4":
        return "2:00 PM - 3:30 PM";
      case "S5":
        return "3:45 PM - 5:15 PM";
      case "S6":
        return "5:30 PM - 7:00 PM";
      default:
        return seance; // Return the raw value if no match
    }
  };

  // Fetch assignments from API
  useEffect(() => {
    const fetchAssignments = async () => {
      const authToken = localStorage.getItem("authToken");
      const profId = localStorage.getItem("id");

      if (!authToken || !profId) {
        setError("No authentication token or professor ID found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/module/professeur?id=${profId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(`Failed to fetch assignments: ${response.status}`);

        const data = await response.json();

        // Map API data to Assignment interface with session time condition
        const mappedAssignments: Assignment[] = data.map((item: any, index: number) => ({
          id: index + 1,
          title: item.titre,
          subtitle: `${item.filiere} - ${item.niveau}`,
          description: `Session ${item.seance} (${getSessionTime(item.seance)}) in room ${item.salle} on ${item.jour.toLowerCase()} for semester ${item.semestre.toLowerCase()}.`,
          teacher: `${item.prenom} ${item.nom}`,
          dueDate: item.jour,
          branch: item.filiere,
          level: item.niveau.replace("NIVEAU_", "Level "),
          submitted: 0, // Placeholder
          notSubmitted: 0, // Placeholder
          total: 0, // Placeholder
          category: "module",
          seance: item.seance, // Store seance separately
        }));

        setAssignments(mappedAssignments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Filter assignments based on search term
  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredAssignments.length / assignmentsPerView);

  // Get current visible assignments
  const visibleAssignments = filteredAssignments.slice(currentIndex, currentIndex + assignmentsPerView);

  // Navigate to next assignments
  const nextAssignments = () => {
    if (currentIndex + assignmentsPerView < filteredAssignments.length) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + assignmentsPerView);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Navigate to previous assignments
  const prevAssignments = () => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - assignmentsPerView);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Toggle expanded state for an assignment
  const toggleExpand = (id: number) => {
    setExpandedAssignment(expandedAssignment === id ? null : id);
  };

  // Open assignment details modal
  const openAssignmentDetails = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
  };

  // Close assignment details modal
  const closeAssignmentDetails = () => {
    setSelectedAssignment(null);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <Card className="shadow-lg border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex flex-col w-full mb-0">
      <CardHeader className="flex flex-col space-y-3 pb-2 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-blue-800 dark:text-blue-300">
            <div className="p-2 bg-blue-600 text-white rounded-lg shadow-md">
              <ClipboardList className="h-5 w-5" strokeWidth={2} />
            </div>
            Current Assignments
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="hidden sm:inline">View All</span>
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search assignments..."
            className="pl-10 border-blue-200 dark:border-blue-800 focus:border-blue-400 dark:focus:border-blue-600 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevAssignments}
            disabled={currentIndex === 0}
            className={cn(
              "h-8 w-8 p-0 rounded-full",
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-50 dark:hover:bg-blue-900/30",
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  Math.floor(currentIndex / assignmentsPerView) === index
                    ? "w-4 bg-blue-500"
                    : "w-2 bg-gray-300 dark:bg-gray-600",
                )}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextAssignments}
            disabled={currentIndex + assignmentsPerView >= filteredAssignments.length}
            className={cn(
              "h-8 w-8 p-0 rounded-full",
              currentIndex + assignmentsPerView >= filteredAssignments.length
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-50 dark:hover:bg-blue-900/30",
            )}
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300",
            isTransitioning ? "opacity-0" : "opacity-100",
          )}
        >
          {visibleAssignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="overflow-hidden shadow-md border-0 transition-all duration-300 hover:shadow-lg"
            >
              <div className={`h-2 ${assignment.category === "design" ? "bg-purple-500" : "bg-blue-500"} w-full`}></div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg line-clamp-1" title={assignment.title}>
                      {assignment.title}
                    </h3>
                    <Badge variant="outline" className="ml-2 flex-shrink-0">
                      {assignment.level.split(" - ")[0]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2" title={assignment.subtitle}>
                    {assignment.subtitle}
                  </p>

                  <div
                    className={cn(
                      "text-sm text-muted-foreground transition-all duration-300",
                      expandedAssignment === assignment.id ? "" : "line-clamp-2",
                    )}
                  >
                    {assignment.description}
                  </div>

                  {assignment.description.length > 120 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-blue-600 dark:text-blue-400 -mt-1"
                      onClick={() => toggleExpand(assignment.id)}
                    >
                      {expandedAssignment === assignment.id ? (
                        <span className="flex items-center">
                          Show less <ChevronDown className="h-4 w-4 ml-1 rotate-180" />
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Read more <ChevronDown className="h-4 w-4 ml-1" />
                        </span>
                      )}
                    </Button>
                  )}

                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" strokeWidth={2} />
                    <span className="text-sm font-medium truncate" title={assignment.teacher}>
                      {assignment.teacher}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1">
                      <CalendarDays
                        className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0"
                        strokeWidth={2}
                      />
                      <span className="text-sm text-muted-foreground">
                        Due: {assignment.dueDate} ({getSessionTime(assignment.seance)})
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" strokeWidth={2} />
                      <span className="text-sm text-muted-foreground truncate" title={assignment.branch}>
                        Branch: {assignment.branch}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 pt-3 mt-3 border-t">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-xs font-medium text-blue-600 dark:text-blue-300">
                        {assignment.submitted}
                      </div>
                      <span className="text-xs text-muted-foreground">Submitted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900 text-xs font-medium text-orange-600 dark:text-orange-300">
                        {assignment.notSubmitted}
                      </div>
                      <span className="text-xs text-muted-foreground">Not Submitted</span>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                      style={{
                        width: assignment.total > 0 ? `${(assignment.submitted / assignment.total) * 100}%` : "0%",
                      }}
                    ></div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 text-blue-600 dark:text-blue-400"
                    onClick={() => openAssignmentDetails(assignment)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing {currentIndex + 1}-{Math.min(currentIndex + assignmentsPerView, filteredAssignments.length)} of{" "}
              {filteredAssignments.length} assignments
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>

      {selectedAssignment && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeAssignmentDetails}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-blue-100 dark:border-blue-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300">{selectedAssignment.title}</h2>
              <Button variant="ghost" size="icon" onClick={closeAssignmentDetails} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                <p className="text-sm">{selectedAssignment.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Teacher</h3>
                  <p className="text-sm font-medium">{selectedAssignment.teacher}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Due Date</h3>
                  <p className="text-sm font-medium">{selectedAssignment.dueDate} ({getSessionTime(selectedAssignment.seance)})</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Branch</h3>
                  <p className="text-sm font-medium">{selectedAssignment.branch}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Level</h3>
                  <p className="text-sm font-medium">{selectedAssignment.level}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Submission Status</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">
                    Submitted: {selectedAssignment.submitted}/{selectedAssignment.total}
                  </span>
                  <span className="text-sm">
                    Not Submitted: {selectedAssignment.notSubmitted}/{selectedAssignment.total}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                    style={{
                      width: selectedAssignment.total > 0 ? `${(selectedAssignment.submitted / selectedAssignment.total) * 100}%` : "0%",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={closeAssignmentDetails}>
                Close
              </Button>
              <Button>Submit Assignment</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}