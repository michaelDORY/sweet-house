// import { GetServerSideProps, NextApiRequest } from "next";
// import { loadIdToken } from "src/auth/firebaseAdmin";
import Layout from "src/components/layout";
import HouseForm from "src/components/houseForm";

export default function Add() {
  return (
    <Layout>
      <HouseForm styles='mt-12' />
    </Layout>
  );
}
