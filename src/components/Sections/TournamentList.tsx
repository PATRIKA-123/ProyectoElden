import React, { useState } from "react";
import { Trophy, Star, Plus, Calendar, MapPin, X } from "lucide-react";

type Tournament = {
  id: number;
  name: string;
  sport: string;
  date: string;
  status: "Upcoming" | "Ongoing" | "Completed";
};

type SpecialEvent = {
  id: number;
  name: string;
  category: string;
  date: string;
  location: string;
  status: "Upcoming" | "Ongoing" | "Completed";
};

const statusStyles: Record<string, string> = {
  Upcoming: "bg-blue-500/20 text-blue-400",
  Ongoing: "bg-green-500/20 text-green-400",
  Completed: "bg-gray-500/20 text-gray-400",
};

export const TournamentList = () => {
  // ADDED: tab state to switch between Tournaments and Special Events
  const [activeTab, setActiveTab] = useState<"tournaments" | "events">("tournaments");

  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: 1,
      name: "Summer Cup 2026",
      sport: "Football",
      date: "10 Jun – 15 Jun",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Weekend League",
      sport: "Cricket",
      date: "01 Feb – 05 Feb",
      status: "Ongoing",
    },
  ]);

  // ADDED: separate state for special events
  const [events, setEvents] = useState<SpecialEvent[]>([
    {
      id: 1,
      name: "Community Sports Day",
      category: "Community",
      date: "20 Jul – 20 Jul",
      location: "Main Complex",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Youth Training Camp",
      category: "Workshop",
      date: "05 Aug – 09 Aug",
      location: "Field 3",
      status: "Upcoming",
    },
  ]);

  const [showCreate, setShowCreate] = useState(false);
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);
  // ADDED: separate selection state for events
  const [selectedEvent, setSelectedEvent] = useState<SpecialEvent | null>(null);

  // Create tournament
  const handleCreateTournament = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newTournament: Tournament = {
      id: Date.now(),
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      sport: (form.elements.namedItem("sport") as HTMLInputElement).value,
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
      status: "Upcoming",
    };

    setTournaments([...tournaments, newTournament]);
    setShowCreate(false);
    form.reset();
  };

  // ADDED: create special event
  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newEvent: SpecialEvent = {
      id: Date.now(),
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      category: (form.elements.namedItem("category") as HTMLInputElement).value,
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
      location: (form.elements.namedItem("location") as HTMLInputElement).value,
      status: "Upcoming",
    };

    setEvents([...events, newEvent]);
    setShowCreate(false);
    form.reset();
  };

  // DETAILS VIEW — Tournament
  if (selectedTournament) {
    return (
      <div className="p-6">
        <button
          onClick={() => setSelectedTournament(null)}
          className="text-green-400 mb-4 hover:underline"
        >
          ← Back to tournaments
        </button>

        <h1 className="text-2xl font-bold text-white mb-2">
          {selectedTournament.name}
        </h1>

        <div className="text-gray-400 space-y-2">
          <p>
            <strong className="text-gray-300">Sport:</strong>{" "}
            {selectedTournament.sport}
          </p>
          <p>
            <strong className="text-gray-300">Date:</strong>{" "}
            {selectedTournament.date}
          </p>
          <p>
            <strong className="text-gray-300">Status:</strong>{" "}
            {selectedTournament.status}
          </p>
        </div>
      </div>
    );
  }

  // ADDED: DETAILS VIEW — Special Event
  if (selectedEvent) {
    return (
      <div className="p-6">
        <button
          onClick={() => setSelectedEvent(null)}
          className="text-green-400 mb-4 hover:underline"
        >
          ← Back to special events
        </button>

        <h1 className="text-2xl font-bold text-white mb-2">
          {selectedEvent.name}
        </h1>

        <div className="text-gray-400 space-y-2">
          <p>
            <strong className="text-gray-300">Category:</strong>{" "}
            {selectedEvent.category}
          </p>
          <p>
            <strong className="text-gray-300">Date:</strong>{" "}
            {selectedEvent.date}
          </p>
          <p>
            <strong className="text-gray-300">Location:</strong>{" "}
            {selectedEvent.location}
          </p>
          <p>
            <strong className="text-gray-300">Status:</strong>{" "}
            {selectedEvent.status}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Tournaments & Events
          </h1>
          <p className="text-gray-400 text-sm">
            Manage and view all tournaments and special events
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          {activeTab === "tournaments" ? "Create Tournament" : "Create Event"}
        </button>
      </div>

      {/* ADDED: Tab switcher */}
      <div className="flex gap-2 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("tournaments")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "tournaments"
              ? "border-green-400 text-green-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Trophy className="w-4 h-4" />
          Tournaments
        </button>
        <button
          onClick={() => setActiveTab("events")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "events"
              ? "border-green-400 text-green-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Star className="w-4 h-4" />
          Special Events
        </button>
      </div>

      {/* Tournaments Tab */}
      {activeTab === "tournaments" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tournaments.map((t) => (
            <div
              key={t.id}
              className="bg-gray-800 rounded-xl p-4 hover:shadow-lg"
            >
              <div className="flex justify-between mb-2">
                <h2 className="text-lg text-white font-semibold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-400" />
                  {t.name}
                </h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusStyles[t.status]}`}
                >
                  {t.status}
                </span>
              </div>

              <p className="text-gray-400 text-sm">
                <strong className="text-gray-300">Sport:</strong> {t.sport}
              </p>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {t.date}
              </p>

              <button
                onClick={() => setSelectedTournament(t)}
                className="mt-4 text-green-400 hover:text-green-300 text-sm"
              >
                View details →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ADDED: Special Events Tab */}
      {activeTab === "events" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-gray-800 rounded-xl p-4 hover:shadow-lg"
            >
              <div className="flex justify-between mb-2">
                <h2 className="text-lg text-white font-semibold flex items-center gap-2">
                  <Star className="w-5 h-5 text-green-400" />
                  {ev.name}
                </h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusStyles[ev.status]}`}
                >
                  {ev.status}
                </span>
              </div>

              <p className="text-gray-400 text-sm">
                <strong className="text-gray-300">Category:</strong> {ev.category}
              </p>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {ev.date}
              </p>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {ev.location}
              </p>

              <button
                onClick={() => setSelectedEvent(ev)}
                className="mt-4 text-green-400 hover:text-green-300 text-sm"
              >
                View details →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CREATE MODAL — Tournament */}
      {showCreate && activeTab === "tournaments" && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <form
            onSubmit={handleCreateTournament}
            className="bg-gray-900 p-6 rounded-xl w-full max-w-md relative"
          >
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold text-white mb-4">
              Create Tournament
            </h2>

            <input
              name="name"
              placeholder="Tournament name"
              required
              className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
            />
            <input
              name="sport"
              placeholder="Sport"
              required
              className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
            />
            <input
              name="date"
              placeholder="Date range"
              required
              className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
            />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            >
              Create
            </button>
          </form>
        </div>
      )}

      {/* ADDED: CREATE MODAL — Special Event */}
      {showCreate && activeTab === "events" && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <form
            onSubmit={handleCreateEvent}
            className="bg-gray-900 p-6 rounded-xl w-full max-w-md relative"
          >
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold text-white mb-4">
              Create Special Event
            </h2>

            <input
              name="name"
              placeholder="Event name"
              required
              className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
            />
            <input
              name="category"
              placeholder="Category (e.g. Workshop, Community)"
              required
              className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
            />
            <input
              name="date"
              placeholder="Date range"
              required
              className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
            />
            <input
              name="location"
              placeholder="Location"
              required
              className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
            />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            >
              Create
            </button>
          </form>
        </div>
      )}
    </div>
  );
};