let enabled = true;

document.getElementById("toggle").addEventListener("click", () => {
  enabled = !enabled;
  document.getElementById("status").innerHTML =
    "Status: <b>" + (enabled ? "Enabled" : "Disabled") + "</b>";
  document.getElementById("toggle").innerText = enabled ? "Disable" : "Enable";

  chrome.storage.local.set({ enabled });
});
