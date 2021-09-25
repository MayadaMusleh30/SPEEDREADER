$(function(){
    
    //Declare variables
    var myArray;
    var inputLength;
    var reading = false;
    var counter;
    var action;
    var frequency = 200;
    
    //On page load, hide elements we don't need, leave only text area and start button
    $("#new").hide();
    $("#resume").hide();
    $("#pause").hide();
    $("#controls").hide();
    $("#result").hide();  
    $("#error").hide();
    $("#instructions").hide();
    
    //Click on start reading
    $("#start").click(function(){
        $("#instructions").show();
        $("#intro").hide();
        //Get text and split into words inside array
        //\s will match spaces, tabs, new lines, etc and + means one or more
        myArray = $("#userInput").val().split(/\s+/);
        
        //Get number of words
        inputLength = myArray.length;
        
        if(inputLength > 1 ){ //there is enough input
            //Move to reading mode
            reading = true;
            
            //Hide start/error/userinput, show new/pause/resume/controls
            $("#start").hide();
            $("#error").hide();
            $("#userInput").hide();
            $("#new").show();
            $("#pause").show();
            $("#controls").show();
            
            //Set progress slider max
            $("#progressslider").attr("max",inputLength - 1);
            
            //Start counter at 0
            counter = 0;
            
            //Show reading box with first word
            $("#result").show();
            $("#result").text(myArray[counter]);
            
            //Start reading from first word
            action = setInterval(read, frequency);
        }
        else{//not enough input
            $("#error").show();
            $("#intro").show();
            $("#instructions").hide();
        }
    });
    
    //Click on new
    $("#new").click(function(){
        //Reload page
        location.reload();
    });
    
    //Click on pause
    $("#pause").click(function(){
        //Stop reading and go to non reading mode
        clearInterval(action);
        reading = false;
        
        //Hide pause and show resume
        $("#pause").hide();
        $("#resume").show();
    });
    
    //Click on resume
    $("#resume").click(function(){
        //Start reading
        action = setInterval(read,frequency);
        
        //Go back to reading mode
        reading = true;
        
        //Hide resume and show pause
        $("#resume").hide();
        $("#pause").show();
    });
    
    //Change fontsize
    $("#fontsizeslider").on("slidestop", function(event, ui){
        //Refresh slider
        $("#fontsizeslider").slider("refresh");
        
        //Get value of slider
        var slidervalue = parseInt($("#fontsizeslider").val());
        
        $("#result").css("fontSize", slidervalue);
        $("#fontsize").text(slidervalue);
    });
    
    //Change speed
    $("#speedslider").on("slidestop", function(event, ui){
        //Refresh slider
        $("#speedslider").slider("refresh");
        
        //Get value of slider
        var slidervalue = parseInt($("#speedslider").val());
        
        $("#speed").text(slidervalue);
        
        //Stop reading
        clearInterval(action);
        
        //Change frequency
        frequency = 60000/slidervalue;
        
        //Resume reading if in reading mode
        if(reading){
            action = setInterval(read,frequency);
        }
    });
    
    //Progress slider
    $("#progressslider").on("slidestop", function(event, ui){
        //Refresh slider
        $("#progressslider").slider("refresh");
        
        //Get value of slider
        var slidervalue = parseInt($("#progressslider").val());
                
        //Stop reading
        clearInterval(action);
        
        //Change counter
        counter = slidervalue;
        
        //Change word 
        $("#result").text(myArray[counter]);
        
        //Change value of progress
        $("#percentage").text(Math.floor(counter/(inputLength - 1) * 100));
        
        //Resume reading if in reading mode
        if(reading){
            action = setInterval(read,frequency);
        }
    });
    
    //Functions  
    function read(){
        if(counter == inputLength - 1){//Last word
            clearInterval(action);
            reading = false; //Move to non reading mode
            $("#pause").hide();
            $("#start").show();
        }
        else {
            //Counter goes up by 1
            counter++;
            
            //Get word
            $("#result").text(myArray[counter]);
            
            //Change progress slider value and refresh
            $("#progressslider").val(counter).slider('refresh');
            
            //Change text of percentage
            $("#percentage").text(Math.floor(counter/(inputLength - 1) * 100));
        }
    }
});