import React from "react";
import MainPage from "../components/MainPage";
import Layout from "../components/Layout";

function HomePage() {
  return (
    <Layout>
      <div className="w-5/12 mx-auto">
        <MainPage />
      </div>
    </Layout>
  );
}

export default HomePage;
