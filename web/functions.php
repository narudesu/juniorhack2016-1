<?php
function makeCard($fotka, $jmeno, $prijmeni, $post, $mail, $facebook){
    return'<div class="col-lg-6 card">
                <div class="photo">
                    <img src="'.$fotka.'">
                </div>
                <div class="crea_content">
                    <h5>'.$jmeno.' <span class="lastname">'.$prijmeni.'</span></h5>
                    <h6>'.$post.'</h6>
                    <p>'.$facebook.'</p>
                    <p>'.$mail.'</p>
                </div>
            </div>';
}