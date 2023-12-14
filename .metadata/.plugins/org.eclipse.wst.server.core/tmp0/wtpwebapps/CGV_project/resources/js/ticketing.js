let movieNum = null;
let theater = null;
let date = null;

//------------------------- 영화 선택 --------------------------------------
function movieSave(num,index){
	
	movieNum = num;
	console.log("movieNum = "+movieNum);
	
	let imgList = document.querySelectorAll(".Info-img");
	for(let i=0; i<imgList.length; i++){
		
		if(index==i){
			imgList[i].style.border = "solid 4px red";
		}else{
			imgList[i].style.border = "";
		}
		
	}
	
}

//------------------------- 영화관 선택 -------------------------------------
function checkRegion(num){
	
	let regionList = document.querySelectorAll(".region");
	let regionInfoList = document.querySelectorAll(".regionInfo");
	
	for(let i=0; i<regionList.length; i++){
		if(num==i){
			regionInfoList[i].style.display = "block";
		}else{
			regionInfoList[i].style.display = "none";
		}
	}
	
}
function theaterSave(data){
	theater = data.innerText;
	console.log("theater = "+theater);
	alert(theater);
}

//------------------------- 날짜 선택 --------------------------------------
let monthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let dayList = ["일", "월", "화", "수", "목", "금", "토"];
let today = new Date();
let todayDay = today.getDate(); 
let thisMonth = null;
let thisYear = null;

function YearMonth(){
	let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();

	makeDateDiv(thisYear,thisMonth);
}

function makeDateDiv(year , month){
	thisMonth = month;
	thisYear = year;
	//----------------- 테이블 만들기 ----------------------
	let listHtml = ``;
	let count = 0;
	
	listHtml +=`
		<h3>${month}월</h3>
		<table class="dateTable">
			<tr>
	`;	
	for(let i=0; i<7; i++){
		listHtml += `<td>${dayList[i]}</td>`;
	}
	listHtml += `</tr>`;
	
	for(let i=0; i<6; i++){
		listHtml += `<tr>`;
		for(let j=0; j<7; j++){
			listHtml += `<td class="day"><input type="hidden" value="${count}"></td>`;
			count++;
		}
		listHtml += `</tr>`;
	}
	listHtml += `</table>`;
	$(".dateDiv").html(listHtml);
	
	//----------- 날짜 계산하기 --------------
	let total = 0;
	let lastYear = year - 1;
	total += lastYear * 365;
	total += parseInt(lastYear / 400);
    total -= parseInt(lastYear / 100);
    total += parseInt(lastYear / 4);
		
	if(year % 400 == 0) {
        monthList = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else if(year % 100 != 0 && year % 4 == 0) {
        monthList = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

	for(let i=0; i<month; i++) {
        total += monthList[i];
    }
	total += 1;
	
	let dayIndex = total % 7;
	
	let $table = document.querySelector(".dateTable");
	let row = 1;
    for(let i=0; i<monthList[month]; i++) {
        let index = (i + dayIndex) % 7;
		if(i+1>=todayDay && i+1<=todayDay+6 ){
			$table.children[0].children[row].children[index].innerText = i + 1;
			$table.children[0].children[row].children[index].style.color = "black";
			$table.children[0].children[row].children[index].style.cursor= "pointer";
			$table.children[0].children[row].children[index].addEventListener("click",()=>{dateSave(i+1)});
		}else{
			$table.children[0].children[row].children[index].innerText = i + 1;
		}
        if(index == 6) {
            row += 1;
        }
    }	
}

function dateSave(data){
	date = thisMonth+"월 "+data+"일";
	console.log("date = "+date);
}

function saveData(){
	let formData = document.querySelector(".formData");
		
	var query = {
		movieNum :  movieNum,
		theater : theater,
		date : date
	};	
		
	$.ajax({
		url: "checkData",
		type: "post",
		data : query,
		success : function(data){
			
			
		},
		error: function() { alert("saveData error!"); }
	});
	
	/*
	$.ajax({
			async: false,
			url: "checkData",
			type: "post",
			data : query,
			success : function() { window.location.href="";}, //sucess : window.location.href="경로?list=${list}"
			error: function() { alert("openCount error"); }
		})
	*/
}