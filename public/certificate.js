document.getElementById("verificationForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const certificateNo = document.getElementById("certificate-id").value.trim();

  // const loader = document.getElementById("loader");
  const resultDiv = document.getElementById("verificationResult");
  
  //Reset UI
  resultDiv.innerHTML = "";
  resultDiv.style.display = "none";
  //loader.style.display = "block";


  if(!certificateNo){
    //loader.style.display = "none";
    resultDiv.innerHTML = "<p style='color:red;'>Please enter a certificate number.</p>";
    resultDiv.style.display = "block";
    return;
  }

  try {
    // Call backend API instead of certificate.json
    const response = await fetch(`/verify/${encodeURIComponent(certificateNo)}`);

    // const response = await fetch(`http://localhost:5000/verify/${encodeURIComponent(certificateNo)}`);

    if (!response.ok) throw new Error("Verification request failed");

    const result = await response.json();

    const resultImage = document.createElement("img");
    const resultMessage = document.createElement("p");

    if (result.success) {
      resultImage.src = "./style/check.png";
      resultMessage.textContent = "Verified";
      resultMessage.style.color = "green";
    } else {
      resultImage.src = "./style/cross.png";
      resultMessage.textContent = "Not Verified";
      resultMessage.style.color = "red";
    }

    resultDiv.appendChild(resultImage);
    resultDiv.appendChild(resultMessage);
    resultDiv.style.display = "flex";

  } catch (error) {
    //loader.style.display = "none";
    resultDiv.innerHTML = "<p style='color: red;'>An error occurred while verifying the data. Please try again.</p>";
    resultDiv.style.display = "block";
    console.error(error);
  }
});

document.getElementById("verificationResult").addEventListener("click", function () {
  this.style.display = "none";
});
