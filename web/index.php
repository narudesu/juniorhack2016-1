<?php require_once 'functions.php' ?>
<!DOCTYPE html>
<html lang="">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartiZEN</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="custom.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</head>

<body>
<script type="text/javascript">
    $(document).on('click', 'a', function(event){
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
    });
</script>
<nav class="navbar navbar-default navbar-fixed-top" id="menu" style="margin-bottom: 0px;">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Smarti<span class="gray">ZEN</span></a>
        </div>
        <ul class="nav navbar-nav" style="text-align: center; margin-left: 27.5%">
            <li><a href="#top">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#rent">Rent a bike</a></li>
            <li><a href="#creators">Creators</a></li>
        </ul>
        <span style="float: right">
            <button type="button" style="border: none; height: 30px; font-size: 15px; margin: 5px 10px ; padding: 5px 20px; vertical-align: middle; border-radius: 5px; background-color: #333333;color: white">
                LOGIN
            </button>
        </span>
    </div>
</nav>
<section class="top" id="top">
    <div class="imagecentered"></div>
</section>
<section class="about" id="about">
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <h1 class="X300" style="color: #fc0421;">About SmartiZEN</h1>
                <h3 class="X500">With Smarti<span style class="red">ZEN</span> renting a bike could not be easier.<br> This simple yet efficent solution allows you to <br><span style class="red">rent a bike</span> from across the city and ride it to your desired location.</h3>
                <ul class="X500">
                    <li>Rent a bike for up to 8 hours</li>
                    <li>Accessible from anywhere</li>
                    <li>Includes alhocol test</li>
                    <li>5€ per bike</li>
                </ul>
            </div>
            <div class="col-lg-4">
                <div class="imageabout">
                    <img src="Photos/bike_rental.jpg" height="400px" style="border-radius: 10px">
                </div>
            </div>
        </div>
    </div>
</section>
<section class="rent" id="rent">
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div>
                    <h1  class="X300" style="color: #333333">Request a bike</h1>
                    <p class="X500">Request a bike either from your computer or a mobile phone and receive nearest station location.
                        When you are finished with your ride, just park it at the nearest station.</p>
                </div>
                <div>
                    <button class="rentButton X700" style="margin-top: 80px">REQUEST A BIKE</button>
                </div>
            </div>
            <div class="col-lg-6">
                <div>
                    <h1 class="X300" style="color: #333333">Pricing</h1>
                    <ul class="X500">
                        <li>Bike rental fee - 5€</li>
                        <li>First hour - 2€</li>
                        <li>Next hour - 4€</li>
                    </ul>
                </div>
                <div>
                    <h1  class="X300" style="color: #333333">Rental plans</h1>
                    <ul class="X500">
                        <li>2 hours - 5€</li>
                        <li>4 hours - 10€</li>
                        <li>6 hours - 15€</li>
                        <li>8 hours - 20€</li>
                        <li>30 minute fee - 3€</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
        </div>
        <p style="float: right;">* For every half hour spent after plan due</p>
    </div>
</section>
<!-- HERE IS A SPACE FOR THE MAP -->
<section class="creators" id="creators">
    <div class="container">
        <div class="row">
            <h1  class="X300">About the creators</h1>
            <?php
            echo makeCard("http://placehold.it/200x200","Dominik","Kadera","Leader, Hardware, Automatization","me@domiz.cz","facebook.com/dominik.kadera");
            echo makeCard("http://placehold.it/200x200","Vojtěch","Böhm","Graphic design & Front-end development","vojta.bohm@gmail.com","facebook.com/vojta.bohm");
            echo makeCard("http://placehold.it/200x200","Matěj","Šmíd","Database Management, Front & Back-end development","facebook","mejlik");
            echo makeCard("http://placehold.it/200x200","Jan","Šoulák","Hardware, communication","mejlik","facebook");
            echo makeCard("http://placehold.it/200x200","František","Běhal","Android deployment","mejlik","facebook");
            echo makeCard("http://placehold.it/200x200","David","Baňař","Hardware","mejlik","facebook");
            ?>
        </div>
    </div>
</section>
<footer>
    <div class="koudelka" style="background-color: black; width: 100%; height: 50px"></div>
</footer>
</body>
</html>
