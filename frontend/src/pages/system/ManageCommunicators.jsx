import { useState } from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardTopBar from "../../components/dashboard/DashboardTopBar";

const initialCommunicators = [
  {
    id: 1,
    name: "Rania B.",
    matricule: "EMP-2334",
    department: "Communication",
    email: "rania.b@sonatrach.dz",
    assignedOn: "Oct 08, 2024",
    status: "Active",
  },
];

const employees = [
  {
    id: 2,
    name: "Ahmed K.",
    matricule: "EMP-2041",
    department: "Social Services",
    email: "ahmed.k@sonatrach.dz",
  },
  {
    id: 3,
    name: "Karim T.",
    matricule: "EMP-1763",
    department: "Operations",
    email: "karim.t@sonatrach.dz",
  },
  {
    id: 4,
    name: "Samira G.",
    matricule: "EMP-2210",
    department: "Finance",
    email: "samira.g@sonatrach.dz",
  },
];

export default function ManageCommunicators() {
  const [communicators, setCommunicators] = useState(initialCommunicators);
  const [searchValue, setSearchValue] = useState("");
  const [foundEmployee, setFoundEmployee] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    setFoundEmployee(null);

    if (!searchValue.trim()) {
      setError("Please enter employee ID or matricule");
      return;
    }

    const query = searchValue.toLowerCase();

    const employee = employees.find(
      (e) => String(e.id) === query || e.matricule.toLowerCase() === query
    );

    if (!employee) {
      setError("Employee not found");
      return;
    }

    const alreadyHasRole = communicators.some((c) => c.id === employee.id);

    if (alreadyHasRole) {
      setError("This employee already has the Communicator role");
      return;
    }

    setFoundEmployee(employee);
  };

  const handleAssign = () => {
    if (!foundEmployee) return;

    const newCommunicator = {
      ...foundEmployee,
      assignedOn: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      status: "Active",
    };

    setCommunicators((prev) => [newCommunicator, ...prev]);
    setFoundEmployee(null);
    setSearchValue("");
    setError("");
  };

  const handleRemove = (id) => {
    setCommunicators((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex h-screen bg-[#F7F7F5]">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopBar />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <p className="text-sm font-semibold text-[#ED8D31] mb-2">
              System admin tools
            </p>

            <h1 className="text-[36px] font-extrabold text-[#2F343B]">
              Manage Communicators
            </h1>

            <p className="text-[#7A8088] text-sm mt-2">
              Search an employee by ID or matricule and assign the Communicator role.
            </p>
          </div>

          <section className="rounded-[24px] bg-white border border-[#E5E2DC] p-5">
            <h2 className="text-[22px] font-bold text-[#2F343B] mb-4">
              Assign Communicator Role
            </h2>

            <div className="flex gap-3">
              <input
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setFoundEmployee(null);
                  setError("");
                }}
                placeholder="Enter ID or matricule..."
                className="flex-1 px-4 py-3 rounded-[14px] border border-[#E5E2DC] bg-[#F7F7F5] outline-none"
              />

              <button
                onClick={handleSearch}
                className="px-5 py-3 rounded-[14px] border border-[#E5E2DC] bg-white"
              >
                Search
              </button>
            </div>

            {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

            {foundEmployee && (
              <div className="mt-4 flex justify-between items-center border border-[#E5E2DC] bg-[#FBFAF8] p-4 rounded-[14px]">
                <div>
                  <p className="font-semibold text-[#2F343B]">{foundEmployee.name}</p>
                  <p className="text-xs text-[#7A8088]">
                    {foundEmployee.matricule} · {foundEmployee.department} · {foundEmployee.email}
                  </p>
                </div>

                <button
                  onClick={handleAssign}
                  className="px-4 py-2 bg-[#ED8D31] text-white rounded-[10px]"
                >
                  Add Role
                </button>
              </div>
            )}
          </section>

          <section className="rounded-[24px] bg-white border border-[#E5E2DC] overflow-hidden">
            <div className="px-5 py-4 border-b">
              <h2 className="font-bold text-lg text-[#2F343B]">
                Current Communicators
              </h2>
            </div>

            <table className="w-full">
              <thead className="bg-[#FBFAF8] text-xs text-gray-500">
                <tr>
                  <th className="px-5 py-3 text-left">Name</th>
                  <th className="px-5 py-3 text-left">Matricule</th>
                  <th className="px-5 py-3 text-left">Department</th>
                  <th className="px-5 py-3 text-left">Assigned</th>
                  <th className="px-5 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {communicators.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="px-5 py-4">{c.name}</td>
                    <td className="px-5 py-4">{c.matricule}</td>
                    <td className="px-5 py-4">{c.department}</td>
                    <td className="px-5 py-4">{c.assignedOn}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleRemove(c.id)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}

                {communicators.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-400">
                      No communicators yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}