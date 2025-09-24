import React, { useState, useEffect } from "react";

// Backend API base URL
const API_BASE = "http://localhost/LeagleEase_Backend/api";

const AdminDashboard = () => {
  const [pendingLawyers, setPendingLawyers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending lawyers and all users
  const fetchData = async () => {
    try {
      setLoading(true);
      const [lawyersRes, usersRes] = await Promise.all([
        fetch(`${API_BASE}/getPendingLawyers.php`),
        fetch(`${API_BASE}/getUsers.php`)
      ]);

      const lawyersData = await lawyersRes.json();
      const usersData = await usersRes.json();

      setPendingLawyers(lawyersData);
      setUsers(usersData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Approve lawyer
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/approveLawyer.php?id=${id}`, {
        method: "POST"
      });
      if (res.ok) {
        alert("Lawyer approved!");
        fetchData(); // Refresh data after approval
      } else {
        alert("Approval failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error during approval.");
    }
  };

  // Delete lawyer request
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/deleteLawyer.php?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        alert("Lawyer request deleted!");
        fetchData(); // Refresh data after deletion
      } else {
        alert("Deletion failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error during deletion.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Pending Lawyers */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Pending Lawyer Approvals</h2>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Specialization</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingLawyers.length > 0 ? (
              pendingLawyers.map((lawyer) => (
                <tr key={lawyer.id} className="text-center">
                  <td className="p-2 border">{lawyer.id}</td>
                  <td className="p-2 border">{lawyer.name}</td>
                  <td className="p-2 border">{lawyer.email}</td>
                  <td className="p-2 border">{lawyer.specialization}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleApprove(lawyer.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDelete(lawyer.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-2 border text-center">
                  No pending lawyers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* All Users */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Verified</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="p-2 border">{user.id}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border">
                    {user.verified ? "✅ Yes" : "❌ No"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-2 border text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
