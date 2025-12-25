'use client';

import { useState, createContext, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import { CourseSidebar } from './CourseSidebar';

interface MobileSidebarWrapperProps {
  course: any;
  children: React.ReactNode;
}

// Contexto para controlar el sidebar desde cualquier componente hijo
const SidebarContext = createContext<{
  toggleSidebar: () => void;
  sidebarOpen: boolean;
} | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within MobileSidebarWrapper');
  }
  return context;
};

export function MobileSidebarWrapper({ course, children }: MobileSidebarWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <SidebarContext.Provider value={{ toggleSidebar, sidebarOpen }}>
      {/* Botón hamburguesa - solo visible en móviles */}
      <button
        onClick={toggleSidebar}
        className="hidden fixed top-4 left-4 z-50 p-2 bg-background border border-border rounded-md shadow-lg"
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay oscuro cuando el menú está abierto */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-80 border-r border-border bg-background shrink-0
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <CourseSidebar course={course} />
      </div>

      {children}
    </SidebarContext.Provider>
  );
}