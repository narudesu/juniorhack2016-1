<?php require_once 'functions.php' ?>
<!DOCTYPE html>
<html lang="">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartiZEN</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="custom.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" charset="utf-8"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    <style>
      #mapsection {
        min-height: 500px;
        width: 100%;
      }

      #bike-finder {
        min-height: 200px;
        transition: all 1s ease-in-out;
      }

      #bike-finder-map {
        height: 200px;
        width: 100%;
      }

      .collapsed {
        transform: scaleY(0);
      }

      .absrender {
        position: absolute;
      }
    </style>
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
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#top">Smarti<span class="gray">ZEN</span></a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav" style="text-align: center; margin-left: 20vw">
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
    </div>
</nav>
<section class="top" id="top">
    <div class="imagecentered"></div>
</section>
<section class="about" id="about">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-md-6">
                <h1 class="X300" style="color: #fc0421;">About SmartiZEN</h1>
                <h3 class="X500">With Smarti<span style class="red">ZEN</span> renting a bike could not be easier.<br> This simple yet efficent solution allows you to <br><span style class="red">rent a bike</span> from across the city and ride it to your desired location.</h3>
                <ul class="X500">
                    <li>Rent a bike for up to 8 hours</li>
                    <li>Accessible from anywhere</li>
                    <li>Includes alhocol test</li>
                    <li>5€ per bike</li>
                </ul>
            </div>
            <div class="col-lg-4 col-md-6">
                <div class="imageabout">
                    <img class="hidden-xs" src="Photos/bike_rental.jpg" height="400px" style="border-radius: 10px">
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
<section id="mapsection">
  <h2>Get kolo</h2>
  <button id="btn-kolo">Kolo</button>
  <div id="bike-finder" class="collapsed absrender">
    <div class="row">
      <div class="col-md-6">
        <div id="bike-finder-map"></div>
      </div>
      <div class="col-md-6">
        <table id="bike-finder-table" class="table">
          <tr>
            <th>ID</th>
            <th>Distance</th>
            <th>Slots</th>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione eos minima voluptates accusantium praesentium molestias porro vero vitae, laboriosam eligendi?</p>
</section>
<!-- HERE IS A SPACE FOR THE MAP -->
<section class="creators" id="creators">
    <div class="container">
        <div class="row">
            <h1  class="X300">About the creators</h1>
            <div class="col-lg-6 col-md-12 card col-xs-12">
                        <div class="photo">
                            <img src="http://placehold.it/200x200">
                        </div>
                        <div class="crea_content">
                            <h5>Dominik <span class="lastname">Kadera</span></h5>
                            <h6></h6>
                            <p><img src="Photos/1480739606_social-facebook-square2.png" height="32px"></p>
                            <p><img src="Photos/1480739674_gmail.png"  height="32px"></p>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12 card col-xs-12">
                                <div class="photo">
                                    <img src="http://placehold.it/200x200">
                                </div>
                                <div class="crea_content">
                                    <h5>Vojtech <span class="lastname">Bohm</span></h5>
                                    <h6>'.$post.'</h6>
                                    <p><img src="Photos/1480739606_social-facebook-square2.png" height="32px"> '.$facebook.'</p>
                                    <p><img src="Photos/1480739674_gmail.png"  height="32px"> '.$mail.'</p>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12 card col-xs-12">
                                        <div class="photo">
                                            <img src="http://placehold.it/200x200">
                                        </div>
                                        <div class="crea_content">
                                            <h5>'.$jmeno.' <span class="lastname">'.$prijmeni.'</span></h5>
                                            <h6>'.$post.'</h6>
                                            <p><img src="Photos/1480739606_social-facebook-square2.png" height="32px"> '.$facebook.'</p>
                                            <p><img src="Photos/1480739674_gmail.png"  height="32px"> '.$mail.'</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12 card col-xs-12">
                                                <div class="photo">
                                                    <img src="http://placehold.it/200x200">
                                                </div>
                                                <div class="crea_content">
                                                    <h5>'.$jmeno.' <span class="lastname">'.$prijmeni.'</span></h5>
                                                    <h6>'.$post.'</h6>
                                                    <p><img src="Photos/1480739606_social-facebook-square2.png" height="32px"> '.$facebook.'</p>
                                                    <p><img src="Photos/1480739674_gmail.png"  height="32px"> '.$mail.'</p>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-12 card col-xs-12">
                                                        <div class="photo">
                                                            <img src="http://placehold.it/200x200">
                                                        </div>
                                                        <div class="crea_content">
                                                            <h5>'.$jmeno.' <span class="lastname">'.$prijmeni.'</span></h5>
                                                            <h6>'.$post.'</h6>
                                                            <p><img src="Photos/1480739606_social-facebook-square2.png" height="32px"> '.$facebook.'</p>
                                                            <p><img src="Photos/1480739674_gmail.png"  height="32px"> '.$mail.'</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-12 card col-xs-12">
                                                                <div class="photo">
                                                                    <img src="http://placehold.it/200x200">
                                                                </div>
                                                                <div class="crea_content">
                                                                    <h5>'.$jmeno.' <span class="lastname">'.$prijmeni.'</span></h5>
                                                                    <h6>'.$post.'</h6>
                                                                    <p><img src="Photos/1480739606_social-facebook-square2.png" height="32px"> '.$facebook.'</p>
                                                                    <p><img src="Photos/1480739674_gmail.png"  height="32px"> '.$mail.'</p>
                                                                </div>
                                                            </div>
            <?php
            echo makeCard("http://placehold.it/200x200","Dominik","Kadera","Leader, Hardware, Automatization","me@domiz.cz","facebook.com/dominik.kadera");
            echo makeCard("http://placehold.it/200x200","Vojtěch","Böhm","Graphic design & Front-end development","vojta.bohm@gmail.com","facebook.com/vojta.bohm");
            echo makeCard("http://placehold.it/200x200","Matěj","Šmíd","Database Management, Full-stack web development","facebook","narudesu@yahoo.com");
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
<div id="modal-info" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Modal Header</h4>
        </div>
        <div class="modal-body">
          <p>
            Distance from user: <span class="distance-from-user"></span>
            Rental fee: <span class="rental-fee"></span>
            Slot state:
            <button>Rent</button>
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>

    </div>
  </div>

</body>
</html>
