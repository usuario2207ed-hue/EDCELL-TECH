const title = document.getElementById("title");

function neonFlicker(callback) {
  let elapsed = 0;
  let intensity = 0;
  const interval = setInterval(() => {
    elapsed += 100;
    intensity += 0.02;
    if (elapsed < 60000) {
      title.style.opacity = (Math.random() < 0.05) ? 0.4 : 1;
    } else {
      title.style.opacity = Math.abs(Math.sin(intensity));
    }
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    title.style.opacity = 1;
    callback();
  }, 75000);
}

function explodeTitle() {
  const text = title.innerText;
  const rect = title.getBoundingClientRect();

  title.style.visibility = "hidden";

  for (let char of text) {
    if (char.trim() === "") continue;
    const span = document.createElement("span");
    span.innerText = char;
    span.className = "letter";
    span.style.left = rect.left + rect.width/2 + "px";
    span.style.top = rect.top + rect.height/2 + "px";
    span.style.setProperty("--x", (Math.random() * window.innerWidth - window.innerWidth/2) + "px");
    span.style.setProperty("--y", (Math.random() * window.innerHeight - window.innerHeight/2) + "px");
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 5000);
  }

  setTimeout(() => {
    title.style.visibility = "visible";
    startLoop();
  }, 10000);
}

function startLoop() {
  neonFlicker(explodeTitle);
}
startLoop();

document.querySelectorAll(".accordion-panel a").forEach(link => {
  link.addEventListener("click", function(e){
    e.preventDefault();
    const el = this;
    el.classList.add("clicked"); 
    setTimeout(()=>{ window.location.href = el.href; }, 300);
  });
});

const accButtons = document.querySelectorAll(".accordion-btn");
accButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling;
    const isActive = btn.classList.contains("active");

    accButtons.forEach(b => {
      b.classList.remove("active");
      b.nextElementSibling.style.maxHeight = null;
    });

    if (!isActive) {
      btn.classList.add("active");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const fontSize = 24;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,width,height);
  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

window.addEventListener("load", () => {

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js")
      .then(reg => console.log("✅ Service Worker registrado:", reg))
      .catch(err => console.warn("❌ Falha ao registrar SW:", err));
  }

  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.createElement("button");
    installBtn.textContent = "📲 Instalar App";
    installBtn.style.position = "fixed";
    installBtn.style.bottom = "20px";
    installBtn.style.right = "20px";
    installBtn.style.padding = "12px 24px";
    installBtn.style.fontSize = "18px";
    installBtn.style.background = "#00cc00";
    installBtn.style.color = "#fff";
    installBtn.style.border = "none";
    installBtn.style.borderRadius = "8px";
    installBtn.style.cursor = "pointer";
    installBtn.style.zIndex = "9999";
    installBtn.style.animation = "pulse 1.2s infinite alternate";
    document.body.appendChild(installBtn);

    installBtn.addEventListener("click", async () => {
      installBtn.remove();
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("Resultado da instalação:", outcome);
      deferredPrompt = null;
    });
  });

  const doarBtnFixo = document.getElementById("doarBtnFixo");
  doarBtnFixo.addEventListener("click", () => {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
      <div class="popup-content">
        <div class="popup-close" id="popupClose">✖</div>
        <h2>“O Senhor te concederá abundância de bens... abrirá o céu, para dar chuva à tua terra e abençoar todo o trabalho das tuas mãos.”</h2>
        <h2>Deuteronômio 28:11-12</h2>
        <button id="doarBtn">Doe 💚</button>
      </div>
    `;
    document.body.appendChild(popup);

    const doarBtn = document.getElementById("doarBtn");
    const popupClose = document.getElementById("popupClose");
    let clicouDoar = false;

    doarBtn.addEventListener("click", () => {
      clicouDoar = true;
      window.open("https://link.mercadopago.com.br/abrindoportas", "_blank");
      popup.remove();
    });

    popupClose.addEventListener("click", () => {
      popup.remove();
      if (!clicouDoar) {
        doarBtnFixo.style.display = "block";
      }
    });
  });
});
