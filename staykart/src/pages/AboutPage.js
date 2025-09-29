import React from "react";

const AboutPage = () => {
  return (
    <main>
      <div
        className="about-header"
        style={{
          backgroundColor: "#f7f9f9",
          textAlign: "center",
          padding: "4rem 2rem",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "3rem",
              color: "var(--primary-color)",
            }}
          >
            Our Story
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              maxWidth: "600px",
              margin: "1rem auto 0",
            }}
          >
            Learn more about how StayKart is making it easier to find your next
            perfect stay.
          </p>
        </div>
      </div>

      <div className="container">
        <section
          className="about-content-section"
          style={{
            padding: "4rem 2rem",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          <h2>Welcome to StayKart</h2>
          <p>
            StayKart was founded with a simple goal: to create a trustworthy and
            easy-to-use platform that connects property owners with people
            looking for a place to stay. We believe that finding a rental
            property should be a pleasant and straightforward experience, not a
            complicated one.
          </p>
          <p>
            Our platform allows owners to showcase their properties to a wide
            audience, and it gives renters a curated selection of quality places
            to choose from. Whether you're looking for a weekend getaway or a
            long-term home, our mission is to ensure your next stay is just a
            few clicks away.
          </p>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
