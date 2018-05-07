<?php

$connect=mysqli_connect('localhost:3307','root','','mydatabase');

if(mysqli_connect_errno($connect))
{
		echo 'Failed to connect';
}

?>