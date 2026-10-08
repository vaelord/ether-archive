import { useState } from "react";

function PresaleCheck() {
  const [wallet, setWallet] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

const handleCheck = async (event) => {
  event.preventDefault();

  if (!wallet.trim()) {
    setResult("ENTER A WALLET ADDRESS.");
    return;
  }

  setLoading(true);
  setResult(null);

  try {
    const API_URL = import.meta.env.VITE_API_URL;

    const response = await fetch(
      `${API_URL}/api/presale/check`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          wallet,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setResult(
        data.error || "UNABLE TO CHECK WALLET."
      );
      return;
    }

    if (data.eligible) {
      setResult(
        "WALLET VERIFIED — YOU ARE ELIGIBLE."
      );
    } else {
      setResult(
        "WALLET NOT FOUND IN THE PRESALE ARCHIVE."
      );
    }

  } catch (error) {
    console.error(error);

    setResult(
      "BACKEND CONNECTION ERROR."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="presale" id="presale">
      <div className="section">
        <div className="section-label">01 / PRESALE CHECK</div>

        <h2 className="section-title">
          Is your wallet
          <br />
          in the archive?
        </h2>

        <p className="section-description">
          Enter your Ethereum wallet address to verify whether it has been
          selected for the Ether Archive presale.
        </p>

        <form className="presale-form" onSubmit={handleCheck}>
          <input
            className="wallet-input"
            type="text"
            value={wallet}
            onChange={(event) => setWallet(event.target.value)}
            placeholder="0x..."
            spellCheck="false"
            autoComplete="off"
            aria-label="Ethereum wallet address"
          />

          <button className="presale-button" type="submit" disabled={loading}>
            {loading ? "CHECKING..." : "CHECK WALLET"}
          </button>
        </form>

        {result && (
          <p className="section-description presale-result">
            {result}
          </p>
        )}
      </div>
    </section>
  );
}

export default PresaleCheck;