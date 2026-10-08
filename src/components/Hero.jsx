import Countdown from "./Countdown";

function Hero() {
  return (
    <section className="hero" id="mint">
      <div className="hero-inner">
        <div className="hero-kicker">1/1</div>

        <h1 className="hero-title">Ether Archive</h1>

        <p className="hero-description">
          A mathematical archive of Ethereum.
          <br />
          4,088 unique works generated from
          traces left on the network.
        </p>

        <Countdown />

        <div className="hero-actions">
          <a href="#presale" className="button button-primary">
            CHECK PRESALE
          </a>

          <a
            href="https://opensea.io/collection/ether-archive"
            target="_blank"
            rel="noreferrer"
            className="button button-secondary"
          >
            SETUP REMINDER ON OPENSEA
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;