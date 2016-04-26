<?php

require_once '../../vendor/autoload.php';

try {
    $config = Spyc::YAMLLoad('../../services/config/mail.yml');
    $params = $_POST;
    if (!$params['email'] || !filter_var($params['email'], FILTER_VALIDATE_EMAIL)) throw new Exception('Please provide a valid email address.');
    if (!$params['message']) throw new Exception('Please provide a message.');
    if ($params['company']) throw new Exception('Spam detected.');

    $loader = new Twig_Loader_Filesystem('../../resources/assets/templates');
    $twig = new Twig_Environment($loader, array(
        'cache' => '../../cache',
    ));
    $body1 = $twig->render('email.html', array('email' => $params['email'], 'message' => $params['message']));
    $body2 = $twig->render('emailcopy.html', array('email' => $params['email'], 'message' => $params['message']));

    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = $config['security'];
    $mail->Host = $config['host'];
    $mail->Port = $config['port'];
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->SMTPKeepAlive = true;
    $mail->Timeout = 60; // set the timeout (seconds)
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = '8bit';
    $mail->ContentType = 'text/html; charset=utf-8\r\n';

    $mail->setFrom($params['email']);
    $mail->addAddress($config['sender']);
    $mail->isHTML(true);

    $mail->Subject = "Message from the WOW Global website";
    $mail->Body = $body1;

    if (!$mail->send()) {
        throw new Exception('There was an error sending your email. Please try again later.');
    }

    $mail->setFrom($config['sender'], 'WOW Global Solutions');
    $mail->addAddress($params['email']);

    $mail->Subject = "Thanks for contacting us";
    $mail->Body = $body2;
    $mail->send();
    $mail->SmtpClose();

    echo json_encode(array('success' => true));
} catch (Exception $e) {
    echo json_encode(array(
        'error' => $e->getMessage()
    ));
}