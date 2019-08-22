/* div#recomanded ul
<li>
    <div class="movie_details">
        <span class="special"></span>
        <span class="blur">标清</span>
        <img src="img/51_270_360.jpg" alt="">
        <div class="movie_text">
            <div>
                <p>外乡人</p>
                <p>上海外来人的辛酸与甘甜</p>
            </div>
            <p class="ranking_point">
                <span>9.</span><span>1</span>
                </p>
        </div>
    </div>
</li>
*/
function appendFilm(ul, film){
    let tmp = document.createElement("div");
    tmp.innerHTML = `<li>
        <div class="movie_details">
            <span class="special"></span>
            <span class="blur">${film.txt}</span>
            <img src="${film.url}" alt="">
            <div class="movie_text">
                <div>
                    <p>${film.title}</p>
                    <p>${film.message}</p>
                </div>
                <p class="ranking_point">
                    <span>${film.grade}</span>
                </p>
            </div>
        </div>
    <li>`;

    let parent = document.querySelector(ul);
    parent.appendChild(tmp.firstChild);
}

window.onload = function(){
    var swiper = document.getElementById("swiper");
    var mainPic = swiper.getElementsByTagName("img")[0];  
    var smallPic = document.getElementById("smallPic").getElementsByTagName("li");
    var btns = swiper.getElementsByTagName("span");

    var n = 0;
    var timer = setInterval(autoPlay,1000);
    swiper.onmouseover = function(){
        clearInterval(timer);
    }
    swiper.onmouseout = function(){
        timer = setInterval(autoPlay,1000);
    } 
    for(var i=0;i<smallPic.length;i++){
        smallPic[i].index = i;
        smallPic[i].onclick = function(){
          
            n = this.index;
            n--;
            autoPlay();
        }
        
    }
    function autoPlay(){
        n++;
        if(n==9){
            n=0;
        }else if(n==-1){
            n=9;
        }
        for(var j=0;j<smallPic.length;j++){
            smallPic[j].className = "";
        }
        smallPic[n].className = "active";
        mainPic.src = "./img/banner_"+(n+1)+".jpg";
    }

    var vip = document.getElementById("vip");
    var vipBtns = vip.getElementsByTagName("span");
    var vipList = vip.getElementsByTagName("ul")[0];
    console.log(vipList);
    vipBtns[1].onclick = function(){
        vipList.style.left = "0px";
    }
    vipBtns[2].onclick = function(){
            vipList.style.left = "-1060px";
    }

    // 請求films
    ajax("GET", "data/films.json", undefined, (data)=>{
      // console.log(data);
      let films = data.films;
      films.forEach(film => {
        // console.log(film.grade);
        // console.log(film.http);
        // console.log(film.message);
        // console.log(film.title);
        // console.log(film.txt);
        // console.log(film.type);
        // console.log(film.url);

        appendFilm("div#recomanded ul", film);
        
      });
    });
}



