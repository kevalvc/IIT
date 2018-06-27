<?php

// $connect=mysqli_connect('localhost:3307','root','','mydatabase');
//
// if(mysqli_connect_errno($connect))
// {
// 		echo 'Failed to connect';
// }


	$con = mysqli_connect('localhost:3307','root','', "mydatabase");
	if ($con === false) {
			die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$typer = $_GET['type'];
	$sql = "SELECT ques FROM qniit where type='$typer'";
	$result = mysqli_query($con, $sql) or die ("Query failed");
	$num = mysqli_affected_rows($con);
	// foreach($sql as $data)
	// {
	//     echo '...wq' . $data . 'qw...';
	// }
	// echo $num;
	if ($num) {
		while($row = mysqli_fetch_array($result)){
			echo $row[0];
		}
	}

?>
