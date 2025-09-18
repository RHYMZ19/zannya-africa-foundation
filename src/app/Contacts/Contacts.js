import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; // adjust path to your firebase config
import ContactPage from "./Contacts";     // your existing component

export async function getServerSideProps() {
  const snapshot = await getDocs(collection(db, "contacts")); // example collection
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return { props: { contactsData: data } };
}

export default function Contacts(props) {
  return <ContactPage {...props} />;
}