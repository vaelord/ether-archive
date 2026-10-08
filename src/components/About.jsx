function About() {
  return (
    <section className="about" id="about">
      <div className="section">
        <div className="section-label">02 / ABOUT</div>

        <div className="about-grid">
          <div>
            <h2 className="section-title">
              An archive
              <br />
              built from traces.
            </h2>

            <div className="about-text">
              <p>
                Ether Archive is a collection of 4,088 unique 1/1 works.
              </p>

              <p>
                Each work is generated through a mathematical system. The
                system transforms network data into a visual structure.
              </p>

              <p>
                No two archives are identical. Every piece represents a
                different state within the system.
              </p>
            </div>
          </div>

          <div className="data-list">
            <div className="data-row">
              <span>COLLECTION</span>
              <span className="data-value">ETHER ARCHIVE</span>
            </div>
            <div className="data-row">
              <span>SUPPLY</span>
              <span className="data-value">4,088</span>
            </div>
            <div className="data-row">
              <span>FORMAT</span>
              <span className="data-value">1/1</span>
            </div>
            <div className="data-row">
              <span>GENERATION</span>
              <span className="data-value">MATHEMATICAL</span>
            </div>
            <div className="data-row">
              <span>NETWORK</span>
              <span className="data-value">ETHEREUM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;