const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.post('/matchdna', (req, res) => {
  var parent1 = req.body.parent1;
  var parent2 = req.body.parent2;
  var child = req.body.child;
  var output = {};

  function IntactSequence(str1, str2){
  var dnaSequenceArray = [];
	var intactSequenceLength = 0;
	var maxSubIndex = -1, i, j, char1, char2, startIndex;

	for (i = 0; i < str1.length; ++i) {
		dnaSequenceArray[i] = new Array();

		for (j = 0; j < str2.length; ++j) {
			char1 = str1.charAt(i);
			char2 = str2.charAt(j);

			if (char1 === char2) {
				if (i > 0 && j > 0) {
					dnaSequenceArray[i][j] = dnaSequenceArray[i - 1][j - 1] + 1;
				} else {
					dnaSequenceArray[i][j] = 1;
				}
			} else {
				dnaSequenceArray[i][j] = 0;
			}

			if (dnaSequenceArray[i][j] > intactSequenceLength) {
				intactSequenceLength = dnaSequenceArray[i][j];
				maxSubIndex = i;
			}
		}
	}

	if (intactSequenceLength > 0) {
		startIndex = maxSubIndex - intactSequenceLength + 1;

		return str1.substr(startIndex, intactSequenceLength);
	}

	return null;
}

if(IntactSequence(parent1,child).length > IntactSequence(parent2,child).length){
  output.donor = "parent1";
  output.intact_sequence = IntactSequence(parent1,child);
} else {
    output.donor = "parent2";
    output.intact_sequence = IntactSequence(parent2,child);
}

res.status(200).send(output);

});

app.listen(3000, () => {
  console.log(`Server is up on port 3000`);
});
