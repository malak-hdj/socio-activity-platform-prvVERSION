export default function Footer() {
    return (
      <div className="flex justify-center px-4 pt-8 pb-4">
        <div className="w-full max-w-[1336px] flex justify-between items-center border-t border-[#E5E2DC] pt-6">
          
          {/* Copyright */}
          <div className="text-[#7A8088] text-sm font-normal">
            © 2026 SONATRACH. All rights reserved.
          </div>
  
          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#7A8088] text-sm hover:text-[#2F343B] transition-colors">
              Policies
            </a>
            <a href="#" className="text-[#7A8088] text-sm hover:text-[#2F343B] transition-colors">
              Contact
            </a>
            <a href="#" className="text-[#7A8088] text-sm hover:text-[#2F343B] transition-colors">
              Social Media
            </a>
          </div>
  
        </div>
      </div>
    );
  }