'use client';
import ProgramPage from "../components/ProgramPage";

const highlights = [
  { title: "Sexual awareness", detail: "To Increase knowledge on responsible sexual behavior & safe sexual practices among 1000 Youth in urban slums of Kampala by 2028.", icon: "🧡" },
  { title: "Encouraging healthy physical lifestyle", detail: "To Encourage healthy physical lifestyle among 1000 adolescents & Youths in Urban slums in Kampala by 2028.", icon: "🏃‍♂️" },
  { title: "Promoting personal hygiene", detail: "Promote personal hygiene and body care for 1000 adolescents & youths in Urban slums of Kampala by 2028.", icon: "🧼" },
  { title: "Promoting body care", detail: "Promote personal hygiene and body care for 1000 adolescents & youths in Urban slums of Kampala by 2028.", icon: "🧼" }
];

// Program Activities
const activities = [
  {
    title: "health education sessions",
    detail: "Conduct quarterly health education in 4 schools and 2 community targeting 1000 adolescents &Youth.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758448958/zannya/uploads/pomsobotwo3fac41gzze.jpg"
  },
  {
    title: "Physical fitness",
    detail: "Conduct quarterly Physical fitness activities (aerobics and fitness runs) targeting 500 adolescents & Youth in urban slums in Kampala.",
        image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758023469/zannya/uploads/images/yfrz57qsu50uvpottbzq.jpg"
  },
  {
    title: "sports tournaments",
    detail: "Conduct Bi-Annual sports tournaments to promote sexual reproductive health, health screening campaigns and medical health checkups camps in partnership with health facilities and communities.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1771841037/zannya/uploads/images/ay22i17pmbutfxhjs9av.jpg"
  },
  {
    title: "Peer to peer education",
    detail: "Conduct quarterly Peer to peer education trainings targeting 50 Peers in urban slums to Kampala to Cascade health education sessions to xxxx by dec 2028. ",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758448889/zannya/uploads/hrmh4thtitxrkrbucx0i.jpg"
  },
  {
    title: "Personal Hygiene sessions",
    detail: "Host Personal Hygiene and HH sanitation sessions for health living through demonstration events targeting 1000 youth in Urban slums of Kampala by 2028.",
    image:
      "https://res.cloudinary.com/dpwuym7xg/image/upload/v1758448824/zannya/uploads/ptbzzjwz8na0axwiajfy.jpg"
  }
];


export default function ReproductiveHealth () {
  return (
    <ProgramPage
      title="Sexual reproductive health & physical wellness"
      description=""
      image="https://res.cloudinary.com/dpwuym7xg/image/upload/v1771841014/zannya/uploads/images/d4msr22hlj15r604jczw.jpg"
      intro="To Improve SRH and Physical wellness for  Ugandan adolescents & youth living in 
      urban slums of Uganda through sexual health awareness and healthy physical lifestyles to prevent 
      lifestyle disease and foster responsible health choices."
      highlights={highlights}
      activities={activities}
      ctaText="Learn More →"
    />
  );
}