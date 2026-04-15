import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center px-4 pt-[18px] pb-0 relative z-10">
      <nav className="flex w-full max-w-[1336px] min-h-[74px] px-5 py-[13px] justify-between items-center rounded-[22px] border border-[rgba(229,226,220,0.92)] bg-[rgba(255,255,255,0.82)] backdrop-blur-[5px]">
        
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-[14px] min-w-[220px] cursor-pointer"
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/af72391ae8971f15efed2311d265b92f2f3a69fd?width=84"
            alt="Sonatrach"
            className="w-[42px] h-[42px] rounded-[10px] object-cover"
          />
          <span className="text-[#2F343B] font-bold text-2xl">
            SONATRACH
          </span>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => goToSection("activities")}
            className="text-[#2F343B] text-sm font-medium"
          >
            Activities
          </button>

          <button
            onClick={() => goToSection("announcements")}
            className="text-[#7A8088] text-sm font-medium"
          >
            Announcements
          </button>

          <button
            onClick={() => goToSection("ideas")}
            className="text-[#7A8088] text-sm font-medium"
          >
            Ideas
          </button>
        </div>

        {/* Actions */}
<div className="flex items-center gap-3">
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

  {/* Login button */}
  <button
    onClick={() => navigate("/login")}
    className="flex h-[42px] px-[18px] justify-center items-center rounded-full border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-medium hover:bg-gray-50 transition-colors"
  >
    Login
  </button>
</div>
      </nav>
    </div>
  );
}