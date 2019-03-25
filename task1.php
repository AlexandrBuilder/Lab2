<?php

$array = [1, -1 ,2 ,-2, 2, 3, -5, 3, -3];

getCountOptions($array);

function getCountOptions($array) {
    $arraySum = array_sum($array);
    $arrayCount = count($array);

    if ($arraySum % 3 || $arrayCount < 3) {
        echo 'Некорректные данные';
    }

    $sumSubArray = $arraySum / 3;

    $countOptions = 0;

    $interimSum = 0;

    for ($i = 0; $i < $arrayCount; $i++) {
        $interimSum += $array[$i];

        if ($interimSum == $sumSubArray) {
            $interimSum = 0;
            $i++;

            for ($j = $i; $j < $arrayCount; $j++) {
                $interimSum += $array[$j];

                if ($interimSum == $sumSubArray && $j != ($arrayCount-1)) {
            
                    $countOptions++;
                }
            }
        }
    }

    echo $countOptions;
}