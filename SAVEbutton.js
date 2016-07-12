//"save" button file
//on press, save the tags and add them to the most recent object in our list


///need to tell it to work IF the SAVEbutton is pressed??
function saveTags() {
  var value = document.getElementById('textbox').value;
  console.log(value);
  //this returns to the left
  //document object with getelementbyID function on it
  var tags = value.split(',');
  for (var i = 0; i<tags.length; i = i+1){
    //in the for loop, we are giving it a start, and an end, but our end is less than length
    //so we need to do that third argument to grab the final element
    //it does this for every element of tags,
    tags[i] = tags[i].trim();
    //trim is amazing, it only takes out spaces FROM THE BEG AND END, and you don't have to give it any arguments
  }

  var lastobject = store[store.length-1];
  //this is how you get the last element of a list, it's USEFUL!
  lastobject.tags = tags;
  //when you define a property on an object, you are adding it to the object
  //here we added the tags to the lastobject object
  saveChanges(function(store) {
    console.log('store:', store);
  });
}
