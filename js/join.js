function sign_up() {
  let email = document.querySelector("#login-form #user-email").value;
  let password = document.querySelector("#login-form #user-pw").value;
  let confirmPassword = document.querySelector(
    "#login-form #user-pw_confirm"
  ).value;
  let name = document.querySelector("#login-form #user-name").value;
  let birth = document.querySelector("#login-form #user-birth").value;
  let phone = document.querySelector("#login-form #user-phone").value;
  let sex = document.querySelector("#login-form #user-sex").value;

  $.ajax({
    type: "POST",
    url: "/user/signup",
    data: {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      name: name,
      birth: birth,
      phone: phone,
      sex: sex,
    },
    success: function (response) {
      let cons = response["all_cons"];
      for (let i = 0; i < cons.length; i++) {
        let name = cons[i]["name"];
        let server = cons[i]["server"];
        let p_num = cons[i]["p_num"];
        let date = cons[i]["date"];
        let time = cons[i]["time"];
        let demand = cons[i]["demand"];

        let temp_html = `<tr>
                                                    <td>${name}</td>
                                                    <td>${server}</td>
                                                    <td>${p_num}</td>
                                                    <td>${date}</td>
                                                    <td>${time}</td>
                                                    <td>${demand}</td>
                                                </tr>`;
        $("#con_list").append(temp_html);
      }
    },
  });
}
