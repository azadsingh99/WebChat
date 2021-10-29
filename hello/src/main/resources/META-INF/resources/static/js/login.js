const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});



//function to trigger when user is doing login
function login(event) {
	event.preventDefault();

	const email = document.getElementById("login_email").value;
	const password = document.getElementById("login_password").value;

	console.log(email, password);

	if(email == "" || password == ""){
		swal("OOPS!!!!!!", "Fill Up all the Columns", "warning");
		return;
	}

	fetch("http://localhost:8086/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: email, 
			password: password, 
			username: ""})
	})
	.then(data => {
		if (data.status == 200) {
			return data.json();
		} else {
			swal("OOPS!!!!!!", "Username or Password Incorrect", "error");
			return;
		}
	})
	.then(res => {
		if(res) {
			swal("Great!", "LoggedIn Successfully", "success");
			
			localStorage.setItem('loggedUser', JSON.stringify(res));
			console.log(res);
			setTimeout(()=>{
				window.open('chat', "_self");
			},500);
		}
	})
	.catch(err => {
		swal("OOPS!!!!!!", "Account Does't Exist", "error");
	})
}


//function to trigger when user is doing signup.
function signup(event){
	event.preventDefault();

	const username = document.getElementById("name").value;
	const user_email = document.getElementById("email").value;
	const user_password = document.getElementById("password").value;
	const confirm_password = document.getElementById("confirm-password").value;
	
	if(username == "" || user_email == "" || user_password=="" || confirm_password== ""){
		swal("OOPS!!!!!!", "Fill Up all the Columns", "warning");
		return;
	}

	console.log(username, user_email, user_password);
	
	if(user_password != confirm_password){
		swal("OOPS!!!!!!", "Passsword Mis-match", "error");
	}else{
		fetch("http://localhost:8086/signup" , {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				email: user_email,
				password: user_password
			})
		}).then(data => data).then(res => {
			if (res.status == 200) {
				swal("Great!", "Signed Up Successfully", "success");
				setTimeout(()=>{
					window.open('/', "_self");
				},500);
			} else {
				swal("OOPS!!!!!!", "Account Already Exists", "error")
			}
	
		})
		.catch(err => {
			swal("OOPS!!!!!!", "Account Exists", "warning")
		})
	}

}