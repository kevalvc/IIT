<?php

$connect = mysqli_connect('localhost:3307','root','', "mydatabase");
// Check connection
if ($connect === false) {
    die("ERROR: Could not connect. " . mysqli_connect_error());
}


//create a variable
$uname = $_GET['username'];
$filename = $_GET['filename'];
// $uname = 'abcde';
// $filename = 'abc';
// $content = "<script></script>";

$sql = "SELECT * FROM iit where uname = '$uname'";
$result = mysqli_query($connect, $sql) or die ("Query failed");
while($row = mysqli_fetch_object($result)){
    print_r ($row);
}
// $row=mysqli_fetch_field($result);
//   echo '<pre>';
//   print_r ($row);
//   echo '</pre>';

// if(mysqli_affected_rows($connect) > 0){
	// echo "<p>imported</p>";
	// echo "<a href='index.php'>Go Back</a>";
// } else {
	// echo "Form NOT Retrieved<br />";
  // echo mysqli_error ($connect);
// }
