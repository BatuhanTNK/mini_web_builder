import React, { useState } from "react";

export default function FAQBlock({ data = {}, theme = {} }) {
  const { items = [] } = data;
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const styles = {
    container: {
      maxWidth: 720,
      margin: "0 auto",
      padding: 16,
      fontFamily: theme.fontFamily || "inherit",
      color: theme.color || "#222",
    },
    item: {
      borderBottom: `1px solid ${theme.borderColor || "#e0e0e0"}`,
    },
    question: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 0",
      cursor: "pointer",
      fontSize: 16,
      fontWeight: 600,
      background: "none",
      border: "none",
      width: "100%",
      textAlign: "left",
      color: "inherit",
      fontFamily: "inherit",
    },
    chevron: (isOpen) => ({
      display: "inline-block",
      width: 10,
      height: 10,
      borderRight: `2px solid ${theme.accentColor || "#555"}`,
      borderBottom: `2px solid ${theme.accentColor || "#555"}`,
      transform: isOpen ? "rotate(-135deg)" : "rotate(45deg)",
      transition: "transform 0.25s ease",
      flexShrink: 0,
      marginLeft: 12,
    }),
    answer: (isOpen) => ({
      maxHeight: isOpen ? 500 : 0,
      overflow: "hidden",
      transition: "max-height 0.3s ease",
      paddingBottom: isOpen ? 16 : 0,
      fontSize: 14,
      lineHeight: 1.6,
      color: theme.secondaryColor || "#555",
    }),
  };

  if (!items.length) {
    return <div style={styles.container}>No FAQ items available.</div>;
  }

  return (
    <div style={styles.container}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} style={styles.item}>
            <button style={styles.question} onClick={() => toggle(index)}>
              <span>{item.question}</span>
              <span style={styles.chevron(isOpen)} />
            </button>
            <div style={styles.answer(isOpen)}>
              <p style={{ margin: 0 }}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
