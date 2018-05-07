<?php include 'database.php';


//create a variable
$uname = $_POST['username'];
$filename = $_POST['filename'];
$content = $_POST['content'];
// $content = "<script></script>";

mysqli_query($connect,"INSERT INTO iit (uname, filename, content)
		        VALUES ('$uname','$filename','$content')");

if(mysqli_affected_rows($connect) > 0){
	echo "<p>Form Added</p>";
	echo "<a href='index.php'>Go Back</a>";
} else {
	echo "Form NOT Filled<br />";
	echo mysqli_error ($connect);
}

// print_r($_POST);

// echo $_POST['first_name'];
// echo '<br />';
// echo $_POST['emailid'];
