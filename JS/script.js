$(document).ready(function () {
    $('#email1').on('input', function () {
        $('#floatingInput').val($(this).val());
    });
    /////////////////////sign up  and log in page ///////////////////////////////////////////////////////
    $('#next-btn-1').prop('disabled', true);
    $('#next-btn-2').prop('disabled', true);
    $('#name, #email, #password, #username ,#email1, #password1').on('input', function () {
        let input = $(this);
        let type = input.attr('name');
        let value = input.val().trim();

        if (validateInput(type, value)) {
            input.removeClass('is-invalid').addClass('is-valid');
        } else {
            input.removeClass('is-valid').addClass('is-invalid');
            isValid = false;
        }

        if ($('#name').hasClass('is-valid') && $('#email').hasClass('is-valid')) {
            isValid = true;
        }
        if ($('#password').hasClass('is-valid')) {
            isValid2 = true;
        }
        if (isValid) {
            $('#next-btn-1').prop('disabled', false);
        } else {
            $('#next-btn-1').prop('disabled', true);
        }
        if (isValid2) {
            $('#next-btn-2').prop('disabled', false);
        } else {
            $('#next-btn-2').prop('disabled', true);
        }
    });


    $('#signup').on('submit', function (event) {
        event.preventDefault();
        let name = $('#name').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let month = $('#month').val();
        let day = $('#day').val();
        let year = $('#year').val();
        let username = $('#username').val();
        let form = $('#signup');
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let existingUser = users.find(user => user.email === email);

        if (existingUser) {
            $("#v4").addClass('block').removeClass('d-none');
            return;
        }
        if (validateInput('name', name) && validateInput('email', email) && validateInput('password', password) && validateInput('username', username)) {
            let reader = new FileReader();
            reader.onload = function (event) {
                let user = {
                    id: new Date().getTime(),
                    name: name,
                    email: email,
                    password: password,
                    BirthDate: [{
                        month: month,
                        day: day,
                        year: year
                    }
                    ],
                    img: event.target.result,
                    username: username
                };
                // localStorage.setItem('user', JSON.stringify(user));
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
                $("#v5").addClass('block').removeClass('d-none');
                setTimeout(() => {
                    window.location.href = '../Signup.html';
                }, 2000);
            };

            let imgFile = document.getElementById('img').files[0];
            if (imgFile) {
                reader.readAsDataURL(imgFile);
            }
        }else {
            $("#v3").addClass('block').removeClass('d-none');
        }
    });


    function validateInput(type, input) {
        var regix = {
            name: /^[a-zA-Z]{6,}$/,
            email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
            password: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
            username: /^[a-zA-Z0-9]{6,}$/,
        }
        if (regix[type].test(input)) {
            return true;
        } else {
            return false;
        }
    }

    function date(element, start, end) {
        let options = '';
        for (let i = start; i <= end; i++) {
            options += `<option value="${i}">${i}</option>`;
        }
        $(element).html(options);
    }

    date('#month', 1, 12);
    date('#day', 1, 31);
    date('#year', 1960, new Date().getFullYear());

    $('.counter').on('keyup', function () {
        var charCount = $(this).val().length;
        $('.name-count').text(charCount + '/50');
    });

    $('#email').on('input', function () {
        console.log('did it works?');
        $('.emailNumbertwo').val($(this).val());
    });


    $('#signin').on('submit', function (event) {
        event.preventDefault();
        const email = $('#email1').val().trim();
        const password = $('#password1').val().trim();
        if (validateInput('email', email) && validateInput('password', password)) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let authenticatedUser = users.find(user => user.email === email && user.password === password);

            if (authenticatedUser) {
                sessionStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
                // $("#v3").addClass('block').removeClass('d-none');
                $("#v2").addClass('block').removeClass('d-none');
                $('.toast').toast('show');
                setTimeout(function(){
                    window.location.href = './index.html';
                },2000)
                // $("#v1").addClass("d-block");
                // $("#v1").removeClass("d-none");

            } else {
                $("#v1").addClass('block').removeClass('d-none');

            }
        } else {
            $("#v1").addClass('block').removeClass('d-none');
        }
    });
    $('.eye').on('click',function(){
        if($('#password,#password1').prop('type')=='password'){
            $('#password,#password1').prop('type','text')
        } else {
            $('#password,#password1').prop('type','password')
        }
    })
    const input = document.querySelector("#img");
    const preview = document.querySelector("#imgpreview");


    input.addEventListener("change", updateImageDisplay);

    function updateImageDisplay() {
        const curFiles = input.files;
        if (curFiles.length === 0) {
            preview.src = "./images/user.jpg";
            preview.alt = "No files currently selected for upload";
        } else {
            const file = curFiles[0];
            if (validFileType(file)) {
                preview.src = URL.createObjectURL(file);
                preview.alt = file.name;
                preview.title = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
            } else {
                preview.src = "./images/user.jpg";
                preview.alt = `File name ${file.name}: Not a valid file type. Update your selection.`;
            }
        }
    }

    const fileTypes = [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
        "image/x-icon",
    ];

    function validFileType(file) {
        return fileTypes.includes(file.type);
    }

    function returnFileSize(number) {
        if (number < 1e3) {
            return `${number} bytes`;
        } else if (number >= 1e3 && number < 1e6) {
            return `${(number / 1e3).toFixed(1)} KB`;
        } else {
            return `${(number / 1e6).toFixed(1)} MB`;
        }
    }

    /////////////////////sign up  and log in page  /////////////Ennnnnnnnnnnnnnd///////////////////////






    //////////////home pageeeeeeee/////////////////////////////////////////
 








    //////////////home pageeeeeeee/////////////////////////////////////////









});
