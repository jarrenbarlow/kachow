$(document).ready(function(){
    main();
})

function main()
{
    $("#restart").hide();
    $("#guessValue").show();
    var imgIndex=-1;
    var score=0;
    var img;
    $.getJSON("config.json", function(data){
        img=data.data;
        var array=new Array(1000);
        var visited=0;
        for (var i=0;i<img.length;i++)
        {
            array[i]=0;
        }
        var x = img.length-1;
        var y = 0;
        var rand = parseInt(Math.random()*(x-y+1)+y);

        $("#score").html("score: "+score+"/"+img.length);
        while (img.length>=1&&imgIndex==rand)
        {
            rand=parseInt(Math.random()*(x-y+1)+y);
        }
        array[visited++]=rand;
        imgIndex = rand;
        $("#img").attr("src","img/"+img[rand].name);
        $("#main").hide().fadeIn(1000);

        $("#guess").click(function (){
            var input=$("#guessValue").val();
            if (input==img[rand].answer)
            {
                $("#right").fadeIn(1000,function (){
                    setTimeout(function (){
                        $("#right").fadeOut(500)
                    },500);
                });
                score++;
                $("#score").html("score: "+score+"/"+img.length);
            }
            else
            {
                $("#wrong").fadeIn(1000,function (){
                    setTimeout(function (){
                        $("#wrong").fadeOut(500)
                    },500);
                });
            }

            if (visited<img.length)
            {
                rand = parseInt(Math.random()*(x-y+1)+y);
                while (true)
                {
                    var flag=false;
                    for (var i=0;i<visited;i++)
                    {
                        if (rand==array[i])
                        {
                            flag=true;
                            rand=parseInt(Math.random()*(x-y+1)+y);
                            break;
                        }
                    }
                    if (!flag)
                    {
                        array[visited++]=rand;
                        break;
                    }
                }
                imgIndex = rand;
                $("#main").fadeOut(1000,function (){
                    $("#img").attr("src","img/"+img[rand].name);
                    $("#main").fadeIn(1000);
                })
            }
            else
            {
                alert("Your final score is "+score);
                $("#guess").hide();
                $("#guessValue").hide();
                $("#restart").show();
            }
        });

        $("#restart").click(function (){
            $("#guess").show()
            $(this).hide();
            score=0;
            visited=0;
            main();
        });
    });
}