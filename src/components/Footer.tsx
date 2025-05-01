
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="py-6 px-4 sm:px-6 mt-8 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Humanize with Codemz 
            

          </p>
          <p className="text-sm text-muted-foreground mb-2 md:mb-0">Created with ❤️ by <a href="https://mohamed.codemz.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-blue-500">Mohamed Hamed</a></p>          <div className="flex space-x-4">
            <span className="text-sm text-muted-foreground">
              Powered by Gemini API • Works with default or custom API key • No data storage
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
