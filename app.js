const selectForm = (ids) => {
  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const login = document.querySelector(".login");
      const signup = document.querySelector(".signup");
      if (btn.id == ids[0]) {
        btn.nextElementSibling.classList.remove("gray");
        btn.nextElementSibling.classList.add("darkgray");
        btn.classList.remove("darkgray");
        btn.classList.add("gray");
        signup.classList.add("hide");
        login.classList.remove("hide");
      } else {
        btn.previousElementSibling.classList.remove("gray");
        btn.previousElementSibling.classList.add("darkgray");
        btn.classList.remove("darkgray");
        btn.classList.add("gray");
        signup.classList.remove("hide");
        login.classList.add("hide");
      }
    });
  });
};

const ids = ["login", "signup"];
selectForm(ids);

// headers

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append(
  "X-RapidAPI-Key",
  "8fd61c192emshb1fac7beb8b6214p14172bjsn2d3ae8bb6896"
);
headers.append("X-RapidAPI-Host", "demo-project75962.p.rapidapi.com");

// validate class
class ValidateAuth {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;

    this.requestClick();
  }

  requestClick = async () => {
    let self = this;
    self.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = new Array();
      let i = 0;
      this.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        inputs[i++] = input.value.toString();
      });
      if (self.validateInputs(inputs)) {
        console.log("true");
        if (this.form.id === "login") {
          this.loginAPI(inputs);
        } else if (this.form.id === "signup") {
          this.signupAPI(inputs);
        }
      }
    });
  };
  loginAPI = async (inputs) => {
    const url = "https://demo-project75962.p.rapidapi.com/auth/login";
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        username: `${inputs[0]}`,
        password: `${inputs[1]}`,
      }),
    };
    try {
      const response = await fetch(url, options);
      console.log(response.status);
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("auth", 1);
        localStorage.setItem("token", result.access_token);
        this.form.submit();
      } else {
        const obj = new Alert();
        obj.removeAlert();
        obj.setAlert(result["message"]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  signupAPI = async (inputs) => {
    const url = "https://demo-project75962.p.rapidapi.com/auth/user";
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        username: `${inputs[0]}`,
        email: `${inputs[1]}`,
        password: `${inputs[2]}`,
      }),
    };
    try {
      const response = await fetch(url, options);
      console.log(response.status);
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        localStorage.setItem("auth", 1);
        this.form.submit();
      } else {
        const obj = new Alert();
        obj.removeAlert();
        obj.setAlert(result["message"]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  validateInputs = (inputs) => {
    let str = inputs[0].trim();
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === " ") {
        this.boxAlert("username", true);
        return false;
      } else {
        this.boxAlert("username", false);
      }
    }
    str = inputs[inputs.length - 1].trim();
    if (str.length < 8) {
      this.boxAlert("password", true);
      return false;
    } else {
      this.boxAlert("password", false);
    }
    return true;
  };
  boxAlert = (type, status) => {
    let self = this;
    let str = this.form.id + "-" + type;
    const box = document.querySelector(`#${str}`);
    if (status) {
      box.style.borderBottom = "1px solid red";
    } else {
      box.style.borderBottom = "1px solid green";
    }
  };
}

const loginFields = ["login-username", "login-password"];
const signupFields = ["signup-username", "signup-email", "signup-password"];
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");

if (loginForm) {
  const login = new ValidateAuth(loginForm, loginFields);
}
if (signupForm) {
  const signup = new ValidateAuth(signupForm, signupFields);
}
