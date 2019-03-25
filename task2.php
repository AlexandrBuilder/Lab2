<?php

$priceTicket = 10;
$priceSeasonTiket = 100;
$tripSeasonTiket = 13;
$tripAll = 12;

getProfitable($priceTicket, $priceSeasonTiket, $tripSeasonTiket, $tripAll);

function getProfitable($priceTicket, $priceSeasonTiket, $tripSeasonTiket, $tripAll) {
    $amountByTicket = $priceTicket * $tripAll;
    $amountBySeasonTicket = $priceSeasonTiket * ceil($tripAll / $tripSeasonTiket);

    $message = $amountByTicket < $amountBySeasonTicket ? 'Билет' : 'Абонимент';

    echo $message;
}