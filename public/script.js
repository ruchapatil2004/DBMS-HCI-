  
  var accItem = document.getElementsByClassName('accordionItem');
  var accHD = document.getElementsByClassName('accordionIHeading');
  
  for (i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
  }
  
  function toggleItem() {
    var itemClass = this.parentNode.className;
    for (var i = 0; i < accItem.length; i++) {
      accItem[i].className = 'accordionItem close';
    }
    if (itemClass == 'accordionItem close') {
      this.parentNode.className = 'accordionItem open';
    }
  }


  function adminLogin() {
    const adminId = document.getElementById('admin-id').value;
    const adminPassword = document.getElementById('admin-password').value;

    // Replace 'yourAdminId' and 'yourAdminPassword' with actual admin credentials
    const validAdminId = 'admin';
    const validAdminPassword = 'password';

    if (adminId === validAdminId && adminPassword === validAdminPassword) {
      alert('Admin login successful'); // You can replace this with your logic.
    } else {
      document.getElementById('admin-login-message').classList.remove('hidden');
    }
  }

  // Add a click event listener to the admin login button
  document.getElementById('admin-login-button').addEventListener('click', adminLogin);

  // Function to handle image clicks
  function img(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imageSrc;
  }

  // Add click event listeners to image elements
  const imageElements = document.querySelectorAll('.slide');
  imageElements.forEach(function (element) {
    element.addEventListener('click', function () {
      img(element.src);
    });
  });

  // You can add more JavaScript code for your specific functionality here.
;


document.addEventListener("DOMContentLoaded", function () {
  const orderForm = document.getElementById("orderForm");

  orderForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Get form data
      const formData = new FormData(orderForm);

      // Send a POST request to the server
      fetch("/order", {
          method: "POST",
          body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
          console.log("Order submitted:", data);
          // You can handle the response data here
      })
      .catch((error) => {
          console.error("Error submitting order:", error);
      });

      // Redirect to "hotel.html"
      window.location.href = "hotel.html";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Add an event listener to handle canceling orders
  document.querySelectorAll(".cancel-order").forEach(function (cancelButton) {
      cancelButton.addEventListener("click", function () {
          const orderName = this.getAttribute("data-order-name");
          
          if (confirm(`Are you sure you want to cancel the order: ${orderName}?`)) {
              // If the user confirms the cancellation, send a request to your server
              cancelOrder(orderName);
          }
      });
  });
});

function cancelOrder(orderName) {
  fetch(`127.0.0.1:8080/order/${orderName}`, {
      method: "DELETE"
  })
  .then((response) => response.json())
  .then((data) => {
      console.log(data.message);
      // Handle success or update the UI as needed
  })
  .catch((error) => {
      console.error("Error canceling order:", error);
      // Handle errors or update the UI as needed
  });
}

