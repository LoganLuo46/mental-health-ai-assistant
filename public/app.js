// ✅ Firebase setup
const firebaseConfig = {
    apiKey: "AIzaSyAxMmB7qVPDpthy2eYd_9S4x7yniNetoh0",
    authDomain: "mentalhealthwebthang.firebaseapp.com",
    projectId: "mentalhealthwebthang",
    storageBucket: "mentalhealthwebthang.firebasestorage.app",
    messagingSenderId: "92232452381",
    appId: "1:92232452381:web:bac7a1a0b11d2b9e88b9f4"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // ✅ Tab switching
  function showScreen(screen) {
    document.getElementById("screen-helper").classList.remove("active");
    document.getElementById("screen-search").classList.remove("active");
  
    if (screen === "helper") {
      document.getElementById("screen-helper").classList.add("active");
    } else {
      document.getElementById("screen-search").classList.add("active");
    }
  }
  
  // ✅ Search Firestore
  async function search() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const snapshot = await db.collection("mental_health_conversations").get();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    let found = false;
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.context.toLowerCase().includes(query)) {
        found = true;
        resultsDiv.innerHTML += `
          <p><strong>🧠 Patient:</strong> ${data.context}<br>
          <strong>🩺 Psychologist:</strong> ${data.response}</p><hr>`;
      }
    });
    if (!found) {
      resultsDiv.innerHTML = "<p>未找到相关内容</p>";
    }
  }
  
  // ✅ Handle form submit
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const result = document.getElementById("result");
  const loading = document.getElementById("loading");
  const responseBox = document.getElementById("responseBox");
  const copyBtn = document.getElementById("copyBtn");
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    loading.style.display = "block";
    responseBox.style.display = "none";
    result.innerText = "";
  
    try {
      const res = await fetch("https://us-central1-mentalhealthwebthang.cloudfunctions.net/getAdvice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.value }),
      });
  
      const data = await res.json();
      loading.style.display = "none";
      responseBox.style.display = "block";
      result.innerText = data.response || data.error || "未返回有效建议";
    } catch (err) {
      console.error(err);
      loading.style.display = "none";
      result.innerText = "请求失败，请检查后端是否启动";
      responseBox.style.display = "block";
    }
  });
  
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(result.innerText).then(() => {
      alert("建议已复制！");
    });
  });
  
  lucide.createIcons(); // This replaces <i data-lucide> with SVGs
