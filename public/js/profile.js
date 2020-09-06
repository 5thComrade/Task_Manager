const easyHttp = new EasyHTTP();

const alert_location = document.querySelector(".heading");
const edit_path = alert_location.dataset.edit_path;

document.querySelector(".save_name").addEventListener("click", changeName);
document.querySelector(".save_email").addEventListener("click", changeEmail);
document
  .querySelector(".save_password")
  .addEventListener("click", changePassword);
document
  .querySelector(".delete_account")
  .addEventListener("click", deleteAccount);

async function deleteAccount(e) {
  try {
    const res = await easyHttp.delete("/users/me");
    if (res === 202) {
      window.location.href = "/register";
    } else if (res === 500) {
      const error_alert = document.createElement("div");
      error_alert.className = "alert alert-danger alert-dismissible fade show";
      error_alert.setAttribute("role", "alert");
      error_alert.innerHTML = `Something went wrong!!!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>`;

      alert_location.after(error_alert);
    }
  } catch (err) {
    const error_alert = document.createElement("div");
    error_alert.className = "alert alert-danger alert-dismissible fade show";
    error_alert.setAttribute("role", "alert");
    error_alert.innerHTML = `Something went wrong!!!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>`;

    alert_location.after(error_alert);
  }
  e.preventDefault();
}

async function changeName(e) {
  let newName = document.querySelector("#newName").value;
  const data = {
    name: newName,
  };

  try {
    const res = await easyHttp.patch(edit_path, data);
    if (res === 200) {
      document.querySelector(".name").innerHTML = `Name: ${newName}
                <button class="btn btn-link" data-toggle="modal" data-target="#nameEditModal">
                    edit
                </button>`;

      document.querySelector("#newName").value = "";
      const success_alert = document.createElement("div");
      success_alert.className =
        "alert alert-success alert-dismissible fade show";
      success_alert.setAttribute("role", "alert");
      success_alert.innerHTML = `Name Updated Successfully!!!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>`;

      alert_location.after(success_alert);
    } else if (res === 500) {
      document.querySelector("#newName").value = "";
      const error_alert = document.createElement("div");
      error_alert.className = "alert alert-danger alert-dismissible fade show";
      error_alert.setAttribute("role", "alert");
      error_alert.innerHTML = `Something went wrong!!! Name could not be updated.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>`;

      alert_location.after(error_alert);
    }
  } catch (err) {
    document.querySelector("#newName").value = "";
    const error_alert = document.createElement("div");
    error_alert.className = "alert alert-danger alert-dismissible fade show";
    error_alert.setAttribute("role", "alert");
    error_alert.innerHTML = `Something went wrong!!! Name could not be updated.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>`;

    alert_location.after(error_alert);
  }

  e.preventDefault();
}

async function changeEmail(e) {
  let newEmail = document.querySelector("#newEmail").value;
  const data = {
    email: newEmail,
  };
  try {
    const res = await easyHttp.patch(edit_path, data);
    if (res === 200) {
      document.querySelector(".email").innerHTML = `Email: ${newEmail}
              <button class="btn btn-link" data-toggle="modal" data-target="#emailEditModal">
                  edit
              </button>`;

      document.querySelector("#newEmail").value = "";
      const success_alert = document.createElement("div");
      success_alert.className =
        "alert alert-success alert-dismissible fade show";
      success_alert.setAttribute("role", "alert");
      success_alert.innerHTML = `Email Updated Successfully!!!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>`;

      alert_location.after(success_alert);
    } else if (res === 500) {
      document.querySelector("#newEmail").value = "";
      const error_alert = document.createElement("div");
      error_alert.className = "alert alert-danger alert-dismissible fade show";
      error_alert.setAttribute("role", "alert");
      error_alert.innerHTML = `Something went wrong!!! Email could not be updated.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>`;

      alert_location.after(error_alert);
    }
  } catch (err) {
    document.querySelector("#newEmail").value = "";
    const error_alert = document.createElement("div");
    error_alert.className = "alert alert-danger alert-dismissible fade show";
    error_alert.setAttribute("role", "alert");
    error_alert.innerHTML = `Something went wrong!!! Email could not be updated.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>`;

    alert_location.after(error_alert);
  }

  e.preventDefault();
}

async function changePassword(e) {
  const newPassword_1 = document.querySelector("#newPassword_1").value;
  const newPassword_2 = document.querySelector("#newPassword_2").value;
  if (newPassword_1.length < 7 || newPassword_2.length < 7) {
    document.querySelector("#newPassword_1").value = "";
    document.querySelector("#newPassword_2").value = "";
    const error_alert = document.createElement("div");
    error_alert.className = "alert alert-danger alert-dismissible fade show";
    error_alert.setAttribute("role", "alert");
    error_alert.innerHTML = `Password should have minimum of 7 characters.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>`;

    alert_location.after(error_alert);
  } else if (newPassword_1 !== newPassword_2) {
    document.querySelector("#newPassword_1").value = "";
    document.querySelector("#newPassword_2").value = "";
    const error_alert = document.createElement("div");
    error_alert.className = "alert alert-danger alert-dismissible fade show";
    error_alert.setAttribute("role", "alert");
    error_alert.innerHTML = `Passwords do not match.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>`;

    alert_location.after(error_alert);
  } else if (
    newPassword_1.toLowerCase().includes("password") ||
    newPassword_2.toLowerCase().includes("password")
  ) {
    document.querySelector("#newPassword_1").value = "";
    document.querySelector("#newPassword_2").value = "";
    const error_alert = document.createElement("div");
    error_alert.className = "alert alert-danger alert-dismissible fade show";
    error_alert.setAttribute("role", "alert");
    error_alert.innerHTML = `Password should not contain the word "password".
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>`;

    alert_location.after(error_alert);
  } else {
    const data = {
      password: newPassword_1,
    };
    try {
      const res = await easyHttp.patch(edit_path, data);
      if (res === 200) {
        document.querySelector("#newPassword_1").value = "";
        document.querySelector("#newPassword_2").value = "";
        const success_alert = document.createElement("div");
        success_alert.className =
          "alert alert-success alert-dismissible fade show";
        success_alert.setAttribute("role", "alert");
        success_alert.innerHTML = `Password Updated Successfully!!!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>`;

        alert_location.after(success_alert);
      } else if (res === 500) {
        document.querySelector("#newPassword_1").value = "";
        document.querySelector("#newPassword_2").value = "";
        const error_alert = document.createElement("div");
        error_alert.className =
          "alert alert-danger alert-dismissible fade show";
        error_alert.setAttribute("role", "alert");
        error_alert.innerHTML = `Something went wrong!!! Password could not be updated.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>`;

        alert_location.after(error_alert);
      }
    } catch (err) {
      document.querySelector("#newPassword_1").value = "";
      document.querySelector("#newPassword_2").value = "";
      const error_alert = document.createElement("div");
      error_alert.className = "alert alert-danger alert-dismissible fade show";
      error_alert.setAttribute("role", "alert");
      error_alert.innerHTML = `Something went wrong!!! Password could not be updated.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>`;

      alert_location.after(error_alert);
    }
  }
  e.preventDefault();
}
