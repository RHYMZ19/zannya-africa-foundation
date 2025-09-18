import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";  // adjust path to your firebase config
import Donates from "../Donates"; // your existing component

export async function getServerSideProps() {
  const snapshot = await getDocs(collection(db, "skills"));
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return { props: { skills: data } };
}

export default function Donates(props) {
  return <Donates {...props} />;
}