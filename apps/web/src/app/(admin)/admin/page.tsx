"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        // Fetch all users and count them
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users`);
        setUsersCount(response.data.length);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsersCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersCount();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Users</h2>
          <p className="text-gray-600">Manage users and permissions</p>
          <div className="mt-4">
            <span className="text-2xl font-bold text-blue-600">{loading ? "..." : usersCount}</span>
            <p className="text-sm text-gray-500">Total users</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-2">System Status</h2>
          <p className="text-gray-600">Overall system health</p>
          <div className="mt-4">
            <span className="text-2xl font-bold text-green-600">✓</span>
            <p className="text-sm text-gray-500">All systems operational</p>
          </div>
        </div>
      </div>
    </>
  );
}
