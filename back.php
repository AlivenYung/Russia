<?php
$level = $_POST['level'];
$file = file_get_contents($level.'.txt');
$file = (!$file)?('[]'):($file);
$file = json_decode($file,true);
$id = count($file)+1;
$file[] = array(
	'id'	=> $id,
	'name'	=> $_POST['name'],
	'score'	=> $_POST['score'],
	'time'	=> $_POST['time'],
	'sttime'=> $_POST['sttime']
);
usort($file,function($a,$b){
	if($b['score'] > $a['score']) return 1;
	else if($b['score'] == $a['score'] && $b['time'] < $a['time']) return 1;
	else if($b['score'] == $a['score'] && $b['time'] == $a['time'] && $b['sttime'] < $a['sttime']) return 1;
});
$file = json_encode($file);
setcookie('id',$id);
file_put_contents($level.'.txt',$file);
header("Location:rank.php?level=".$level);
?>