Webcam.set({
    width:350,
    height:300,
    image_format: "png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function capture() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5_version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/V2iocVAZh/model.json', modelLoaded);

function modelLoaded() {
    console.log("modelLoaded");
}

function identify() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_object_name").innerHtml = results[0].label;
        document.getElementById("result_object_accuracy").innerHtml = results[0].confindence.toFixed(3);
    }
}