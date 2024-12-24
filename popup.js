// Conversion logic: BigInt-based (same as before)
document.addEventListener('DOMContentLoaded', () => {
    const ethInput = document.getElementById('ethInput');
    const gweiInput = document.getElementById('gweiInput');
    const weiInput = document.getElementById('weiInput');
  
    function parseEthToWei(ethStr) {
      if (!ethStr) return 0n;
      const [intPart, fracPart = ""] = ethStr.split(".");
      let frac = fracPart.slice(0, 18);
      while (frac.length < 18) frac += "0";
      const weiStr = intPart + frac;
      return weiStr ? BigInt(weiStr) : 0n;
    }
  
    function parseGweiToWei(gweiStr) {
      if (!gweiStr) return 0n;
      const [intPart, fracPart = ""] = gweiStr.split(".");
      let frac = fracPart.slice(0, 9);
      while (frac.length < 9) frac += "0";
      const weiStr = intPart + frac;
      return weiStr ? BigInt(weiStr) : 0n;
    }
  
    function parseWeiStringToBN(weiStr) {
      if (!weiStr) return 0n;
      try {
        return BigInt(weiStr);
      } catch {
        return 0n;
      }
    }
  
    function weiToEthString(weiBN) {
      const weiStr = weiBN.toString();
      const len = weiStr.length;
      if (len <= 18) {
        const padded = weiStr.padStart(19, "0");
        const intPart = padded.slice(0, padded.length - 18);
        let fracPart = padded.slice(-18).replace(/0+$/, "");
        return fracPart ? `${intPart}.${fracPart}` : intPart;
      } else {
        const intPart = weiStr.slice(0, len - 18);
        let fracPart = weiStr.slice(len - 18).replace(/0+$/, "");
        return fracPart ? `${intPart}.${fracPart}` : intPart;
      }
    }
  
    function weiToGweiString(weiBN) {
      const weiStr = weiBN.toString();
      const len = weiStr.length;
      if (len <= 9) {
        const padded = weiStr.padStart(10, "0");
        const intPart = padded.slice(0, padded.length - 9);
        let fracPart = padded.slice(-9).replace(/0+$/, "");
        return fracPart ? `${intPart}.${fracPart}` : intPart;
      } else {
        const intPart = weiStr.slice(0, len - 9);
        let fracPart = weiStr.slice(len - 9).replace(/0+$/, "");
        return fracPart ? `${intPart}.${fracPart}` : intPart;
      }
    }
  
    function weiBNToString(weiBN) {
      return weiBN.toString();
    }
  
    function updateFromEth() {
      const ethStr = ethInput.value.trim();
      const weiBN = parseEthToWei(ethStr);
      gweiInput.value = weiToGweiString(weiBN);
      weiInput.value = weiBNToString(weiBN);
    }
  
    function updateFromGwei() {
      const gweiStr = gweiInput.value.trim();
      const weiBN = parseGweiToWei(gweiStr);
      ethInput.value = weiToEthString(weiBN);
      weiInput.value = weiBNToString(weiBN);
    }
  
    function updateFromWei() {
      const weiStr = weiInput.value.trim();
      const weiBN = parseWeiStringToBN(weiStr);
      ethInput.value = weiToEthString(weiBN);
      gweiInput.value = weiToGweiString(weiBN);
    }
  
    ethInput.addEventListener('input', updateFromEth);
    gweiInput.addEventListener('input', updateFromGwei);
    weiInput.addEventListener('input', updateFromWei);
  
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const targetId = e.target.dataset.target;
        const targetInput = document.getElementById(targetId);
        navigator.clipboard.writeText(targetInput.value).then(() => {
          alert(`Copied: ${targetInput.value}`);
        });
      });
    });
  });
