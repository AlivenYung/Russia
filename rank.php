<?php
	error_reporting(1);
	$diff = file_get_contents('diffcult.txt');
	$diff = json_decode($diff,true);
	$easy = file_get_contents('easy.txt');
	$easy = json_decode($easy,true);
	$id = (isset($_COOKIE['id']))?($_COOKIE['id']):(-1);
	setcookie('id','');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>俄羅斯方塊-排行榜</title>
<style>
	table{
		border-collapse:collapse;
		border-spacing:0;
	}
	table th,table td{
		padding:8px;
		border:1px solid #ddd;
	}
</style>
<script src="jquery-2.1.1.min.js"></script>
<script>
	$(function(){cha('<?=($_GET['level'] == 'easy')?('easy'):('diffcult')?>') });
	function cha(level){
		$('label').css("background","none");
		$('#'+level).css("background","skyblue");
		$('table').hide();
		$('.'+level).css("display","block");
	}
</script>
</head>

<body>

	<div>
    	<label id="easy" onclick="cha('easy')">簡單</label>
        <label id="diffcult" onclick="cha('diffcult')">困難</label>
    </div>
    <table class="easy">
    	<tr><th>名次</th><th>暱稱</th><th>行數</th><th>時間</th></tr>
        <?php
			foreach($easy as $val){
				$ds = ($id == $val['id'] && $_GET['level'] == 'easy');
				if($val['id'] <= 5 || $ds){
				?>
                	<tr <?=($ds)?("bgcolor='yellow'"):('')?>>
                    	<td><?=$val['id']?></td>
                        <td><?=$val['name']?></td>
                        <td><?=$val['score']?></td>
                        <td><?=$val['time']?></td>
                    </tr>
				<?php
				}
			}
        ?>
    </table>
    <table class="diffcult">
    	<tr><th>名次</th><th>暱稱</th><th>行數</th><th>時間</th></tr>
        <?php
			foreach($diff as $val){
				$ds = ($id == $val['id'] && $_GET['level'] == 'diffcult');
				if($val['id'] <= 5 || $ds){
				?>
                	<tr <?=($ds)?("bgcolor='yellow'"):('')?>>
                    	<td><?=$val['id']?></td>
                        <td><?=$val['name']?></td>
                        <td><?=$val['score']?></td>
                        <td><?=$val['time']?></td>
                    </tr>
				<?php
				}
			}
        ?>
    </table>
	<a href="index.php">回首頁</a>
</body>
</html>