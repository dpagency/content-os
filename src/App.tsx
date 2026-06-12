import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/auth-context";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Brands } from "./pages/Brands";
import { AiGenerator } from "./pages/AiGenerator";
import { ContentHub } from "./pages/ContentHub";

// Fallback pages until we implement them
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-zinc-500 mt-2">Work in progress...</p>
  </div>
);

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#09090B]">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="brands" element={<Brands />} />
        <Route path="brands/:id" element={<Placeholder title="Brand Workspace" />} />
        <Route path="content" element={<ContentHub />} />
        <Route path="calendar" element={<Placeholder title="Editorial Calendar" />} />
        <Route path="ai" element={<AiGenerator />} />
        <Route path="media" element={<Placeholder title="Media Library" />} />
        <Route path="reports" element={<Placeholder title="Reports" />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
