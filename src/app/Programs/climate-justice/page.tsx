'use client'; // Make this page a Client Component

import ProgramPage from "../components/ProgramPage";

// Program highlights
const highlights = [
  {
    title: " Form climate ambassadors",
    icon: "🧑‍🤝‍🧑",
    detail: "To build organized pool of 15 climate ambassadors each reaching out to 300 Beneficiaries in their community on quarterly basis by Dec 2028."
  },
  {
    title: "planting fruit trees ",
    icon: "🌳",
    detail: "Promote planting of 3,000 fruit trees & 1,500 restoration trees in vulnerable communities to improve food security and eco-system restoration.   "
  },
  {
    title: "Integrate ICT skills ",
    icon: "💻",
    detail: "To Integrate ICT skills with Environmental Justice/Advocacy campaigns targeting 5000 people via social Medial and Digital platforms."
  },
  {
    title: "Disaster Risk Reduction ",
    icon: "🌪️",
    detail: "4.	To conduct Disaster Risk Reduction (DRR) and eco-system restoration trainings and awareness targeting 15 climate ambassadors in vulnerable communities in Uganda. "
  }
];

// Program Activities
const activities = [
  {
    title: "Build climate ambassadors ",
    detail: "Identify and build capacity of 15 climate ambassadors to reach out to 300 Beneficiaries with Climate action and environmental Justice messages in their community on quarterly basis.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758023170/zannya/uploads/images/nnbjk8hm1wvgcn6s2fdn.jpg"
  },
  {
    title: "Conduct ZAF EcoFit Camping ",
    detail: "Conduct Annual in school (150) & out of school (100) ZAF EcoFit Camp targeting 250 participants.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1765369474/zannya/uploads/images/kgbntplydbijpatj6cbi.jpg"
  },
  {
    title: "Climate education in schools ",
    detail: "Conduct quarterly Climate education in schools targeting 12 schools with 2,400 participants. ",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758116572/zannya/uploads/images/au4ofyrzeimna2haoznw.jpg"
  },
  {
    title: "Community fruit tree planting ",
    detail: "Conduct Bi-annual Community fruit tree planting for 3,000 fruit trees & 1,500 restoration trees in 3 Vulnerable communities in Central Uganda by 2028. ",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1774726189/zannya/uploads/images/mlss4vqueb8unse8qlqf.jpg"
  },
  {
    title: " Webinars hosting ",
    detail: "Host 5 Webinars and 10 social media spaces on Climate action & environmental justice.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758116555/zannya/uploads/images/yn2i3fknxn7cxmiiwj2n.jpg"
  }
];

// Client Component page
export default function ClimateJustice() {
  return (
    <ProgramPage
      title=" CLIMATE ACTION & ENVIRONMENT JUSTICE"
      description=""
      image="https://res.cloudinary.com/dpwuym7xg/image/upload/v1774726189/zannya/uploads/images/mlss4vqueb8unse8qlqf.jpg"
      intro="To Strengthen climate resilience and Environmental sustainability for 4,500 
      vulnerable Youths in Schools, Community and institutions in Uganda through Sports, 
      climate Advocacy and digital innovation by 2028."
      highlights={highlights}
      activities={activities}
      ctaText="Learn More →"
    />
  );
}


