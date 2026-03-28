'use client';
import ProgramPage from "../components/ProgramPage";

const highlights = [
  { title: "employability", icon: "🌍", detail: "To enhance employability and income generating opportunities for 350youth & Women in urban slums of Uganda by 2028. " },
  { title: "sports talent", icon: "🌍", detail: "To promote sports talent and healthy lifestyles among 500 Youth & women in urban slums of Kampala by 2028. " },
  { title: "community engagement", icon: "🌍", detail: "To Foster community engagement and Social Cohesion for xxx" }
];

// Program Activities
const activities = [
  {
    title: "Sports training events",
    detail: " To Organise quarterly Sports training events & Competition targeting 4 Schools,1,000 Youth in urban slums of Uganda by 2028. ",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1756827033/zannya/uploads/w041szk6iwvrrkio0dyj.jpg"
  },
  {
    title: "sports related Entrepreneurship",
    detail: " To Conduct quarterly Life skills & sports related Entrepreneurship trainings for 1,000 Youths and Women in Urban slums of Uganda by 2028.  ",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758023192/zannya/uploads/images/evtysd6cvwkgufpbfhcm.jpg"
  },
  {
    title: "Internship",
    detail: "To conduct bi-annual Job placements & Internship for 300 youth and Women graduates from Entrepreneurship and Life skills program from Urban slums of Uganda by 2028. ",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758023469/zannya/uploads/images/yfrz57qsu50uvpottbzq.jpg"
  },
  {
    title: "Sports for development events",
    detail: "Organise bi-annual Sports for development events targeting 500 Youth and Women in Urban slums of Kampala by 2028.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1756829071/zannya/uploads/kngkholnlp6wvmzq4pa8.jpg"
  },
  {
    title: "Mentorship & Coaching in sports",
    detail: "To Provide Mentorship & Coaching in sports, Career choices, Business management, record keeping, Financial Literacy, Talent spotting & development, officiating, ICT and work readiness skills to 500 in Urban slums of Kampala by 2028. ",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1756827033/zannya/uploads/w041szk6iwvrrkio0dyj.jpg"
  }
];


export default function SkillingLivelihood() {
  return (
    <ProgramPage
      title=" Sports for Livelihood & Economic Empowerment."
      description=""
      image="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757064571/zannya/uploads/lpux4wqm27omuk9u15ei.jpg"
      intro="To empower 4,500 Youth & Women in urban slums of Uganda to attain sustainable 
       livelihood and economic stability and wellbeing through sports-based initiatives by Dec 2028. "
      highlights={highlights}
      activities={activities}
      ctaText="Learn More →"
    />
  );
}