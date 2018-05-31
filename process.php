<?php include 'database.php';

session_start();

//create a variable
$uname = (htmlspecialchars($_POST['username']));
$filename = (htmlspecialchars($_POST['filename']));
$contents = (htmlspecialchars($_POST['content']));
$flag = 1;
// $content = "<script></script>";
// echo "$contents";


$connect=mysqli_connect('localhost:3307','root','','mydatabase');
if ($connect === false) {
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$result = mysqli_query($connect,"SELECT * FROM iit") or die (mysql_error());
$row = mysqli_fetch_array($result);
// echo $row['uname'];
while ($row = mysqli_fetch_array($result)) {
	if($row['uname'] == $uname && $row['filename'] == $filename)
	{
	echo "Error : Similiar Filename and Usernames Exists";
  // echo "TSTART \n";
  // echo "<script>console.log('asasa');</script>";
  // echo "<script>toastr.error('The username and password do not match.', 'Load Failed!');</script>";
  // echo "yo";
	$flag = 2;
  $_SESSION['repeat'] = $flag;
  header('Location: index.php');
	break;
	}
}

if($flag == 1)
{
mysqli_query($connect,"INSERT INTO iit (uname, filename, contents)
		VALUES ('$uname','$filename','$contents');");

if(mysqli_affected_rows($connect) > 0){
	echo "<p>Form Added</p>";
	echo $contents;
  $flag = 1;
  $_SESSION['repeat'] = $flag;
	header('Location: index.php');
} else {
	echo "Form NOT Filled<br />";
	echo mysqli_error ($connect);
	echo "<a href='index.php'>Go Back</a>";
}
}
// print_r($_POST);

// echo $_POST['first_name'];
// echo '<br />';
// echo $_POST['emailid'];
