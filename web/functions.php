<?php
function makeCard($fotka, $jmeno, $prijmeni, $post, $mail, $facebook){
    return'<div class="col-lg-6 col-md-12 card col-xs-12">
                <div class="photo">
                    <img src="'.$fotka.'">
                </div>
                <div class="crea_content">
                    <h5>'.$jmeno.' <span class="lastname">'.$prijmeni.'</span></h5>
                    <h6>'.$post.'</h6>
                    <p><img src="Photos/1480739606_social-facebook-square2.png" height="32px"> '.$facebook.'</p>
                    <p><img src="Photos/1480739674_gmail.png"  height="32px"> '.$mail.'</p>
                </div>
            </div>';
}