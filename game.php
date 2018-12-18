<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>俄羅斯方塊-遊戲中</title>
<script src="jquery-2.1.1.min.js"></script>
<script src="script.js"></script>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>

<div id="wrapper">
	
</div>

<div id="other">
	<div id="next-group">
    	
    </div>
    <div style="margin-top:50px;">等級 : <label class="level"><?=($_GET['level'] == 'diff')?('難'):('一般')?></label></div>
    <div>行數 : <label class="score">0</label></div>
    <div>時間 : <label class="time">00:00</label></div>
    <div><button id="spBtn">暫停遊戲</button></div>
    <div><button id="quitBtn">放棄遊戲</button></div>
</div>

<div id="pause-view">
	暫停中
</div>

<div id="gameover">
<form method="post" action="back.php">
	<input type="hidden" name="sttime" value="<?=time()?>"/>
    <input type="hidden" name="level" value="<?=($_GET['level'] == 'diff')?('diffcult'):('easy')?>"/>
    <h2>遊戲結束</h2>
 	<div>暱稱 : <input type="text" name="name"/></div>
    <div>時間 : <input type="text" readonly="readonly" name="time" id="time"/></div>
    <div>行數 : <input type="text" readonly="readonly" name="score" id="score"/></div>
    <button type="submit">送出</button>
</form>
</div>

</body>
</html>