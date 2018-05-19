<?php include 'database.php';

//create a variable
$uname = (htmlspecialchars($_POST['username']));
$filename = (htmlspecialchars($_POST['filename']));
$contents = (htmlspecialchars($_POST['content']));
// $content = "<script></script>";

mysqli_query($connect,"INSERT INTO iit (uname, filename, contents)
		        VALUES ('$uname','$filename','$contents')");

if(mysqli_affected_rows($connect) > 0){
	echo "<p>Form Added</p>";
	echo "<a href='index.php'>Go Back</a>";
	echo $contents;
} else {
	echo "Form NOT Filled<br />";
	echo mysqli_error ($connect);
}

// print_r($_POST);

// echo $_POST['first_name'];
// echo '<br />';
// echo $_POST['emailid'];
