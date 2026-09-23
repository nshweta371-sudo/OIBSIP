// ==========================================
// GET USERS FROM LOCAL STORAGE
// ==========================================

function getUsers() {

    return JSON.parse(
        localStorage.getItem("users")
    ) || [];

}


// ==========================================
// SAVE USERS
// ==========================================

function saveUsers(users) {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}


// ==========================================
// SHA-256 PASSWORD HASH
// ==========================================

async function hashPassword(password) {

    const encoder =
        new TextEncoder();

    const data =
        encoder.encode(password);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(
            byte =>
                byte.toString(16).padStart(2, "0")
        )
        .join("");

}


// ==========================================
// REGISTRATION
// ==========================================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const username =
                document
                    .getElementById("registerUsername")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("registerPassword")
                    .value;


            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            const error =
                document.getElementById(
                    "registerError"
                );


            const success =
                document.getElementById(
                    "registerSuccess"
                );


            error.textContent = "";

            success.textContent = "";


            // -------------------------------
            // BASIC VALIDATION
            // -------------------------------

            if (
                username === "" ||
                email === "" ||
                password === "" ||
                confirmPassword === ""
            ) {

                error.textContent =
                    "Please fill in all fields.";

                return;

            }


            // -------------------------------
            // PASSWORD LENGTH
            // -------------------------------

            if (password.length < 8) {

                error.textContent =
                    "Password must contain at least 8 characters.";

                return;

            }


            // -------------------------------
            // PASSWORD NUMBER
            // -------------------------------

            if (!/\d/.test(password)) {

                error.textContent =
                    "Password must contain at least one number.";

                return;

            }


            // -------------------------------
            // CONFIRM PASSWORD
            // -------------------------------

            if (password !== confirmPassword) {

                error.textContent =
                    "Passwords do not match.";

                return;

            }


            // -------------------------------
            // GET EXISTING USERS
            // -------------------------------

            const users = getUsers();


            // -------------------------------
            // DUPLICATE CHECK
            // -------------------------------

            const existingUser =
                users.find(
                    user =>
                        user.email === email ||
                        user.username.toLowerCase()
                            === username.toLowerCase()
                );


            if (existingUser) {

                error.textContent =
                    "Username or email already exists.";

                return;

            }


            // -------------------------------
            // HASH PASSWORD
            // -------------------------------

            const hashedPassword =
                await hashPassword(password);


            // -------------------------------
            // CREATE USER
            // -------------------------------

            const newUser = {

                username: username,

                email: email,

                password: hashedPassword

            };


            users.push(newUser);


            saveUsers(users);


            // -------------------------------
            // SUCCESS
            // -------------------------------

            success.textContent =
                "Registration successful! Redirecting to login...";


            registerForm.reset();


            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                1500
            );

        }
    );

}


// ==========================================
// LOGIN
// ==========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const error =
                document.getElementById(
                    "loginError"
                );


            error.textContent = "";


            // -------------------------------
            // BASIC VALIDATION
            // -------------------------------

            if (
                email === "" ||
                password === ""
            ) {

                error.textContent =
                    "Please enter your email and password.";

                return;

            }


            // -------------------------------
            // GET USERS
            // -------------------------------

            const users = getUsers();


            // -------------------------------
            // HASH ENTERED PASSWORD
            // -------------------------------

            const hashedPassword =
                await hashPassword(password);


            // -------------------------------
            // FIND USER
            // -------------------------------

            const user =
                users.find(
                    user =>
                        user.email === email &&
                        user.password === hashedPassword
                );


            // -------------------------------
            // INVALID LOGIN
            // -------------------------------

            if (!user) {

                error.textContent =
                    "Invalid email or password.";

                return;

            }


            // -------------------------------
            // CREATE SESSION
            // -------------------------------

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    username: user.username,
                    email: user.email
                })
            );


            // -------------------------------
            // REDIRECT
            // -------------------------------

            window.location.href =
                "dashboard.html";

        }
    );

}


// ==========================================
// PROTECT DASHBOARD
// ==========================================

const dashboardUsername =
    document.getElementById(
        "dashboardUsername"
    );


if (dashboardUsername) {

    const loggedInUser =
        JSON.parse(
            localStorage.getItem(
                "loggedInUser"
            )
        );


    // -------------------------------
    // NO SESSION
    // -------------------------------

    if (!loggedInUser) {

        window.location.href =
            "index.html";

    }

    else {

        document.getElementById(
            "dashboardUsername"
        ).textContent =
            loggedInUser.username;


        document.getElementById(
            "dashboardEmail"
        ).textContent =
            loggedInUser.email;

    }

}


// ==========================================
// LOGOUT
// ==========================================

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            // Clear login session

            localStorage.removeItem(
                "loggedInUser"
            );


            // Go back to login

            window.location.href =
                "index.html";

        }
    );

}