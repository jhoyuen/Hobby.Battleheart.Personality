var className = [ "barbarian", "bard", "battlemage", "cleric", "druid", "hero", "hexblade", "knight", "monk", "necromancer", "ninja", "paladin", 
		"ranger", "rogue", "samurai", "skirmisher", "sorcerer", "summoner", "swashbuckler", "warlock", "warlord", "warrior", "witch", "wizard"];
var classesTotal = className.length;
var convertMeToImg = $('#results')[0];

function disableSkillButtons(){
	$('div.skills img').addClass('disabled');
}
function loadFeatures(){
	initSetup();
	initHoverPointAllocation();
	initHoverSkills();
	changePointAllocation();
	selectSkill();
}
function initSetup() {
	$('.mySkillsValue').text(0);
	$('.totalSkillsValue').text(classesTotal);
}
function initHoverPointAllocation(){
	$('div.pointsAlloc input').hover(function(){
		$('div.information').show();
		$('div.information').html($(this).data('info'));
	});
}
function initHoverSkills(){
	$('div.skills img').hover(function(){
		$('div.information').show();
		var heading = "<h3>Details</h3>";
		var skill = "<strong style='width:80px;display:inline-block;'>Skill: </strong>" + $(this).data('skill') + "<br>";
		var desc = "<strong style='width:80px;display:inline-block;'>Description: </strong>" + $(this).data('description') + "<br>";
		var cooldown = "<strong style='width:80px;display:inline-block;'>Cooldown: </strong>" + $(this).data('cooldown') + "<br>";
		var requirement = "<strong style='width:80px;display:inline-block;'>Requirement: </strong>";
		if($(this).data('str') !== ''){
			requirement += $(this).data('str') + "&nbsp;STR&nbsp;&nbsp;";
		}
		if($(this).data('dex') !== ''){
			requirement += $(this).data('dex') + "&nbsp;DEX&nbsp;&nbsp;";
		}
		if($(this).data('int') !== ''){
			requirement += $(this).data('int') + "&nbsp;INT&nbsp;&nbsp;";
		}
		if($(this).data('skl') !== ''){
			requirement += $(this).data('skl') + "&nbsp;SKL&nbsp;&nbsp;";
		}
		if($(this).data('end') !== ''){
			requirement += $(this).data('end') + "&nbsp;END&nbsp;&nbsp;";
		}
		if($(this).data('cha') !== ''){
			requirement += $(this).data('cha') + "&nbsp;CHA&nbsp;&nbsp;";
		}
		requirement += "<br>";
		var info = heading + skill + cooldown + requirement + desc;
		$('div.information').html(info);
	});
}
function changePointAllocation(){
	$('div.pointsAlloc input').change(function(){
		var myStrPts = $('#txtSTR').val();
		var myDexPts = $('#txtDEX').val();
		var myIntPts = $('#txtINT').val();
		var mySklPts = $('#txtSKL').val();
		var myEndPts = $('#txtEND').val();
		var myChaPts = $('#txtCHA').val();
	
		var remainingPoints = 150;
		if(remainingPoints !== NaN){
			if(myStrPts !== NaN){
				remainingPoints = remainingPoints - myStrPts;
			}
			if(myDexPts !== NaN){
				remainingPoints = remainingPoints - myDexPts;
			}
			if(myIntPts !== NaN){
				remainingPoints = remainingPoints - myIntPts;
			}
			if(mySklPts !== NaN){
				remainingPoints = remainingPoints - mySklPts;
			}
			if(myEndPts !== NaN){
				remainingPoints = remainingPoints - myEndPts;
			}
			if(myChaPts !== NaN){
				remainingPoints = remainingPoints - myChaPts;
			}
			
			$('.myPointsValue').text(remainingPoints); 
		}
		
		// limit to 0
		if(remainingPoints <= 0){
			$('.myPointsValue').text(0); 
			$(this).val(remainingPoints + parseInt($(this).val()));

			if($(this).attr('id') == 'txtSTR'){
				myStrPts = $(this).val();
			}
			else if($(this).attr('id') == 'txtDEX'){
				myDexPts = $(this).val();
			}
			else if($(this).attr('id') == 'txtINT'){
				myIntPts = $(this).val();
			}
			else if($(this).attr('id') == 'txtSKL'){
				mySklPts = $(this).val();
			}
			else if($(this).attr('id') == 'txtEND'){
				myEndPts = $(this).val();
			}
			else if($(this).attr('id') == 'txtCHA'){
				myChaPts = $(this).val();
			}
		}
	
		$('div.skills img').each(function(){
			var enabled = true;
			var skillStrPts = parseInt($(this).data('str'));
			var skillDexPts = parseInt($(this).data('dex'));
			var skillIntPts = parseInt($(this).data('int'));
			var skillSklPts = parseInt($(this).data('skl'));
			var skillEndPts = parseInt($(this).data('end'));
			var skillChaPts = parseInt($(this).data('cha'));
			
			if(skillStrPts !== NaN && myStrPts < skillStrPts){
				enabled = false;
			}
			if(skillDexPts !== NaN && myDexPts < skillDexPts){
				enabled = false;
			}
			if(skillIntPts !== NaN && myIntPts < skillIntPts){
				enabled = false;
			}
			if(skillSklPts !== NaN && mySklPts < skillSklPts){
				enabled = false;
			}
			if(skillEndPts !== NaN && myEndPts < skillEndPts){
				enabled = false;
			}
			if(skillChaPts !== NaN && myChaPts < skillChaPts){
				enabled = false;
			}
			
			// this skill has no attribute requirements
			if(skillStrPts === NaN && skillDexPts === NaN && skillIntPts === NaN &&
				skillSklPts === NaN && skillEndPts === NaN && skillChaPts === NaN){
				enabled = true;	
			}
			
			if(enabled){
				$(this).removeClass('disabled').addClass('enabled');
			}
			else{
				$(this).removeClass('enabled').addClass('disabled');
			}	

			// remove selection from disabled skills
			if($(this).hasClass('disabled') && $(this).hasClass('selected')){
				$(this).removeClass('selected');
			}			
		});
	});
}
function selectSkill(){
	$('div.skills img').off('click').on('click', function(){	
		if($(this).hasClass('enabled')){
			if($(this).hasClass('selected')){
				$(this).removeClass('selected');
			}
			else{
				if($('.selected').length < classesTotal){
					$(this).addClass('selected');
				}
			}
		}
		
		$('.mySkillsValue').text($('div.skills img.selected').length);
	});
}
function complete(){
	
	if($('div.skills img.enabled.selected').length === 0)
		return;
	
	$('div.results').show();
	
	var classResult = "You are predominantly a ";
	var subclassResult = "You could have been a ";
	var skillIconsResult = "<div class='skillIconsResult'></div>"; 
	var resultBreakdown = "<strong>Result Breakdown:</strong><br />"; 
	var lineBreak = "<br />";
	
	var countBarbarian = $('div.skills img.enabled.selected.barbarian').length;
	var countBard = $('div.skills img.enabled.selected.bard').length;
	var countBattlemage = $('div.skills img.enabled.selected.battlemage').length;
	var countCleric = $('div.skills img.enabled.selected.cleric').length;
	var countDruid = $('div.skills img.enabled.selected.druid').length;
	var countHero = $('div.skills img.enabled.selected.hero').length;
	var countHexblade = $('div.skills img.enabled.selected.hexblade').length;
	var countKnight = $('div.skills img.enabled.selected.knight').length;
	var countMonk = $('div.skills img.enabled.selected.monk').length;
	var countNecromancer = $('div.skills img.enabled.selected.necromancer').length;
	var countNinja = $('div.skills img.enabled.selected.ninja').length;
	var countPaladin = $('div.skills img.enabled.selected.paladin').length;
	var countRanger = $('div.skills img.enabled.selected.ranger').length;
	var countRogue = $('div.skills img.enabled.selected.rogue').length;
	var countSamurai = $('div.skills img.enabled.selected.samurai').length; 
	var countSkirmisher = $('div.skills img.enabled.selected.skirmisher').length; 
	var countSorcerer = $('div.skills img.enabled.selected.sorcerer').length; 
	var countSummoner = $('div.skills img.enabled.selected.summoner').length; 
	var countSwashbuckler = $('div.skills img.enabled.selected.swashbuckler').length;
	var countWarlock = $('div.skills img.enabled.selected.warlock').length;
	var countWarlord = $('div.skills img.enabled.selected.warlord').length; 	
	var countWarrior = $('div.skills img.enabled.selected.warrior').length; 
	var countWitch = $('div.skills img.enabled.selected.witch').length;
	var countWizard = $('div.skills img.enabled.selected.wizard').length;
	
	var classCount = [ countBarbarian, countBard, countBattlemage, countCleric, countDruid, countHero, countHexblade, countKnight, countMonk, countNecromancer, 
		countNinja, countPaladin, countRanger, countRogue, countSamurai, countSkirmisher, countSorcerer, countSummoner, countSwashbuckler, countWarlock, countWarlord, countWarrior, countWitch, countWizard ];
		
	var sortedClassCount = classCount;
	var indexOfHighestClass = indexOfMax(classCount);
	var highestClassName = className[indexOfHighestClass].toLowerCase().replace(/\b[a-z]/g, function(letter) {
		return letter.toUpperCase();
	});

	classResult += "<strong>" + highestClassName + "</strong>.";
	var results = classResult + lineBreak + skillIconsResult + lineBreak;
	
	var statsTable = "<table class='statsTable'><tr><th>STR</th><th>DEX</th><th>INT</th><th>SKL</th><th>END</th><th>CHA</th></tr><tr><td>" + $('#txtSTR').val() + "</td><td>" + $('#txtDEX').val() + "</td><td>" + $('#txtINT').val() + "</td><td>" + $('#txtSKL').val() + "</td><td>" + $('#txtEND').val() + "</td><td>" + $('#txtCHA').val() + "</td></tr></table>";
	results += statsTable + lineBreak;
	
	for(let i = 0; i < className.length; i++){
		resultBreakdown += "<strong style='width:88px;display:inline-block;'>" + className[i] + ": </strong>" + classCount[i] + "<br>";
	}
	
	results += resultBreakdown;	
	$('div.results').html(results);
	
	$('div.skills img.enabled.selected').each(function(){
		$(this).clone().appendTo('div.skillIconsResult');
		$('div.skillIconsResult img').css('display', 'inline');
	});
}
function print()
{
	if($('div.skills img.enabled.selected').length === 0)
		return;

	if($('div.results').text().trim().length === 0){
		return;
	}
	
    html2canvas(convertMeToImg).then(function(canvas) {
		$('#resultsPreview').append('<br /><br /><strong> Right click and save your results image below:</strong><br /><br />');
		$('#resultsPreview').append(canvas);
		$('#results').hide();
	});
}
function reset(){
	window.location.reload();
}
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}
