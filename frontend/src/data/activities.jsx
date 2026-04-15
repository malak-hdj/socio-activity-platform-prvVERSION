import runningImg from "../assets/activities/running.jpg";
import summerCampImg from "../assets/activities/summer-camp.jpg";
import bungalowImg from "../assets/activities/bungalow-stay.jpg";
import campingImg from "../assets/activities/camping.jpg";
import omraImg from "../assets/activities/omra.jpg";
import organizedTripImg from "../assets/activities/organized-trip.jpg";
import outdoorGetawayImg from "../assets/activities/outdoor-getaway.jpg";

export const activities = [
  {
    slug: "running",
    title: "Running",
    category: "Sport",
    status: "Open",
    location: "Company Campus",
    date: "Nov 12, 2024",
    image: runningImg,
    shortDescription: "Community races and wellness activities.",
    overview:
      "Join company running activities designed to promote fitness, motivation, and team spirit across employees.",
    included: [
      "Organized race sessions",
      "Wellness guidance",
      "Group warm-up",
      "Team participation",
    ],
    sessions: [
      { date: "15 Jul 2024", title: "Morning Run Session" },
      { date: "01 Aug 2024", title: "Wellness Challenge" },
    ],
  },
  {
    slug: "summer-camp",
    title: "Summer Camp",
    category: "Family",
    status: "Open",
    location: "Holiday Center",
    date: "Jul 15, 2024",
    image: summerCampImg,
    shortDescription: "Fun and organized holiday experiences for children.",
    overview:
      "A supervised and engaging summer program for employees' children with activities, learning, and recreation.",
    included: [
      "Supervised activities",
      "Transportation",
      "Meals",
      "Outdoor games",
    ],
    sessions: [
      { date: "15 Jul 2024", title: "Session 1: Mid-Summer Camp" },
      { date: "01 Aug 2024", title: "Session 2: August Camp" },
    ],
  },
  {
    slug: "bungalow-stay",
    title: "Bungalow Stay",
    category: "Stay",
    status: "Open",
    location: "Tourist Complex, West Coast",
    date: "Jun 20, 2024",
    image: bungalowImg,
    shortDescription: "Relaxing family-friendly accommodation by the sea.",
    overview:
      "Enjoy a calm and refreshing family stay with comfortable accommodation, leisure options, and seaside access.",
    included: [
      "Full board accommodation",
      "Transportation",
      "Beach access",
      "Kids activities",
    ],
    sessions: [
      { date: "15 Jul 2024", title: "Session 1: Mid-Summer Escape" },
      { date: "01 Aug 2024", title: "Session 2: August Peak Stay" },
    ],
  },
  {
    slug: "camping",
    title: "Camping",
    category: "Nature",
    status: "Open",
    location: "Mountain Area",
    date: "Sep 05, 2024",
    image: campingImg,
    shortDescription: "Outdoor adventures and group stays.",
    overview:
      "Reconnect with nature through outdoor group experiences, shared moments, and organized camping activities.",
    included: [
      "Tent accommodation",
      "Guided outdoor activities",
      "Group meals",
      "Safety support",
    ],
    sessions: [
      { date: "05 Sep 2024", title: "Autumn Camping Weekend" },
    ],
  },
  {
    slug: "omra",
    title: "Omra",
    category: "Spiritual",
    status: "Opens soon",
    location: "Saudi Arabia",
    date: "Dec 10, 2024",
    image: omraImg,
    shortDescription: "Organized spiritual journeys.",
    overview:
      "A structured and supported Omra program for employees with guided travel arrangements and assistance.",
    included: [
      "Travel coordination",
      "Accommodation",
      "Guidance support",
      "Group organization",
    ],
    sessions: [
      { date: "10 Dec 2024", title: "Winter Omra Session" },
    ],
  },
  {
    slug: "organized-trip",
    title: "Organized Trip",
    category: "Travel",
    status: "Open",
    location: "National Destinations",
    date: "Oct 22, 2024",
    image: organizedTripImg,
    shortDescription: "Planned trips and guided experiences.",
    overview:
      "Discover new places through organized trips prepared for employees and families with clear schedules and logistics.",
    included: [
      "Planned itinerary",
      "Transport",
      "Group coordination",
      "Activity support",
    ],
    sessions: [
      { date: "22 Oct 2024", title: "Autumn Discovery Trip" },
    ],
  },
  {
    slug: "outdoor-getaway",
    title: "Outdoor Getaway",
    category: "Leisure",
    status: "Open",
    location: "Regional Sites",
    date: "Nov 01, 2024",
    image: outdoorGetawayImg,
    shortDescription: "Refreshing group outings and open-air moments.",
    overview:
      "Short outdoor escapes designed for relaxation, social connection, and enjoyable shared experiences.",
    included: [
      "Day outing",
      "Transport",
      "Meal package",
      "Group activities",
    ],
    sessions: [
      { date: "01 Nov 2024", title: "Weekend Outdoor Getaway" },
    ],
  },
];