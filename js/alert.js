class Alert {
  setAlert = (msg) => {
    const alert = document.querySelector(".alert");
    const alertbox = document.createElement("div");
    alertbox.classList.add("alert-box");
    alertbox.append(document.createElement("p"));
    const btn = document.createElement("button");
    btn.classList.add("alert-btn");
    btn.innerText = "x";
    alertbox.append(btn);
    alertbox.firstChild.innerText = `${msg}`;
    alert.append(alertbox);

    btn.addEventListener("click", () => {
      const obj = new Alert();
      obj.removeAlert();
    });
    setTimeout(() => {
      const obj = new Alert();
      obj.removeAlert();
    }, 3000);
  };
  removeAlert = () => {
    const alertbox = document.querySelector(".alert");
    if (alertbox.firstChild) {
      alertbox.firstChild.remove();
    }
  };
}
