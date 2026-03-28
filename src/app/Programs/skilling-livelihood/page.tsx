'use client';
import ProgramPage from "../components/ProgramPage";

const highlights = [
  { title: "employability", icon: "💼", detail: "1.	To enhance employability and income generating opportunities for 350youth in urban slums of Uganda by 2028." },
  { title: "sports development", icon: "🏅", detail: "To promote sports development and healthy lifestyles among 500 Youth in urban slums of Kampala by 2028. " },
  
];

// Program Activities
const activities = [
  {
    title: "Sports events",
    detail: "Organize quarterly Sport events, Competition & sports development targeting 4 Schools, 1,000 vulnerable Youth in urban slums of Uganda by 2028.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758376508/zannya/uploads/images/t614e7cy9pkrpcibktnv.jpg"
  },
  {
    title: "Mentorship & Coaching in sports",
    detail: "Conduct Mentorship & Coaching in sports, life skills, Career choices, Business management, record keeping, Financial Literacy, Talent spotting & development, officiating, digital skills and work readiness skills to 1000 youth in Urban slums of Kampala by 2028.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758023495/zannya/uploads/images/ui2d2218fdpe7uwyesff.jpg"
  },
  {
    title: "Internship",
    detail: "Conduct bi-annual Job placements & Internship for 150 youth graduates from Entrepreneurship and Life skills program from Urban slums of Uganda by 2028.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758379328/zannya/uploads/images/ybuex5jd9ntcotpvz1gx.jpg"
  },
  
];


export default function SkillingLivelihood() {
  return (
    <ProgramPage
      title=" SPORTS FOR ENHANCED LIVELIHOOD "
      description=""
      image="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758022891/zannya/uploads/images/zv2tj56ffj9508h8lv12.jpg"
      intro="To empower 1000 Youth in urban slums of Uganda to attain sustainable livelihood, economic stability and wellbeing through sports-based initiatives by Dec 2028."
      highlights={highlights}
      activities={activities}
      ctaText="Learn More →"
    />
  );
}