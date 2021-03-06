// mockfights =     [
//     // {
//     //   "fightId": 0,
//     //   "winTypeId": 1,
//     //   "fightLabel": "najman vs kasjo",
//     //   "winner": {
//     //        "winnerId": 1,
//     //       "winnerName": "kasjo"
//     //     }
//     // }
// ];

// mockscore = [
//     // {
//     //   "playerName": "Dasie2k",
//     //   "scoredPoints": 32
//     // }
// ];


$( document ).ready(function() {

    
    var initialDataFights = []

    var initialDataScores = []

    function getDate()
    {
        $.get( "/results", function(data) {
            initialDataFights = data;
         });
         $.get( "/scores", function(data) {
            initialDataScores = data;
         });
        //inicjalizacja
        $(".loader").addClass("hide");
        $(".tableBetting").removeClass("hide");
        $(".tableFight").removeClass("hide");
    }
    getDate();



    for(let i=0; i< initialDataScores.length; i++)
    {
        var score = initialDataScores[i];
        $("#scoreTableBody").append("<tr><td>"+ score.playerName +"</td><td>"+ score.scoredPoints +"</td></tr>");
    }
    for(let i=0; i< initialDataFights.length; i++)
    {
        var fight = initialDataFights[i];
        $("#fightTableBody").append("<tr><td>"+ fight.fightLabel +"</td><td>"+ fight.winner.winnerName +"</td><td>"+ mapWinType(fight.winTypeId) +"</td></tr>");
    }
    function mapWinType(winTypeId)
    {
        switch (winTypeId) {
            case 1:
              return "KO";
            case 2:
              return "Punkty";
            default:
              return "Brak danych";
        }
    }
    $(".pamieta").on("click", function(){
        M.toast({html: 'Upss.. byku brak ci uprawnien!'})
    })
    $(".refreshBtn").on("click", function()
    {
        location.reload();
    })
});