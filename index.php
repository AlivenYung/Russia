<?php
	error_reporting(1);
	$diff = file_get_contents('diffcult.txt');
	$diff = json_decode($diff,true);
	$easy = file_get_contents('easy.txt');
	$easy = json_decode($easy,true);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>俄羅斯方塊</title>
<style>
	#body{
		width:1024px;
		height:768px;
		box-shadow:0px 0px 5px gray;
		margin:auto;
		margin-top:50px;
	}
	h1{
		font-size:72px;
	}
	.stBtn{
		background:rgba(0,153,255,1);
		color:white;
		width:450px;
		height:70px;
		font-size:36px;
		border:0px;
	}
</style>
</head>

<body>

<div id="body">

	<header style="text-align:right;">
    	<div>最高行數:<?=($diff[0]['score'] > $easy[0]['score'])?($diff[0]['score']):($easy[0]['score'])?></div>
        <div><a href="rank.php">查看排行榜</a></div>
    </header>
    
    <div style="text-align:center;width:450px;margin:auto; margin-top:200px; ">
    	<form method="get" action="game.php">
    	<h1>俄羅斯方塊</h1>
        <div style="text-align:right">
        	<select name="level" style="font-size:24px">
            	<option value="easy">一般</option>
                <option value="diff">困難</option>
            </select>
        </div>
        <button type="submit" class="stBtn">開始遊戲</button>
        </form>
    </div>
	
</div>

</body>
</html>