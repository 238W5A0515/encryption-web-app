document.addEventListener("DOMContentLoaded", updateOptions);

function updateOptions() {
  const algorithm = document.getElementById("algorithm").value;
  const modeSelect = document.getElementById("mode");
  modeSelect.innerHTML = "";

  const modes = algorithm === "AES"
    ? ["CBC", "CFB"]
    : ["ECB", "CBC", "CFB"];

  modes.forEach(mode => {
    const option = new Option(mode, mode);
    modeSelect.add(option);
  });

  updateIVField();
}

function updateIVField() {
  const algorithm = document.getElementById("algorithm").value;
  const mode = document.getElementById("mode").value;
  const ivContainer = document.getElementById("ivContainer");
  const ivInput = document.getElementById("iv");

  if (mode === "ECB") {
    ivContainer.style.display = "none";
  } else {
    ivContainer.style.display = "block";
    ivInput.placeholder = algorithm === "AES"
      ? "Enter IV (16 bytes for AES)"
      : "Enter IV (8 bytes for DES)";
  }
}

function encryptText() {
  const algorithm = document.getElementById("algorithm").value;
  const mode = document.getElementById("mode").value;
  const key = document.getElementById("key").value;
  const iv = document.getElementById("iv").value;
  const plaintext = document.getElementById("plaintext").value;

  if (!key) {
    alert("Please enter a key!");
    return;
  }
  if ((mode === "CBC" || mode === "CFB") && !iv) {
    alert("Please enter an IV for CBC or CFB mode!");
    return;
  }

  const keyBytes = CryptoJS.enc.Utf8.parse(key);
  const options = {
    mode: CryptoJS.mode[mode],
    padding: CryptoJS.pad.Pkcs7
  };
  if (mode !== "ECB") {
    options.iv = CryptoJS.enc.Utf8.parse(iv);
  }

  let encrypted = "";
  if (algorithm === "AES") {
    encrypted = CryptoJS.AES.encrypt(plaintext, keyBytes, options).toString();
  } else if (algorithm === "DES") {
    encrypted = CryptoJS.DES.encrypt(plaintext, keyBytes, options).toString();
  }

  document.getElementById("encryptedText").value = encrypted;
}


function decryptText() {
  const algorithm = document.getElementById("algorithm").value;
  const mode = document.getElementById("mode").value;
  const key = document.getElementById("key").value;
  const iv = document.getElementById("iv").value;
  const encryptedText = document.getElementById("encryptedText").value;

  if (!key) {
    alert("Please enter a key!");
    return;
  }
  if ((mode === "CBC" || mode === "CFB") && !iv) {
    alert("Please enter an IV for CBC or CFB mode!");
    return;
  }

  const keyBytes = CryptoJS.enc.Utf8.parse(key);
  const options = {
    mode: CryptoJS.mode[mode],
    padding: CryptoJS.pad.Pkcs7
  };
  if (mode !== "ECB") {
    options.iv = CryptoJS.enc.Utf8.parse(iv);
  }

  let decrypted = "";
  try {
    if (algorithm === "AES") {
      const bytes = CryptoJS.AES.decrypt(encryptedText, keyBytes, options);
      decrypted = bytes.toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "DES") {
      const bytes = CryptoJS.DES.decrypt(encryptedText, keyBytes, options);
      decrypted = bytes.toString(CryptoJS.enc.Utf8);
    }
  } catch (e) {
    decrypted = "Decryption failed!";
  }

  document.getElementById("decryptedText").value = decrypted;
}
