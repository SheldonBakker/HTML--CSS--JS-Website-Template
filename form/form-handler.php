<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $surname = htmlspecialchars($_POST['surname']);
    $phone = htmlspecialchars($_POST['phone']);
    $id_number = htmlspecialchars($_POST['id_number']);
    $email = htmlspecialchars($_POST['email']);
    $street_address = htmlspecialchars($_POST['street_address']);
    $house_unit_number = htmlspecialchars($_POST['house_unit_number']);
    $complex_name = htmlspecialchars($_POST['complex_name']);
    $residence_type = htmlspecialchars($_POST['residence_type']);
    $city = htmlspecialchars($_POST['city']);
    $province = htmlspecialchars($_POST['province']);
    $postcode = htmlspecialchars($_POST['postcode']);
    $country = htmlspecialchars($_POST['country']);
    $bank = htmlspecialchars($_POST['bank']);
    $account_number = htmlspecialchars($_POST['account_number']);
    $account_type = htmlspecialchars($_POST['account_type']);

    // Prepare the email content
    $to = 'sheldon@shikkidesign.co.za'; // Your email address
    $subject = 'New Form Submission';
    $message = "
    <html>
    <head>
        <title>New Form Submission</title>
    </head>
    <body>
        <h2>Form Submission Details</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Surname:</strong> $surname</p>
        <p><strong>Phone Number:</strong> $phone</p>
        <p><strong>ID Number:</strong> $id_number</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Street Address:</strong> $street_address</p>
        <p><strong>House/Unit Number:</strong> $house_unit_number</p>
        <p><strong>Complex Name:</strong> $complex_name</p>
        <p><strong>Residence Type:</strong> $residence_type</p>
        <p><strong>City:</strong> $city</p>
        <p><strong>Province:</strong> $province</p>
        <p><strong>Postcode/Zip:</strong> $postcode</p>
        <p><strong>Country:</strong> $country</p>
        <p><strong>Bank:</strong> $bank</p>
        <p><strong>Account Number:</strong> $account_number</p>
        <p><strong>Account Type:</strong> $account_type</p>
    </body>
    </html>
    ";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: <sheldon@shikkidesign.co.za>' . "\r\n";

    // Send the email
    mail($to, $subject, $message, $headers);

    // Send a thank-you email to the user
    $user_subject = 'Thank You for Your Submission';
    $user_message = "
    <html>
    <head>
        <title>Thank You</title>
    </head>
    <body>
        <h2>Thank You for Your Submission</h2>
        <p>Dear $name,</p>
        <p>Thank you for getting in touch. We have received your submission and will be in touch shortly.</p>
    </body>
    </html>
    ";

    $user_headers = "MIME-Version: 1.0" . "\r\n";
    $user_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $user_headers .= 'From: <sheldon@shikkidesign.co.za>' . "\r\n";

    // Send the thank-you email
    mail($email, $user_subject, $user_message, $user_headers);

    // Redirect to thank you page after 5 seconds
    header("Refresh:5; url=/thank-you.html");
    echo "<html><body><h1>Thank you for your submission! You will be redirected shortly.</h1></body></html>";
}
?>
