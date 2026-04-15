export default function DashboardTopBar() {
    return (
      <header className="h-[60px] bg-white border-b border-[#E5E2DC] flex items-center px-6 gap-4 sticky top-0 z-40">
        {/* Search */}
        <div className="flex-1 max-w-[360px]">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#E5E2DC] bg-[#F5F4F1]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="flex-shrink-0"
            >
              <circle cx="7" cy="7" r="4.5" stroke="#7A8088" strokeWidth="1.33333" />
              <path
                d="M10.5 10.5L13.5 13.5"
                stroke="#7A8088"
                strokeWidth="1.33333"
                strokeLinecap="round"
              />
            </svg>
  
            <input
              type="text"
              placeholder="Search activities, announcements..."
              className="bg-transparent text-sm text-[#2F343B] placeholder:text-[#7A8088] outline-none w-full"
            />
          </div>
        </div>
  
        {/* Right actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Language switch */}
          <div className="flex min-h-[42px] p-1 items-center gap-1 rounded-full border border-[#E5E2DC] bg-[rgba(255,255,255,0.88)]">
            <button
              type="button"
              className="flex h-8 min-w-[38px] px-[11.5px] justify-center items-center rounded-full bg-[#ED8D31]"
            >
              <span className="text-white text-xs font-semibold">EN</span>
            </button>
  
            <button
              type="button"
              disabled
              title="French version coming later"
              className="flex h-8 min-w-[38px] px-[10.7px] justify-center items-center rounded-full cursor-not-allowed opacity-60"
            >
              <span className="text-[#7A8088] text-xs font-semibold">FR</span>
            </button>
          </div>
  
          {/* Notification bell */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-[#E5E2DC] bg-white hover:bg-[#F5F4F1] transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 1.5C6.1 1.5 3.75 3.85 3.75 6.75v.75L2.25 10.5v.75h13.5v-.75L14.25 7.5v-.75C14.25 3.85 11.9 1.5 9 1.5z"
                stroke="#2F343B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.75 11.25v.75A2.25 2.25 0 0 0 11.25 12v-.75"
                stroke="#2F343B"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
  
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#ED8D31] rounded-full border border-white" />
          </button>
  
          {/* User profile */}
          <div className="flex items-center gap-2.5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-[#2F343B] leading-tight">
                Ahmed K.
              </p>
              <p className="text-xs text-[#7A8088] leading-tight">
                Employee
              </p>
            </div>
  
            <div className="w-9 h-9 rounded-full bg-[#ED8D31] flex items-center justify-center overflow-hidden flex-shrink-0">
              <span className="text-white text-sm font-bold">A</span>
            </div>
          </div>
        </div>
      </header>
    );
  }
  