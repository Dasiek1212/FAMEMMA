var mockdata = 
    [
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
    var initialData = []
    function getData()
    {   
        //inicjalizacja danych
        initialData = mockdata;


        for(let i=0; i< initialData.length; i++)
        {
          if(new Date() < new Date("2021-03-06T20:00:00"))
          {
            var fight = initialData[i];
            $('<div/>').loadTemplate(
                $('#fightTemplate'),
                {
                    imageUrl: fight.imageUrl,
                    fightName: fight.fighterLeft.fighterName + " vs " + fight.fighterRight.fighterName,
                    fighterLeftId: fight.fighterLeft.fighterId,
                    fighterRightId: fight.fighterRight.fighterId,
                    fighterLeftName: fight.fighterLeft.fighterName,
                    fighterRightName: fight.fighterRight.fighterName,
                    fightId: fight.fightId
                }
                ).appendTo("#fightList");
           }
        }
        $(".loader").addClass("hide")
        $("#saveBtn").removeClass("disabled")
        $("#fightList").removeClass("hide")
        $("select").on("change", function() {
            $(this).parent().find("input").removeClass("fieldEmpty");
        });
        $("input").on("change", function() {
            $(this).removeClass("fieldEmpty");
        });
    }
    getData();
    $(".pamieta").on("click", function(){
        M.toast({html: 'Upss.. byku brak ci uprawnien!'})
    })


  
    M.AutoInit();
    $("#saveBtn").on("click", function(){
        var isValid = true;
        var FirstName = $("#firstName").val();
        var LastName = $("#lastName").val();
        var userChoices = [];
        if(FirstName === "" || LastName === "")
        {
            isValid = false;
            if(FirstName === "")
                $("#firstName").addClass("fieldEmpty");
            if(LastName === "")
                $("#lastName").addClass("fieldEmpty");
        }
        $(".fightCard").each(function(){
            FightId = $(this).attr('id');
            FightResult = $(this).find("select#fightResult").val();
            FightResultType = $(this).find("select#fightResultType").val();
            if(fightResult == null || FightResultType == null)
            {
                isValid = false
                if(FightResult == null)
                    $(this).find("input:nth-child(1)").eq(0).addClass("fieldEmpty");
                if(FightResultType == null)
                    $(this).find("input:nth-child(1)").eq(1).addClass("fieldEmpty");
            }
            else if (isValid)
            {
                var userChoice = {
                    "fightId": FightId,
                    "winnerPredictionId": FightResult,
                    "winTypePredictionId": FightResultType
                };
                userChoices.push(userChoice);
            }
        })
        if(!isValid)
        {
          M.toast({html: 'Uzupełnij wszystkie pola!'});
        }
        else
        {
            var Data =
            {
                "playerName": FirstName +" "+ LastName,
                "types": userChoices
            };
            //wysyłka formularza

            console.log(Data);
            $("#saveBtn").addClass("hide");
            $(".description").addClass("hide");
            $("#fightList").addClass("hide");
            $(".userData").addClass("hide");
            $(".formSent").removeClass("hide");
        }
    });
  });