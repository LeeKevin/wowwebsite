<?php

ob_start();
require '../../services/contactService.php';
echo ob_get_clean();
