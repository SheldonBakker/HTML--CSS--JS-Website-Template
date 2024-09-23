<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // reCAPTCHA secret key
    $recaptchaSecret = 'Your_Secret';
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Verify the reCAPTCHA response
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
    $responseKeys = json_decode($response, true);

    if (intval($responseKeys["success"]) !== 1) {
        echo 'Please complete the CAPTCHA';
    } else {
        // If CAPTCHA is valid, process the form data
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $message = $_POST['message'];

        // Set the email details
        $to = "sheldon@shikkidesign.co.za";
        $subject = "New Contact Query from $name";
        $body = "Name: $name\nPhone: $phone\nEmail: $email\n\nMessage:\n$message";
        $headers = "From: $email";

        // Send the email
        if (mail($to, $subject, $body, $headers)) {
            echo "Message sent successfully!";
        } else {
            echo "Failed to send message.";
        }
    }
}
?>


