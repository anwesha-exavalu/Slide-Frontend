import React, { useState } from "react";
import styles from "./PolicyCards.module.css";
import { Card, Col, Row } from "antd";

export function PolicyCards() {
  // State to keep track of the active policy
  const [activePolicy, setActivePolicy] = useState("Commercial Property");

  const policies = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b4e5b89c7fe49a3fae359da4f36eec68945dcde61890aecd430ef4ce59a054c1?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa",
      name: "Commercial Property",
    },
    // {
    //   icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/688eeecf7f9bb910c08e4d204d0fc814d63ef100aeda5f3221d814b91089db41?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa",
    //   name: "Commercial Auto",
    // },
    // {
    //   icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/43e91dd543a8c6d01bf96f5db18767ca9e996dc38eaf24bc0b1821d699bba4d7?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa",
    //   name: "Worker Compensation",
    // },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b843deeb74bf6b82930f8df13bb17a40e849c878762295a9db87885d570ee9c4?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa",
      name: "General Liability",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ea1e8212960372688bf642fde669f9a35c12cde8a29f1827f86d871b9328022?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa",
      name: "Professional Liability",
    },
  ];

  return (
    <section >
      <Row gutter={[4, 4]} justify={"space-between"} >
        {policies.map((policy, index) => (
          <Col
            key={index}
            xs={20}
            sm={10}
            md={12}
            lg={10}
            xl={6}
            className={`${styles.policyCard} ${
              activePolicy === policy.name ? styles.activeCard : ""
            }`}
          >
            <Card
              bordered={true}
              className="policyCard"
              onClick={() => setActivePolicy(policy.name)}  // Set active policy on click
              style={{
                height: "100px",
                width: "330px",
                borderRadius: "12px",
                boxShadow: "0 30px 60px rgba(138, 159, 158, 0.2)",
                borderTopColor: "steelblue",
                backgroundColor: activePolicy === policy.name ? "#2d67da" : "white",
                color: activePolicy === policy.name ? "white" : "black",
                cursor: "pointer", // Makes the card look clickable
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={policy.icon} alt="" className="policyIcon" /> 
                <p
                  style={{
                    fontWeight: "660",
                    marginLeft: "10px",
                    marginTop: "11px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {policy.name}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default PolicyCards;
