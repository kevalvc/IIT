<?php

session_start();
header('Content-type: text/html; charset=UTF-8');

$connect = mysqli_connect('localhost:3307','root','', "mydatabase");
if ($connect === false) {
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

mysqli_set_charset($connect, "UTF8");

$uname = $_GET['username'];
$filename = $_GET['filename'];
// $content = "<script></script>";

$sql = "SELECT * FROM iit where uname = '$uname' and filename = '$filename'";
$result = mysqli_query($connect, $sql) or die ("Query failed");
$num = mysqli_affected_rows($connect);
echo $num;
if ($num) {
while($row = mysqli_fetch_array($result)){
  // echo ($row['contents']);
  $_SESSION['xmlcontents'] = $row['contents'];
      // print_r ($row);
// $fp = fopen("tempXmlFile.txt","wb");
// fwrite($fp,htmlspecialchars_decode($row[contents]));

}
// fclose($fp);
} else {
  $_SESSION['xmlcontents'] = "";
}

echo $_SESSION['xmlcontents'];
header('Location: index.php');

// if(mysqli_affected_rows($connect) > 0){
	// echo "<p>imported</p>";
	// echo "<a href='index.php'>Go Back</a>";
// } else {
	// echo "Form NOT Retrieved<br />";
  // echo mysqli_error ($connect);
// }
