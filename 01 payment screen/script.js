function sendPayment() {
  const phoneNumber = document.querySelector("#phoneNumberInput").value;
  const amount = 599;
  const requestBody = {
    amount,
    phoneNumber,
  };

  fetch("http://localhost:8080/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.ok) {
        alert("Payment sent successfully");
      } else {
        alert("Error sending payment");
    }
}).catch((error) => {
    console.error("Error:", error);
    alert("Payment Failed something went wrong");
    });
}

function getUPIPayment(upiName) {
  fetch(`http://localhost:8080/${upiName}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Payment with ${upiName} triggered successfully`);
      } else {
        console.error(`Error triggering ${upiName} payment`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const isAndroid = /Android/.test(navigator.userAgent);

document.addEventListener("DOMContentLoaded", () => {
  const phonePeButton = document.getElementById("phonePeButton");
  const googlePayButton = document.getElementById("googlePayButton");
    console.log("phpy", phonePeButton);
    console.log("gglpy",googlePayButton);
  if (isiOS) {
    document.getElementById("paytmButton").style.display = "none";
    document.getElementById("bhimButton").style.display = "none";

    phonePeButton.addEventListener("click", () => {
        alert()
        getUPIPayment("PhonePe");
    });
    
    googlePayButton.addEventListener("click", () => {
        alert()
      getUPIPayment("GooglePay");
    });
  } else if (isAndroid) {
    const upiButtons = document.querySelectorAll(".payment-card");

    upiButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const upiName = button
          .querySelector(".payment-method-name")
          .textContent.trim();
        getUPIPayment(upiName);
      });
    });
  } else {
    const paymentMethods = document.querySelector(".payment-methods");
    paymentMethods.innerHTML = "<h2>No payment options available</h2>";
  }

  const sendButton = document.querySelector("button");
  sendButton.addEventListener("click", sendPayment);
});
