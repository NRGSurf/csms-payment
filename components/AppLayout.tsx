import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-blue-100 text-gray-900">
      {/* Header */}
      <header className="bg-black text-white px-4 py-3 flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          NRGSurf Mobility
        </a>
        <div>{/* Future: language switch or menu */}</div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto p-4">{children}</main>

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-600 py-4">
        <div>
          <a href="tel:+49-811-12447908" className="underline mr-4">
            +49-811-12447908
          </a>
          <a
            href="https://www.bb-mobility.com/impressum/"
            className="underline mr-4"
          >
            Impressum
          </a>
          <a
            href="https://www.bb-mobility.com/datenschutz/"
            className="underline mr-4"
          >
            Datenschutz
          </a>
          <a href="https://www.bb-mobility.com/agb/" className="underline">
            AGB
          </a>
        </div>
        <div className="mt-2">&copy; 2025 NRGSurf Mobility</div>
      </footer>
    </div>
  );
}
