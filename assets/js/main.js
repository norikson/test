let mass = []; // объявляем массив
let massNew;
$('.generateTable').on('click',function(){
    $('.newcanvas').empty();
    $('.tomail').css('display','none');
    let m = $('.size:eq(0)').val();

    if(m<=1){
        alert("Укажите число больше 1");
    }
    else{
    mass=[];
    $('.canvas').empty();
    $('.canvas').append('<table class="array"></table>');

    for(let j = 0;j<m;j++){
        mass.push([])
        $('.canvas table').append('<tr></tr>')   
        for(let i =0;i<m;i++){
        $(`.canvas table tr:eq(${j})`).append(`<td><input type="number" style='width:40px;height:40px' class="number" min='0' max='9' data-m='${j}' data-n='${i}'></td>`)
        mass[j].push(0)
        }
    }

    $('.ss').css('display','block');
}

})

//Внесение значения в матрицу
$('body').on('change','.number', function() {
    mass[$(this).attr('data-m')][$(this).attr('data-n')]={
        'value':$(this).val(),
        "setRow":false,    
        "setColumn":false}; 
});
// 


// Автоматическое заполнение матрицы
$('.numberGeneration').on('click',function() {
    if(!$('#min').val() || !$('#max').val()){
        alert('Пожалуйста внесите диапозон');
    }
    else if($('#min').val()<0 ||$('#max').val()<0){
        alert('Пожалуйста укажите значение больше 0');
    }
    else if(($('#min').val()>8 || $('#max').val()>9 ) || $('#min').val()>$('#max').val() ){
        alert('Укажите верный диапозон');
    }

    else{
        $(".canvas .number").each(function() {
            $(this).val(numberGeneration($('#min').val(),$('#max').val()));
            mass[$(this).attr('data-m')][$(this).attr('data-n')]={
                'value':$(this).val(),
                "setRow":false,    
                "setColumn":false
                            }; 
          });
    }
})
// 

// Проверка заполнения данных матрицы /построение новой матрицы
$('.newArray').on('click', function(){
    let check = 0
    $(".canvas .number").each(function(){
        if($(this).val()==''){
            check++;
        }
    })
    if(check>0){
        alert('Матрица не заполнена')

    }
    else{
    
            $('.newcanvas').empty();
            $('.newcanvas').append('<h4 style="text-align:center;">Новая матрица</h4>');
            $('.array').clone().appendTo('.newcanvas');
            $('.tomail').css({display: "block"})
            fMath(mass);
    }

})
// 

//Функция автоматической генерации данных матрицы
function numberGeneration(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;

}
//

// функция расчета матрицы
function fMath(mass){
    let m = mass;
    for(let i = 0; i<m.length; i++){
        for(let j = 0;j<m[i].length;j++){    
        let scoreFirst = m[i].filter(el => el.value === m[i][j].value).length;
        if(scoreFirst>1){
            m[i][j].setRow=scoreFirst;
        }
        scoreFirst = 0;
        }   
    }

 let m1 = revers(m);
    for(let i = 0; i<m1.length; i++){
            for(let j = 0;j<m1[i].length;j++){    
            let scoreFirst = m1[i].filter(el => el.value === m1[i][j].value).length;
            if(scoreFirst>1){
                m1[i][j].setColumn=scoreFirst;
            }
            scoreFirst = 0;
            }
            
        }
// 

// Подстановка элемента в таблицу
let massEnd = revers(m1); 
massNew = massEnd;
for(let i = 0; i<massEnd.length; i++){
    for(let j = 0;j<massEnd[i].length;j++){    
        $('.newcanvas .number').each(function(){
                if((parseInt($(this).attr('data-m'))==i) && (parseInt($(this).attr('data-n'))==j)){
                    $(this).attr('disabled','true')
                    if(massEnd[i][j].setColumn > 0 &&massEnd[i][j].setRow > 0){
                        let elem = massEnd[i][j].value*massEnd[i][j].setColumn*massEnd[i][j].setRow 
                        $(this).css({backgroundColor: "blue"}) 
                        $(this).val(elem) 
                    }
                    else if (massEnd[i][j].setRow > 0){
                        let elem = massEnd[i][j].value*massEnd[i][j].setRow
                        $(this).css({backgroundColor: "yellow"}) 
                        $(this).val(elem) 
                    }
                    else if(massEnd[i][j].setColumn > 0){
                    let elem = massEnd[i][j].value*massEnd[i][j].setColumn
                        $(this).css({backgroundColor: "green"}) 
                        $(this).val(elem) 
                        
                    }
                    
                    
                }
            })
    }   
}

}
// 

// Модальное окно с информацией
$('body').on('mouseover','.newcanvas .number', function() {
    let value = massNew[parseInt($(this).attr('data-m'))][parseInt($(this).attr('data-n'))].value;
    let result = $(this).val();
    let row = massNew[parseInt($(this).attr('data-m'))][parseInt($(this).attr('data-n'))].setRow;
    let column = massNew[parseInt($(this).attr('data-m'))][parseInt($(this).attr('data-n'))].setColumn;

    $('.description').html(
        `Начальное значение:${value}<br>
        ${row ? "По строке умножена"+" '"+value+"' "+" "+(row)+" раз(а). <br>":""}
        ${column ? "По столбцу умножена"+" '"+value+"' "+" "+(column)+" раз(а). <br>":""}
        Итоговое значение:${result}    
                            `)
    $('.description').css({display: "block",top:`${$(this).offset().top+40}px`,left:`${$(this).offset().left}px`}) 
    
})
$('body').on('mouseout','.newcanvas .number', function() {
    $('.description').css({display: "none"}) 
})
// 


// Вспомогательные функции
function revers(table){
    for (var d = table.length, a = 0; a < d; a++)
            for (var c = a + 1; c < d; c++) {
                var e = table[a][c];
                table[a][c] = table[c][a];
                table[c][a] = e
            }
                  return table
}
