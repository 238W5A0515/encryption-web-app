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
    mode
