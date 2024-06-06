function Footer() {
  const currentTime = new Date().getFullYear();
  return (
    <footer>
      <h1>Footer | {currentTime}</h1>
    </footer>
  );
}

export default Footer;
