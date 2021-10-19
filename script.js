camera = document.getElementById("camera");
Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 100,
});
Webcam.attach(camera);
console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ZyIBRTKJJ/model.json", modelLoaded);

function takesnap() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      "<img id='captured_image' src='" + data_uri + "'>";
  });
}


function modelLoaded(){
  console.log("Model Loaded");
}

function check() {
  img = document.getElementById("captured_image");
  classifier.classify(img, gotResult);
}

function  gotResult(error, results){
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("object_type").innerHTML = results[0].label;
    document.getElementById("object_type_accuracy").innerHTML = results[0].confidence.toFixed(3)
  }
}