<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Enquiry</title>
</head>
<body>
    <h2>You have received a new enquiry.</h2>

    <p><strong>Name:</strong> {{ $maildata['name'] }}</p>
    <p><strong>Email:</strong> {{ $maildata['email'] }}</p>
    <p><strong>Phone:</strong> {{ $maildata['phone'] }}</p>
    <p><strong>Subject:</strong> {{ $maildata['subject'] }}</p>
    <p><strong>Message:</strong> {{ $maildata['message'] }}</p>

    <br>
    <p>Thanks,<br>Skyline Construction Team</p>
</body>
</html>
