import Layout from "src/components/layout";
import FirebaseAuth from "src/components/firebaseAuth";
import { GetServerSideProps, NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";

export default function Auth() {
  return (
    <Layout>
      <FirebaseAuth />
    </Layout>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
//   const uid = loadIdToken(req as NextApiRequest)
//
//   if(uid) {
//     res.setHeader('location', '/')
//     res.statusCode = 302
//     res.end()
//   }
//
//   return {props: {}}
// }
