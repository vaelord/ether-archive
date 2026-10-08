import { useState } from "react";

const questions = [
  {
    question: "What is Ether Archive?",
    answer:
      "Ether Archive is a generative cosmic data-archive capturing the immutable history of the Ethereum blockchain. It converts true on-chain block data (hashes, gas usage, timestamps, and miner/validator signatures) into unique celestial and constellation maps.",
  },
  {
    question: "Are these images randomly generated?",
    answer: "No. Every single piece is deterministically rendered from actual Ethereum block data. The cryptographic hash determines the star coordinates, network activity dictates the cosmic dust density, and historical metrics define stellar temperatures and eras.",
  },
  {
    question: "Is every piece unique?",
    answer:
      "Yes. Each work is generated from a distinct set of parameters within the generation system.",
  },
  {
    question: "What is the total supply of the collection?",
    answer:
      "The collection consists of a strictly limited supply of 4,088 unique pieces, representing historical milestones and blocks on the Ethereum network.",
  },
  {
    question: "How are royalties (creator earnings) handled?",
    answer:
      "To support the continuous development and preservation of the archive, creator earnings are enforced on-chain at a healthy, collector-friendly rate.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq">
      <div className="section">
        <div className="section-label">03 / FAQ</div>

        <h2 className="section-title">Questions.</h2>

        <div className="faq-list">
          {questions.map((item, index) => {
            const isOpen = open === index;

            return (
              <div className="faq-item" key={item.question}>
                <button
                  className="faq-question"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="faq-plus">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && <div className="faq-answer">{item.answer}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;