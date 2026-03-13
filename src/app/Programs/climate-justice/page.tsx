'use client';

import ProgramPage from "../components/ProgramPage"

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
]

export default function ClimateJustice() {

  return (
    <ProgramPage
      title="Skilling & Livelihood"
      description="ZAF utilizes sports and recreation activities as a tool to enhance the livelihood skills of underprivileged youth and women."
      image="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757064544/zannya/uploads/ioeyybvowmrjwoe0llpl.jpg"
      highlights={highlights}
      ctaText="Learn More →"
    />
  )

}


