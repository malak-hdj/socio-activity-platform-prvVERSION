export default function IdeasSection() {
    return (
      <div className="flex justify-center px-4 py-12">
        <div className="w-full max-w-[1336px]">
          <div className="grid grid-cols-2 gap-6">
            {/* Left: Text content */}
            <div
              className="rounded-[28px] border border-[rgba(229,226,220,0.92)] bg-[rgba(255,255,255,0.82)] backdrop-blur-[5px] p-[30px] flex flex-col gap-[13.2px]"
            >
              {/* Idea box label */}
              <div className="flex items-center gap-2 w-fit px-[14px] py-[6.25px] rounded-full bg-[rgba(255,255,255,0.76)] backdrop-blur-[5px]">
                <div className="w-[7px] h-[7px] rounded-full bg-[#ED8D31]" />
                <span className="text-[#50565E] text-[13px] font-semibold leading-[19.5px]">Idea Box</span>
              </div>
  
              {/* Heading */}
              <h2
                className="text-[#2F343B] font-extrabold leading-[96%] tracking-[-3.24px] max-w-[520px]"
                style={{ fontSize: "54px" }}
              >
                Encourage ideas,
                <br />
                feedback and
                <br />
                suggestions from
                <br />
                every employee
              </h2>
  
              {/* Description */}
              <p className="text-[#7A8088] text-base font-normal leading-[175%] max-w-[500px]">
                The landing page ends with a simple contribution area so
                employees can quickly suggest an activity, share feedback or
                propose an improvement without navigating into a dashboard
                first.
              </p>
  
              {/* Feature list */}
              <div className="flex flex-col gap-[14px] pt-4">
                {/* Feature 1 */}
                <div
                  className="flex gap-[14px] px-[40.96px] py-[18px] rounded-[18px] border border-[rgba(229,226,220,0.86)] bg-[rgba(245,244,241,0.76)]"
                >
                  <div
                    className="w-[42px] h-[42px] flex justify-center items-center flex-shrink-0 rounded-[14px] bg-[rgba(255,255,255,0.92)]"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <g clipPath="url(#clip0)">
                        <path d="M11.25 10.5C11.4 9.75 11.775 9.225 12.375 8.625C13.125 7.95 13.5 6.975 13.5 6C13.5 3.51638 11.4836 1.5 9 1.5C6.51638 1.5 4.5 3.51638 4.5 6C4.5 6.75 4.65 7.65 5.625 8.625C6.15 9.15 6.6 9.75 6.75 10.5M6.75 13.5H11.25M7.5 16.5H10.5" stroke="#ED8D31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0"><rect width="18" height="18" fill="white"/></clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <h3 className="text-[#2F343B] text-base font-bold leading-[120%]">
                      Simple and inviting
                    </h3>
                    <p className="text-[#7A8088] text-sm font-normal leading-[160%]">
                      Short fields and clear structure make participation easier for every employee.
                    </p>
                  </div>
                </div>
  
                {/* Feature 2 */}
                <div
                  className="flex gap-[14px] px-[57.5px] py-[18px] rounded-[18px] border border-[rgba(229,226,220,0.86)] bg-[rgba(245,244,241,0.76)]"
                >
                  <div
                    className="w-[42px] h-[42px] flex justify-center items-center flex-shrink-0 rounded-[14px] bg-[rgba(255,255,255,0.92)]"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M16.5 12.75C16.5 13.5779 15.8279 14.25 15 14.25H5.121C4.72321 14.2501 4.34174 14.4082 4.0605 14.6895L2.409 16.341C2.25671 16.4933 2.02769 16.5388 1.82873 16.4564C1.62977 16.374 1.50003 16.1799 1.5 15.9645V3.75C1.5 2.92213 2.17213 2.25 3 2.25H15C15.8279 2.25 16.5 2.92213 16.5 3.75V12.75" stroke="#ED8D31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <h3 className="text-[#2F343B] text-base font-bold leading-[120%]">
                      Visible feedback culture
                    </h3>
                    <p className="text-[#7A8088] text-sm font-normal leading-[160%]">
                      The section keeps engagement present on the public landing page without
                      heavy administrative content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Right: Form */}
            <div
              className="rounded-[28px] border border-[rgba(229,226,220,0.92)] bg-[rgba(255,255,255,0.82)] backdrop-blur-[5px] p-[30px]"
            >
              <div
                className="rounded-[24px] border border-[rgba(229,226,220,0.90)] bg-[rgba(255,255,255,0.96)] p-6 flex flex-col gap-[13.5px] relative min-h-[420px]"
              >
                {/* Category Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#2F343B] text-[13px] font-semibold leading-[19.5px]">
                    Category
                  </label>
                  <div className="flex items-center gap-2 px-[14px] py-[12px] rounded-[14px] border border-[#E5E2DC] bg-[#F5F4F1] min-h-[48px]">
                    <span className="text-[#7A8088] text-sm font-normal leading-[21px]">
                      Suggestion d'activité
                    </span>
                  </div>
                </div>
  
                {/* Title Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#2F343B] text-[13px] font-semibold leading-[19.5px]">
                    Title
                  </label>
                  <div className="flex items-center gap-2 px-[14px] py-[12px] rounded-[14px] border border-[#E5E2DC] bg-[#F5F4F1] min-h-[48px]">
                    <span className="text-[#7A8088] text-sm font-normal leading-[21px]">
                      Ex: séjour culturel à Constantine
                    </span>
                  </div>
                </div>
  
                {/* Description Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#2F343B] text-[13px] font-semibold leading-[19.5px]">
                    Description
                  </label>
                  <div className="flex items-start gap-2 px-[14px] py-[11.5px] rounded-[14px] border border-[#E5E2DC] bg-[#F5F4F1] min-h-[130px]">
                    <span className="text-[#7A8088] text-sm font-normal leading-[165%] pt-1">
                      Describe your idea, who it benefits and why it would improve the
                      employee experience.
                    </span>
                  </div>
                </div>
  
                {/* Submit Button */}
                <button
                  className="flex items-center justify-center min-h-[46px] px-[18px] rounded-lg bg-[#ED8D31] text-white text-sm font-medium hover:bg-[#d47d29] transition-colors absolute bottom-6 left-6 right-6"
                >
                  Submit idea
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }