var AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    var ml = new AWS.MachineLearning({
        accessKeyId: 'xxx',
        secretAccessKey: 'yyy'
    });

    var params = {
        MLModelId: 'ml-6BoHvp8sv6X',
        PredictEndpoint: 'https://realtime.machinelearning.us-east-1.amazonaws.com',
        Record: { 
            "Var1": event.queryStringParameters.text
        }
    };

    return ml.predict(params).promise().then(function(data) {
        var predictedPresident = data.Prediction.predictedLabel;
        var predictedScore = 0;
        for (var i in data.Prediction.predictedScores) {
            if (data.Prediction.predictedScores[i] > predictedScore) {
                predictedScore = data.Prediction.predictedScores[i];
            }
        }
        
        var result = {
            predictedPresident: predictedPresident,
            predictedScore: predictedScore
        };
        return {
            "isBase64Encoded": false,
            "statusCode": 200,
            "headers": {},
            "body": JSON.stringify(result)
        }
    }).catch(function(err) {
        return err;
    });
};
