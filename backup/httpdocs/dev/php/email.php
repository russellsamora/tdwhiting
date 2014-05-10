<?php

// Blank message to start with so we can append to it.
$message = '';

// Check that name & email aren't empty.
if(empty($_POST['email'])){
    die('Please ensure email is provided.');
}

// Construct the message
$message .= <<<TEXT
    Name: {$_POST['name']}
    Email: {$_POST['email']}
    Phone: {$_POST['phone']}
    Company: {$_POST['company']}
    Company Website: {$_POST['website']}
    Message: {$_POST['message']}    
TEXT;

// Email to send to
$to = 'russellgoldenberg@gmail.com';

// Email Subject
$subject = 'Inquiry from tdwhiting.com';

// Name to show email from
$from = 'theresa@tdwhiting.com';

// Domain to show the email from
$fromEmail = 'tdwhiting.com';

// Construct a header to send who the email is from
$header = 'From: ' . $from . '<' . $fromEmail . '>';

// Try sending the email
if(!mail($to, $subject, $message, $header)){
    die('Error sending email.');
}else{
    die(null);
}

?>