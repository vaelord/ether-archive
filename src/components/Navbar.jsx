function Navbar() {
  return (
    <header className="navbar">
      <a href="/" className="nav-logo">
        ETHER ARCHIVE
      </a>

      <nav className="nav-links">
        <a href="https://opensea.io/collection/ether-archive" target="_blank" className="nav-link">MINT</a>
        <a href="#about" className="nav-link">ABOUT</a>
        <a href="#presale" className="nav-link">PRESALE CHECK</a>

        <a
          href="https://opensea.io/collection/ether-archive"
          target="_blank"
          rel="noreferrer"
          className="nav-icon"
          aria-label="OpenSea"
        >
          <img src="/logos/opensea.svg" alt="" />
          <span className="icon-tooltip">OpenSea</span>
        </a>

        <a
          href="https://x.com/EthArchiveNFT"
          target="_blank"
          rel="noreferrer"
          className="nav-icon"
          aria-label="X / Twitter"
        >
          <img src="/logos/x.svg" alt="" />
          <span className="icon-tooltip">X / Twitter</span>
        </a>
      </nav>
    </header>
  );
}

export default Navbar;