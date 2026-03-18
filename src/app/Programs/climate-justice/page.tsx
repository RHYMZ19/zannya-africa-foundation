'use client'; // Make this page a Client Component
import ProgramPage from "../components/ProgramPage";

// Program highlights
const highlights = [
  {
    title: "climate ambassadors",
    detail: "To build organized pool of 15 climate ambassadors each reaching out to 300 Beneficiaries in their community on quarterly basis by Dec 2028. "
  },
  {
    title: "fruit trees planting",
    detail: "Promote planting of 3,000 fruit trees & 1,500 restoration trees in vulnerable communities to improve food security and eco-system restoration.   "
  },
  {
    title: "ICT skills",
    detail: "To Integrate ICT skills with Environmental Justice/Advocacy campaigns targeting 5000 people via social Medial and Digital platforms."
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
      title=" CLIMATE ACTION & ENVIRONMENT JUSTICE"
      description=""
      image="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757064544/zannya/uploads/ioeyybvowmrjwoe0llpl.jpg"
      intro="To Strengthen climate resilience and Environmental sustainability for 4,500 
vulnerable Youths and Women in Schools, Community and institutions in Uganda 
through Sports, climate Advocacy and digital innovation by 2028."
      highlights={highlights}
      activities={activities}
      ctaText="Learn More →"
    />
  );
}


