fetch("https://api.unsplash.com/photos/?client_id=PU-1OCTCZ66rNb-cBZOjqWnEA7PwShgMpB-SM01UOiE")
    .then(res => {
        let data = res.json();
        return data;
    }).then(data => {
        // console.log(data);
        let container = document.getElementById("unsplash");
        let fragment1 = document.createDocumentFragment();
        for(let i = 0; i < data.length; i++){
            let img = document.createElement("img");
            img.className = "photo";
            img.id = `${i}`;
            img.setAttribute("src", data[i].urls.regular)
            let li = document.createElement("li");
            li.append(img);
            fragment1.append(li);
        }
        $('#imgGroups').append(fragment1);
        fragment1.append($('#imgGroups'))
        
        return container;
    }).then(node => {
        let divWidth = $("#unsplash").width();
        let photoCount = $('.photo').length;
        $('#imgGroups').width(divWidth * photoCount);
        $("#imgGroups li").width(divWidth);

        let fragment2 = document.createDocumentFragment();
        for(let i = 0; i < photoCount; i++){
            $(fragment2).append(`<li></li>`);
        }
        $("#dots").append(fragment2);
        $("#dots li").addClass("dot")
        $("#dots li:first-child").addClass("-on")

        let index = 0;
        $("#dots li").click(function(){
            $(this).addClass("-on");
            $("#dots li").not(this).removeClass("-on");

            index = $(this).index();
            $("#imgGroups").animate({left: divWidth * index * -1}, 500)
        })

        $(".change").click(function(){
            if($(this).hasClass('next')){
                if(index+1 != photoCount) index++;
            }else{
                if(index != 0) index--;
            }
            imgMove();
        })

        setInterval(autoPlay, 4000)

        function autoPlay(){
            if(index+1 != photoCount){
                index++
            }else{
                index = 0 ;
            }
            imgMove();
        }

        function imgMove(){
            let lightDot = $(`#dots li:nth-child(${index+1}`);
            $("#dots li").not($(lightDot)).removeClass("-on")
            $(lightDot).addClass("-on")
            $("#imgGroups").animate({left: divWidth * index * -1})
        }
    })


