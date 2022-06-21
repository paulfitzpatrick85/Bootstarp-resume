function sendMail(contactForm) {      //entering form as parameter
    emailjs.send("service_coiw0ok","PaulFitz", {        // 1st arg = service id, 2nd = template id
        "from_name": contactForm.name.value,   // 3rd = object containing the parameters
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
    .then(
        function(response) {           
            console.log("SUCCESS", response);   // passing strig and then response object(and error object below)
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page when form submitted
}