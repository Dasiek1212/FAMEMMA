var mockdata = [
    {
        "fightId": 1, 
        "fighterLeft": {"fighterId": 3, "fighterName": "Rozpara"}, 
        "fighterRight": {"fighterId": 4, "fighterName": "Boxdel"},
        "imageUrl": "images/fight1.jpg",
        "winnerId": 3, 
        "winType": 2
      },    
      {
        "fightId": 2, 
        "fighterLeft": {"fighterId": 3, "fighterName": "Kasjo"}, 
        "fighterRight": {"fighterId": 4, "fighterName": "Gola"},
        "imageUrl": "images/fight2.jpg",
        "winnerId": 3, 
        "winType": 2
      },
      {
        "fightId": 3, 
        "fighterLeft": {"fighterId": 3, "fighterName": "Kasjo"}, 
        "fighterRight": {"fighterId": 4, "fighterName": "Gola"},
        "imageUrl": "images/fight2.jpg",
        "winnerId": 3, 
        "winType": 2
      },
      {
        "fightId": 4, 
        "fighterLeft": {"fighterId": 3, "fighterName": "Kasjo"}, 
        "fighterRight": {"fighterId": 4, "fighterName": "Gola"},
        "imageUrl": "images/fight2.jpg",
        "winnerId": 3, 
        "winType": 2
      }
]



$( document ).ready(function() {
    M.AutoInit();
    var initialData = [];
    
    function getDate()
    {   //tutaj inicjalizacja danych
        initialData = mockdata;

        
        for(let i=0; i< initialData.length; i++)
        {
            var fight = initialData[i];
            $("select#fight").append('<option value="'+ fight.fightId +'">'+ fight.fighterLeft.fighterName +" vs "+ fight.fighterRight.fighterName +'</option>');
            
        };



        $(".loader").addClass("hide")
        $("#saveBtn").removeClass("disabled")
        $(".userData").removeClass("hide")
    }

    
    getDate();



    $('select').formSelect();

    $("select#fight").on("change", function(){
        for(let i=0; i< initialData.length; i++)
        {
            var fight = initialData[i];
            if(fight.fightId == $(this).val())
            {
                $("select#fighter").append('<option value="'+ fight.fighterLeft.fighterId +'">'+ fight.fighterLeft.fighterName +'</option>');
                $("select#fighter").append('<option value="'+ fight.fighterRight.fighterId +'">'+ fight.fighterRight.fighterName +'</option>');
                $('select').formSelect();
            }
        } 
    })
    $(".refreshBtn").on("click", function()
    {
        location.reload();
    })
    $("#saveBtn").on("click", function(){
        var fightId = $("select#fight").val();
        var winnerId = $("select#fighter").val();
        var winTypeId = $("select#winType").val();
        if(fightId == null || winnerId == null || winTypeId == null)
            M.toast({html: 'Uzupełnij wszystkie pola!'})
        else
        {
            var data = {
                "fightId": fightId,
                "winnerId": winnerId,
                "winTypeId": winTypeId
            }


            //wysyłka formularza
            console.log(data);


            $(".userData").addClass("hide");
            $(".saveBtnCont").addClass("hide");
            $(".formSent").removeClass("hide");
            $(".refreshBtn").removeClass("hide");
        }
    });
});