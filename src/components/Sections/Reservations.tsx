import React, { useState } from "react";
import {
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Check,
  X,
  LayoutList,
} from "lucide-react";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";
import { CalendarView } from "../calendar/CalendarView";

// Centralized status mapping for consistency and clean code
const STATUS_MAP: Record<string, string> = {
  "confirmed": "confirmed",
  "pending": "pending",
  "cancelled": "cancelled",
  "completed": "completed",
  "earring": "pending",
  "earing": "pending",
  "pendiente": "pending"
};

interface ReservationsProps {
  onSectionChange?: (section: string) => void;
}

export const Reservations: React.FC<ReservationsProps> = ({
  onSectionChange,
}) => {
  const { user } = useAuth();
  const { reservations, updateReservation } = useData();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");

  // Filter reservations based on user role
  const isAdmin = user?.role === "admin";
  const isEmployee = user?.role === "employee";
  const userReservations =
    isAdmin || isEmployee
      ? reservations
      : reservations.filter((res) => res.userId === user?.id);

  const filteredReservations = userReservations.filter((reservation) => {
    const matchesStatus =
      statusFilter === "all" || normalizeStatus(reservation.status) === statusFilter;
    return matchesStatus;
  });

  // Updated function using the lookup map
  const normalizeStatus = (status: string) => {
    return STATUS_MAP[status.toLowerCase()] || "pending";
  };

  const getStatusIcon = (status: string) => {
    const normalized = normalizeStatus(status);
    switch (normalized) {
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    const normalized = normalizeStatus(status);
    switch (normalized) {
      case "confirmed":
        return "Confirmed";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return normalized;
    }
  };

  const getStatusColor = (status: string) => {
    const normalized = normalizeStatus(status);
    switch (normalized) {
      case "confirmed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "cancelled":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const handleCancelReservation = (reservationId: string) => {
    if (confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
      updateReservation(reservationId, { status: "cancelled" });
    }
  };

  const handleApproveReservation = (reservationId: string) => {
    if (confirm("¿Confirmar esta reserva?")) {
      updateReservation(reservationId, { status: "confirmed" });
    }
  };

  const handleRejectReservation = (reservationId: string) => {
    if (confirm("¿Rechazar esta reserva?")) {
      updateReservation(reservationId, { status: "cancelled" });
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-full md:max-w-3xl lg:max-w-6xl mx-auto">
      {/* Rest of your JSX remains exactly as it was */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-white">
          {isAdmin || isEmployee ? "Gestión de Reservas" : "Mis Reservas"}
        </h1>
        {/* ... (Keep your filter radio buttons as they are) ... */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-2 sm:p-4">
          <div className="text-green-300 text-xs sm:text-sm mb-1 sm:mb-2">Filtros</div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              <input type="radio" id="all-status" name="status" checked={statusFilter === "all"} onChange={() => setStatusFilter("all")} className="text-green-500" />
              <label htmlFor="all-status" className="text-green-200 text-sm">Todas</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" id="pending" name="status" checked={statusFilter === "pending"} onChange={() => setStatusFilter("pending")} className="text-yellow-500" />
              <label htmlFor="pending" className="text-yellow-200 text-sm">Pendientes</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" id="confirmed" name="status" checked={statusFilter === "confirmed"} onChange={() => setStatusFilter("confirmed")} className="text-green-500" />
              <label htmlFor="confirmed" className="text-green-200 text-sm">Confirmadas</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" id="cancelled" name="status" checked={statusFilter === "cancelled"} onChange={() => setStatusFilter("cancelled")} className="text-red-500" />
              <label htmlFor="cancelled" className="text-red-200 text-sm">Canceladas</label>
            </div>
          </div>
        </div>
      </div>git add src/components/reservations/Reservations.tsx
      
      
      {/* ... (Rest of your original code structure) ... */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm p-1 rounded-xl border border-white/10 flex gap-1">
          <button onClick={() => setViewMode("table")} className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 ${viewMode === "table" ? "bg-green-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}>
            <LayoutList className="w-4 h-4" /> <span className="font-bold">Lista</span>
          </button>
          <button onClick={() => setViewMode("calendar")} className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 ${viewMode === "calendar" ? "bg-green-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}>
            <Calendar className="w-4 h-4" /> <span className="font-bold">Calendario</span>
          </button>
        </div>
      </div>

      {viewMode === "calendar" ? (
        <CalendarView isAdminOrEmployee={isAdmin || isEmployee} onMakeReservation={() => onSectionChange?.("canchas")} />
      ) : (
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm bg-transparent">
              {/* ... (Keep your original table headers and mapping here) ... */}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};