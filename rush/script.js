document.addEventListener("DOMContentLoaded", () => {
  const toTop = document.createElement("button");
  toTop.textContent = "↑ Top";
  Object.assign(toTop.style, {
    position: "fixed", right: "18px", bottom: "18px",
    padding: "10px 12px", borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(0,0,0,0.6)", color: "#fff",
    cursor: "pointer", display: "none", backdropFilter: "blur(8px)", zIndex: 1001
  });
  document.body.appendChild(toTop);
  window.addEventListener("scroll", () => { toTop.style.display = window.scrollY > 300 ? "block" : "none"; });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
