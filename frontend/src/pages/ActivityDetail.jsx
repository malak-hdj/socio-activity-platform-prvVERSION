import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { activities } from "../data/activities";

export default function ActivityDetail() {
  const { slug } = useParams();
  const activity = activities.find((item) => item.slug === slug);

  if (!activity) {
    return (
      <Layout>
        <div className="px-4 py-16">
          <div className="max-w-[1336px] mx-auto">
            <h1 className="text-4xl font-bold text-[#2F343B] mb-4">Activity not found</h1>
            <Link to="/catalog" className="text-[#ED8D31] font-medium">
              Back to catalog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 py-10">
        <div className="w-full max-w-[1336px] mx-auto">
          <div className="text-sm text-[#7A8088] mb-5">
            <Link to="/" className="hover:text-[#2F343B]">Home</Link> ·{" "}
            <Link to="/catalog" className="hover:text-[#2F343B]">Activities</Link> ·{" "}
            <span className="text-[#2F343B]">{activity.title}</span>
          </div>

          <div className="mb-8">
            <span className="inline-flex px-4 py-2 rounded-full bg-white border border-[#E5E2DC] text-sm text-[#50565E] mb-4">
              {activity.category}
            </span>
            <h1 className="text-[#2F343B] text-[56px] font-extrabold leading-[100%] tracking-[-2px] mb-4">
              {activity.title}
            </h1>
            <p className="text-[#7A8088] text-xl">
              {activity.shortDescription} — {activity.location}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mb-10">
            <div className="rounded-[28px] overflow-hidden min-h-[420px]">
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-[28px] border border-[#E5E2DC] bg-white p-7 h-fit">
              <span className="inline-flex px-4 py-2 rounded-full bg-[#E9F7EF] text-[#2F8C57] text-sm font-semibold mb-5">
                {activity.status}
              </span>

              <h2 className="text-[#2F343B] text-[22px] font-bold mb-4">
                Employee Quota
              </h2>

              <div className="space-y-4 text-sm text-[#50565E] border-b border-[#E5E2DC] pb-5 mb-5">
                <div className="flex justify-between">
                  <span>Registration date</span>
                  <span className="font-semibold text-[#2F343B]">{activity.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available places</span>
                  <span className="font-semibold text-[#2F343B]">150 families</span>
                </div>
                <div className="flex justify-between">
                  <span>Demand level</span>
                  <span className="font-semibold text-[#2F343B]">High</span>
                </div>
              </div>

              <label className="block text-sm font-semibold text-[#2F343B] mb-2">
                Select Session
              </label>
              <select className="w-full px-4 py-3 rounded-[14px] border border-[#E5E2DC] bg-[#F7F7F5] outline-none mb-5">
                {activity.sessions.map((session) => (
                  <option key={session.title}>{session.title}</option>
                ))}
              </select>

              <button className="w-full py-4 rounded-[14px] bg-[#ED8D31] text-white font-semibold mb-3">
                Register for this activity
              </button>

              <button className="w-full py-4 rounded-[14px] border border-[#E5E2DC] bg-white text-[#2F343B] font-medium">
                Save for later
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            <div>
              <h2 className="text-[#2F343B] text-[36px] font-bold mb-4">Overview</h2>
              <p className="text-[#7A8088] text-base leading-[190%] mb-8">
                {activity.overview}
              </p>

              <h3 className="text-[#2F343B] text-[30px] font-bold mb-5">What&apos;s Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {activity.included.map((item) => (
                  <div
                    key={item}
                    className="rounded-[20px] border border-[#E5E2DC] bg-white p-5"
                  >
                    <h4 className="text-[#2F343B] font-bold mb-2">{item}</h4>
                    <p className="text-[#7A8088] text-sm leading-[170%]">
                      Included as part of the activity experience for eligible employees.
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="text-[#2F343B] text-[30px] font-bold mb-5">
                Important Dates & Sessions
              </h3>

              <div className="space-y-4">
                {activity.sessions.map((session) => (
                  <div
                    key={session.title}
                    className="rounded-[20px] border border-[#E5E2DC] bg-white p-5 flex gap-5 items-start"
                  >
                    <div className="min-w-[80px] text-[#ED8D31] font-bold">
                      {session.date}
                    </div>
                    <div>
                      <h4 className="text-[#2F343B] font-bold mb-2">{session.title}</h4>
                      <p className="text-[#7A8088] text-sm leading-[170%]">
                        Scheduled session for this activity with participation details and timing.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div />
          </div>
        </div>
      </div>
    </Layout>
  );
}