function createField(config, field)
{
	var i = 0;
    for (x in config){
      if(config[x] == 'string'){
        elem = document.createElement('INPUT');
        elem.type='TEXT';
		elem.name = 't' + i;
		i += 1;
        field.innerHTML += x + ': ';
        field.appendChild(elem);
      }
      else if(config[x] == 'number'){
        elem = document.createElement('INPUT');
        elem.type='NUMBER';
		elem.name = 'n' + i;
		i += 1;
        field.innerHTML += x + ': ';
        field.appendChild(elem);
      }
      else if (x == "resources")
      {
        for (y in config[x]){
          temp = document.createElement('FIELDSET');
          temp.innerHTML = '<legend>'+ config[x][y].name + '</legend>';
          for (z in config[x][y]){
            if(config[x][y][z] == 'string'){
              elem = document.createElement('INPUT');
              elem.type='TEXT';
			  elem.name = 't' + i;
			  i += 1;
              temp.innerHTML += z + ': ';
              temp.appendChild(elem);
            }
            else if(config[x][y][z] == 'number'){
              elem = document.createElement('INPUT');
              elem.type='NUMBER';
			  elem.name = 'n' + i;
			  i += 1;
              temp.innerHTML += z + ': ';
              temp.appendChild(elem);
            }
          }
          field.appendChild(temp);
        }
      }
    }
}

function load() {
    var requestURL = "config.json";
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
    var config = request.response;
    my_form = document.createElement('FORM');
	my_form.method = 'POST'
    my_field = document.createElement('FIELDSET');
    my_field.innerHTML = '<legend>'+ config.name + '</legend>';
    createField(config, my_field);
    my_form.appendChild(my_field);
    my_button = document.createElement('INPUT');
	my_button.type = 'SUBMIT';
    my_button.innerHTML = "Отправить";
    my_form.appendChild(my_button);
    document.body.appendChild(my_form);
    }
}