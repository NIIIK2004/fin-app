// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../app/providers/firebase";

// export const HomePage = () => {
//   const handleTest = async () => {
//     await setDoc(doc(db, "test", "testDoc"), {
//       hello: "world",
//       time: Date.now(),
//     });

//     console.log("записано");
//   };

//   return (
//     <div>
//       <h1>ФинАссистент</h1>
//       <button onClick={handleTest}>Тест Firebase</button>
//     </div>
//   );
// };