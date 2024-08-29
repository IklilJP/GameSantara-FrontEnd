import React from "react";
import Layout from "../components/Layout";
import CardThread from "../components/CardThread";

function HomePage() {
  return (
    <Layout>
      <div className="w-5/12 mx-auto">
        <main className="border-l border-l-colorBorder border-r border-r-colorBorder mx-auto px-6 h-auto">
          <CardThread />
          <CardThread />
          <CardThread />
          <CardThread />
          <CardThread />
          <CardThread />
          <CardThread />
          <CardThread />
        </main>
      </div>
    </Layout>
  );
}

export default HomePage;
