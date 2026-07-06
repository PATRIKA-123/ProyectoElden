import React, { useState, useMemo } from 'react';
import { User, Mail, Phone, Calendar, Edit2, Save, X, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { reservations } = useData();

  const registrationDate = user?.createdAt?.toDate
    ? user.createdAt.toDate()
    : user?.createdAt
    ? new Date(user.createdAt)
    : null;

  const formattedRegistration = registrationDate
    ? registrationDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })
    : null;

  const formattedFullDate = registrationDate
    ? registrationDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Estadísticas de reservas del usuario
  const stats = useMemo(() => {
    if (!user) return { total: 0, month: 0, favorite: '-' };
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    // Solo reservas del usuario
    const userReservations = (reservations as any[]).filter(r => r.userId === user.id);
    // Reservas este mes
    const monthReservations = userReservations.filter(r => {
      const resDate = new Date(r.date);
      return resDate.getMonth() === currentMonth && resDate.getFullYear() === currentYear;
    });
    // Deporte favorito
    const sportCount: Record<string, number> = {};
    userReservations.forEach(r => {
      if (r.sportName) {
        sportCount[r.sportName] = (sportCount[r.sportName] || 0) + 1;
      }
    });
    let favorite = '-';
    let max = 0;
    Object.entries(sportCount).forEach(([sport, count]) => {
      if (count > max) {
        favorite = sport;
        max = count;
      }
    });
    return {
      total: userReservations.length,
      month: monthReservations.length,
      favorite
    };
  }, [reservations, user]);

  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return 'El nombre no puede estar vacío';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Introduce un correo electrónico válido';
    }
    if (formData.phone && !/^[\d\s+()-]{6,20}$/.test(formData.phone)) {
      return 'Introduce un número de teléfono válido';
    }
    return null;
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsSaving(true);

    try {
      if (typeof updateProfile !== 'function') {
        throw new Error(
          'updateProfile no está disponible en AuthContext. Añade esta función al contexto de autenticación.'
        );
      }
      await updateProfile(formData);
      setIsEditing(false);
      setSuccessMessage('Perfil actualizado correctamente');
      // Clear success message after a few seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'No se pudo guardar el perfil. Inténtalo de nuevo.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setError(null);
    setIsEditing(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Perfil de Usuario</h1>

      {successMessage && (
        <div className="mb-6