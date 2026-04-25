import { useState } from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardTopBar from "../../components/dashboard/DashboardTopBar";

const initialFunctionalAdmins = [
  {
    id: 1,
    name: "Ahmed K.",
    matricule: "EMP-2041",
    department: "Social Services",
    email: "ahmed.k@sonatrach.dz",
    assignedOn: "Oct 12, 2024",
    status: "Active",
  },
];

const employees = [
  {
    id: 2,
    name: "Nadia M.",
    matricule: "EMP-1987",
    department: "HR",
    email: "nadia.m@sonatrach.dz",
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

export default function ManageFunctionalAdmins() {
  const [functionalAdmins, setFunctionalAdmins] = useState(initialFunctionalAdmins);

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
      (e) =>
        String(e.id) === query ||
        e.matricule.toLowerCase() === query
    );

    if (!employee) {
      setError("Employee not found");
      return;
    }

    const alreadyAdmin = functionalAdmins.some(
      (a) => a.id === employee.id
    );

    if (alreadyAdmin) {
      setError("This employee already has the role");
      return;
    }

    setFoundEmployee(employee);
  };

  const handleAssign = () => {
    if (!foundEmployee) return;

    const newAdmin = {
      ...foundEmployee,
      assignedOn: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      status: "Active",
    };

    setFunctionalAdmins((prev) => [newAdmin, ...prev]);

    setFoundEmployee(null);
    setSearchValue("");
    setError("");
  };

  const handleRemove = (id) => {
    setFunctionalAdmins((prev) =>
      prev.filter((a) => a.id !== id)
    );
  };

  return (
    <div className="flex h-screen bg-[#F7F7F5]">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopBar />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Header */}
          <div>
            <p className="text-sm font-semibold text-[#ED8D31] mb-2">
              System admin tools
            </p>

            <h1 className="text-[36px] font-extrabold text-[#2F343B]">
              Manage Functional Admins
            </h1>
          </div>

          {/* Search Section */}
          <section className="rounded-[24px] bg-white border border-[#E5E2DC] p-5">
            <h2 className="text-[22px] font-bold text-[#2F343B] mb-4">
              Assign Role
            </h2>

            <div className="flex gap-3">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
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

            {error && (
              <p className="text-sm text-red-500 mt-3">{error}</p>
            )}

            {foundEmployee && (
              <div className="mt-4 flex justify-between items-center border p-4 rounded-[14px]">
                <div>
                  <p className="font-semibold">{foundEmployee.name}</p>
                  <p className="text-xs text-gray-500">
                    {foundEmployee.matricule} · {foundEmployee.department}
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

          {/* Table */}
          <section className="rounded-[24px] bg-white border border-[#E5E2DC] overflow-hidden">
            <div className="px-5 py-4 border-b">
              <h2 className="font-bold text-lg">
                Current Functional Admins
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
                {functionalAdmins.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="px-5 py-4">{a.name}</td>
                    <td className="px-5 py-4">{a.matricule}</td>
                    <td className="px-5 py-4">{a.department}</td>
                    <td className="px-5 py-4">{a.assignedOn}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleRemove(a.id)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}

                {functionalAdmins.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-400">
                      No admins yet
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