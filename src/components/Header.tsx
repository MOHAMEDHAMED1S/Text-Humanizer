
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="py-4 px-4 sm:px-6 border-b">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="bg-primary rounded-md p-1.5 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-check">
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">Codemz Humanizer</h1>
            <p className="text-sm text-muted-foreground">Make your text sound more natural and human-like</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
