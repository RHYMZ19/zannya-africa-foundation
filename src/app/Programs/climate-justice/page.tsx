'use client'; // Make this page a Client Component
import ProgramPage from "../components/ProgramPage";

// Program highlights
const highlights = [
  {
    title: "Youth Engagement",
    detail: "Sports and recreation as tools for life skills."
  },
  {
    title: "Women Empowerment",
    detail: "Training and mentorship programs for women."
  },
  {
    title: "Skill Development",
    detail: "Practical sessions to boost livelihood opportunities."
  }
];

// Program Activities
const activities = [
  {
    title: "Community Football Tournaments",
    detail: "Organizing football tournaments that bring youth together while educating them about climate action and environmental responsibility.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758023469/zannya/uploads/images/yfrz57qsu50uvpottbzq.jpg"
  },
  {
    title: "Tree Planting Campaigns",
    detail: "Youth participate in tree planting after sports events to restore the environment and promote climate justice.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1756829071/zannya/uploads/kngkholnlp6wvmzq4pa8.jpg"
  },
  {
    title: "Climate Education Workshops",
    detail: "Training sessions that teach young athletes about climate change, sustainability, and environmental protection.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758023192/zannya/uploads/images/evtysd6cvwkgufpbfhcm.jpg"
  },
  {
    title: "Community Clean-up Drives",
    detail: "Sports teams organize clean-up campaigns in their communities to promote environmental responsibility.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1756827033/zannya/uploads/w041szk6iwvrrkio0dyj.jpg"
  }
];

// Client Component page
export default function ClimateJustice() {
  return (
    <ProgramPage
      title="Skilling & Livelihood"
      description="ZAF utilizes sports and recreation activities as a tool to enhance the livelihood skills of underprivileged youth and women."
      image="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757064544/zannya/uploads/ioeyybvowmrjwoe0llpl.jpg"
      highlights={highlights}
      activities={activities}
      ctaText="Learn More →"
    />
  );
}


