

<?php

$selected_date = $_GET['new_date'];
$dateStarted = DateTime::createFromFormat('D M d Y H:i:s e+', $selected_date); // Thu Nov 15 2012 00:00:00 GMT-0700 (Mountain Standard Time)
$formatted_date=$dateStarted->format('Y-m-d\TH:i:s\Z');
$data1="{\"?_format\":\"json\",\"origin\":\"14 Rue de la Paix, Paris, France\",\"destination\":\"54 Rue Mouffetard, 75005 Paris, France\",\"selectedStartDate\":\"";
$data2="\",\"type\":\"DISTANCE\",\"duration\":false,\"voucherCode\":false,\"customerId\":false}";
$request_Date= $data1.$formatted_date.$data2;
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://www.mydriver.com/api/v2/offers",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => $request_Date,
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache",
    "content-type: application/json",
    "postman-token: c5b5c670-f8b3-7dbf-32d3-899c5265242c"
  ),
));

$response = curl_exec($curl);

$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}